import { randomUUID } from 'node:crypto';
import type { FormKind, InquiryInput, VendorInput } from './forms';

type Submission = InquiryInput | VendorInput;

const attempts = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;

export function isRateLimited(request: Request): boolean {
  if (process.env.NODE_ENV === 'test') return false;
  const forwarded =
    request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for');
  const key = forwarded?.split(',')[0]?.trim() ?? 'unknown';
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT;
}

export async function validateTurnstile({
  token,
  request,
  correlationId,
}: {
  token: string;
  request: Request;
  correlationId: string;
}): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const formData = new FormData();
  formData.set('secret', secret);
  formData.set('response', token);
  formData.set('idempotency_key', correlationId);
  const remoteIp = request.headers.get('cf-connecting-ip');
  if (remoteIp) formData.set('remoteip', remoteIp);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    console.error(JSON.stringify({ event: 'turnstile_failure', correlationId }));
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function deliverForm({
  kind,
  submission,
  correlationId,
}: {
  kind: FormKind;
  submission: Submission;
  correlationId: string;
}): Promise<{ delivered: boolean; reason?: 'disabled' | 'provider' | 'configuration' }> {
  const mode = process.env.FORM_DELIVERY_MODE ?? 'disabled';
  if (mode === 'test' && process.env.NODE_ENV === 'test') return { delivered: true };
  if (mode === 'disabled') return { delivered: false, reason: 'disabled' };
  if (mode !== 'resend') return { delivered: false, reason: 'configuration' };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!apiKey || !to || !from) return { delivered: false, reason: 'configuration' };

  const body = createEmail(kind, submission, correlationId);
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `${kind}/${submission.submissionId || correlationId}`.slice(0, 256),
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: submission.email,
        subject:
          kind === 'inquiry'
            ? `New event inquiry · ${'eventType' in submission ? submission.eventType : 'event'}`
            : `New vendor introduction · ${'category' in submission ? submission.category : 'vendor'}`,
        text: body,
      }),
    });
    if (!response.ok) {
      console.error(
        JSON.stringify({
          event: 'form_provider_failure',
          kind,
          correlationId,
          status: response.status,
        }),
      );
      return { delivered: false, reason: 'provider' };
    }
    return { delivered: true };
  } catch {
    console.error(JSON.stringify({ event: 'form_provider_failure', kind, correlationId }));
    return { delivered: false, reason: 'provider' };
  }
}

export function createCorrelationId(): string {
  return randomUUID();
}

function createEmail(kind: FormKind, submission: Submission, correlationId: string): string {
  const rows: Array<[string, unknown]> =
    kind === 'inquiry' && 'eventType' in submission
      ? [
          ['Name', submission.name],
          ['Email', submission.email],
          ['Phone', submission.phone],
          ['Preferred contact', submission.preferredContact],
          ['Event type', submission.eventType],
          ['Event date', submission.dateNotSelected ? 'Not selected' : submission.eventDate],
          ['City or venue', submission.cityVenue],
          ['Estimated guest count', submission.guestCount],
          ['Budget', submission.budget],
          ['Planning support', submission.planningSupport],
          ['Description', submission.description],
        ]
      : [
          ['Business', 'businessName' in submission ? submission.businessName : ''],
          ['Contact', 'contactName' in submission ? submission.contactName : ''],
          ['Email', submission.email],
          ['Phone', submission.phone],
          ['Category', 'category' in submission ? submission.category : ''],
          ['Service area', 'serviceArea' in submission ? submission.serviceArea : ''],
          ['Website', 'websiteUrl' in submission ? submission.websiteUrl : ''],
          ['Social', 'socialUrl' in submission ? submission.socialUrl : ''],
          [
            'Insurance/license note',
            'insuranceLicense' in submission ? submission.insuranceLicense : '',
          ],
          ['Introduction', 'introduction' in submission ? submission.introduction : ''],
          ['Portfolio', 'portfolioUrl' in submission ? submission.portfolioUrl : ''],
        ];

  return [
    `Submission type: ${kind}`,
    `Correlation ID: ${correlationId}`,
    '',
    ...rows.map(([label, value]) => `${label}: ${String(value ?? '')}`),
  ].join('\n');
}
