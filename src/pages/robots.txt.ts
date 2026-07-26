import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://the-oc-events-market.example');
  const indexable =
    import.meta.env.PUBLIC_SITE_INDEXABLE === 'true' && !origin.hostname.endsWith('.example');
  const body = indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', origin).href}\n`
    : `User-agent: *\nDisallow: /\n\nSitemap: ${new URL('/sitemap-index.xml', origin).href}\n`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
