/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SITE_INDEXABLE?: string;
  readonly PUBLIC_STATIC_PREVIEW?: string;
  readonly PUBLIC_ANALYTICS_PROVIDER?: 'none' | 'ga4' | 'plausible' | 'umami';
  readonly PUBLIC_ANALYTICS_ID?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly FORM_DELIVERY_MODE?: 'disabled' | 'resend' | 'test';
  readonly RESEND_API_KEY?: string;
  readonly INQUIRY_TO_EMAIL?: string;
  readonly INQUIRY_FROM_EMAIL?: string;
  readonly TURNSTILE_SECRET_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  plausible?: (name: string, options?: { props?: Record<string, string> }) => void;
  umami?: {
    track?: (name: string, data?: Record<string, string>) => void;
  };
}
