/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SITE_INDEXABLE?: string;
  readonly PUBLIC_ANALYTICS_PROVIDER?: 'none' | 'ga4' | 'plausible' | 'umami';
  readonly PUBLIC_ANALYTICS_ID?: string;
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
