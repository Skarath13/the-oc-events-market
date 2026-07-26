import { z } from 'zod';

const cleanSingleLine = (value: string) => stripControls(value, false).replace(/\s+/g, ' ').trim();

const cleanMultiline = (value: string) => stripControls(value, true).replace(/\r\n?/g, '\n').trim();

const stripControls = (value: string, keepLineBreaks: boolean) =>
  [...value]
    .filter((character) => {
      const code = character.charCodeAt(0);
      if (code === 127) return false;
      if (code >= 32) return true;
      return keepLineBreaks && (code === 9 || code === 10 || code === 13);
    })
    .join('');

const singleLine = (max: number) => z.string().transform(cleanSingleLine).pipe(z.string().max(max));
const optionalSingleLine = (max: number) =>
  z.string().transform(cleanSingleLine).pipe(z.string().max(max)).optional().default('');

export const eventTypeOptions = [
  ['wedding', 'Wedding'],
  ['baby-bridal-shower', 'Baby or bridal shower'],
  ['birthday-milestone', 'Birthday or milestone'],
  ['kids-party', 'Kids’ party'],
  ['corporate-brand', 'Corporate or brand event'],
  ['other', 'Another celebration'],
] as const;

export const planningSupportOptions = [
  ['start-to-finish', 'Help from early planning through the event'],
  ['selected-support', 'Support with selected planning or design decisions'],
  ['coordination', 'Help coordinating an established plan'],
  ['not-sure', 'I’m not sure yet'],
] as const;

export const preferredContactOptions = [
  ['email', 'Email'],
  ['call', 'Phone call'],
  ['text', 'Text message'],
] as const;

const eventTypeValues = eventTypeOptions.map(([value]) => value) as [
  (typeof eventTypeOptions)[number][0],
  ...(typeof eventTypeOptions)[number][0][],
];
const supportValues = planningSupportOptions.map(([value]) => value) as [
  (typeof planningSupportOptions)[number][0],
  ...(typeof planningSupportOptions)[number][0][],
];
const contactValues = preferredContactOptions.map(([value]) => value) as [
  (typeof preferredContactOptions)[number][0],
  ...(typeof preferredContactOptions)[number][0][],
];

export const inquirySchema = z
  .object({
    name: singleLine(100).pipe(z.string().min(2, 'Enter your name.')),
    email: singleLine(254).pipe(z.email('Enter a valid email address.')),
    phone: optionalSingleLine(40),
    preferredContact: z.enum(contactValues, 'Choose a preferred contact method.'),
    eventType: z.enum(eventTypeValues, 'Choose an event type.'),
    eventDate: optionalSingleLine(10).pipe(
      z.string().refine((value) => value === '' || /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Enter a valid event date.',
      }),
    ),
    dateNotSelected: z.boolean(),
    cityVenue: optionalSingleLine(160),
    guestCount: optionalSingleLine(40),
    budget: optionalSingleLine(100),
    planningSupport: z.enum(supportValues, 'Choose the planning support you need.'),
    description: z
      .string()
      .transform(cleanMultiline)
      .pipe(
        z
          .string()
          .min(20, 'Tell us a little more about the celebration.')
          .max(3000, 'Keep the description under 3,000 characters.'),
      ),
    privacyConsent: z.literal(true, 'Consent is required before submitting.'),
    website: optionalSingleLine(200),
    submissionId: optionalSingleLine(64),
    turnstileToken: optionalSingleLine(2048),
  })
  .superRefine((data, context) => {
    if (!data.eventDate && !data.dateNotSelected) {
      context.addIssue({
        code: 'custom',
        path: ['eventDate'],
        message: 'Choose a date or select “We have not chosen a date yet.”',
      });
    }
    if (data.eventDate && data.dateNotSelected) {
      context.addIssue({
        code: 'custom',
        path: ['eventDate'],
        message: 'Use either a date or “We have not chosen a date yet,” not both.',
      });
    }
    if ((data.preferredContact === 'call' || data.preferredContact === 'text') && !data.phone) {
      context.addIssue({
        code: 'custom',
        path: ['phone'],
        message: 'Enter a phone number for calls or text messages.',
      });
    }
  });

export const vendorSchema = z.object({
  businessName: singleLine(140).pipe(z.string().min(2, 'Enter the business name.')),
  contactName: singleLine(100).pipe(z.string().min(2, 'Enter a contact name.')),
  email: singleLine(254).pipe(z.email('Enter a valid email address.')),
  phone: optionalSingleLine(40),
  category: singleLine(100).pipe(z.string().min(2, 'Enter a vendor category.')),
  serviceArea: singleLine(180).pipe(z.string().min(2, 'Enter the service area.')),
  websiteUrl: optionalSingleLine(500).pipe(
    z.string().refine((value) => value === '' || /^https?:\/\/[^ ]+$/i.test(value), {
      message: 'Enter a full website URL beginning with http:// or https://.',
    }),
  ),
  socialUrl: optionalSingleLine(500).pipe(
    z.string().refine((value) => value === '' || /^https?:\/\/[^ ]+$/i.test(value), {
      message: 'Enter a full social URL beginning with http:// or https://.',
    }),
  ),
  insuranceLicense: optionalSingleLine(500),
  introduction: z
    .string()
    .transform(cleanMultiline)
    .pipe(
      z
        .string()
        .min(20, 'Share a short introduction.')
        .max(2500, 'Keep the introduction under 2,500 characters.'),
    ),
  portfolioUrl: singleLine(500).pipe(
    z.string().refine((value) => /^https?:\/\/[^ ]+$/i.test(value), {
      message: 'Enter a full portfolio URL beginning with http:// or https://.',
    }),
  ),
  privacyConsent: z.literal(true, 'Consent is required before submitting.'),
  website: optionalSingleLine(200),
  submissionId: optionalSingleLine(64),
  turnstileToken: optionalSingleLine(2048),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type VendorInput = z.infer<typeof vendorSchema>;

export type FormKind = 'inquiry' | 'vendor';

export type FormResponse = {
  ok: boolean;
  message: string;
  correlationId: string;
  errors?: Record<string, string>;
};

export function formDataToObject(formData: FormData): Record<string, unknown> {
  return {
    ...Object.fromEntries(formData.entries()),
    dateNotSelected: formData.get('dateNotSelected') === 'on',
    privacyConsent: formData.get('privacyConsent') === 'on',
    turnstileToken: formData.get('cf-turnstile-response')?.toString() ?? '',
  };
}

export function zodErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0]?.toString() ?? 'form';
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
