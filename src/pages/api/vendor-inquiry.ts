import type { APIRoute } from 'astro';
import { type FormResponse, formDataToObject, vendorSchema, zodErrors } from '@/lib/forms';
import {
  createCorrelationId,
  deliverForm,
  isRateLimited,
  validateTurnstile,
} from '@/lib/form-delivery';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const correlationId = createCorrelationId();
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 32_768) {
    return json(
      {
        ok: false,
        message: 'The submission is too large. Shorten the introduction and try again.',
        correlationId,
      },
      413,
    );
  }
  if (isRateLimited(request)) {
    return json(
      {
        ok: false,
        message: 'Too many attempts were received. Please wait a few minutes and try again.',
        correlationId,
      },
      429,
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json(
      { ok: false, message: 'The form could not be read. Refresh and try again.', correlationId },
      400,
    );
  }
  const result = vendorSchema.safeParse(formDataToObject(formData));
  if (!result.success) {
    return json(
      {
        ok: false,
        message: 'Review the highlighted fields and try again.',
        correlationId,
        errors: zodErrors(result.error),
      },
      400,
    );
  }
  if (result.data.website) {
    return json(
      { ok: true, message: 'Thank you — your introduction was received.', correlationId },
      200,
    );
  }

  const human = await validateTurnstile({
    token: result.data.turnstileToken,
    request,
    correlationId,
  });
  if (!human) {
    return json(
      {
        ok: false,
        message: 'Verification was not completed. Please try again.',
        correlationId,
      },
      400,
    );
  }

  const delivery = await deliverForm({ kind: 'vendor', submission: result.data, correlationId });
  if (!delivery.delivered) {
    return json(
      {
        ok: false,
        message:
          delivery.reason === 'disabled' || delivery.reason === 'configuration'
            ? 'Online delivery is not configured yet. Your information was not sent.'
            : 'The introduction could not be delivered. Your information was not sent; please try again.',
        correlationId,
      },
      delivery.reason === 'provider' ? 502 : 503,
    );
  }

  return json(
    {
      ok: true,
      message:
        'Thank you — your introduction was received. An inquiry does not guarantee a partnership, recommendation, or preferred status.',
      correlationId,
    },
    200,
  );
};

function json(body: FormResponse, status: number): Response {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
