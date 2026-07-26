# Launch checklist

## Owner and legal gate

- [ ] Resolve every launch-blocking item in `CONTENT_NEEDED.md`.
- [ ] Replace the live-text logo fallback, temporary favicon, Open Graph crop, and priority stock
      images.
- [ ] Verify active packages, exact inclusions/exclusions, event types, and service area.
- [ ] Approve portfolio facts, image permissions, vendor credits, and testimonials.
- [ ] Have the privacy notice, terms, consent language, and data retention reviewed.

## Production configuration

- [ ] Choose a server-capable Astro host; GitHub Pages is staging-only and cannot deliver forms.
- [ ] Set `PUBLIC_SITE_URL` to the final HTTPS origin.
- [ ] Configure `FORM_DELIVERY_MODE=resend`, `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, and
      `INQUIRY_FROM_EMAIL`.
- [ ] Configure both Turnstile variables and verify the widget and server result.
- [ ] Replace the in-memory rate limiter with a host-appropriate shared limiter before multi-instance
      production traffic.
- [ ] Configure production security headers and HSTS at the host; update CSP only for enabled
      analytics, Turnstile, or provider endpoints.
- [ ] Confirm secrets never enter client bundles, logs, screenshots, or the repository.

## Search and local discovery

- [ ] Keep `PUBLIC_SITE_INDEXABLE=false` through final-domain QA.
- [ ] Verify canonical URLs, sitemap URLs, redirects, robots response, 404 status, RSS, and JSON-LD.
- [ ] Submit the sitemap in Google Search Console and Bing Webmaster Tools after indexing is enabled.
- [ ] Align name, contact details, service area, hours, and URL with Google Business Profile.
- [ ] Verify Bing Webmaster Tools, citation consistency, and links from owned social profiles.
- [ ] Add unique city pages only when meaningful local proof exists.

## Analytics and conversion

- [ ] Select no analytics, GA4, Plausible, or Umami; set only the approved provider and ID.
- [ ] Verify CTA, service CTA, form start, validation failure, success, portfolio, and vendor-inquiry
      events.
- [ ] Add consent tooling only if the selected technology and applicable policy require it.
- [ ] Send real inbox tests from desktop and mobile; verify failure behavior and provider logs.

## Engineering and release

- [ ] Run `pnpm install --frozen-lockfile`.
- [ ] Run `pnpm format:check`, `pnpm lint`, `pnpm check`, `pnpm build`, `pnpm test:e2e`,
      `pnpm lighthouse`, and a recursive link check.
- [ ] Inspect the six required viewports and manual keyboard paths.
- [ ] Test Chrome, Firefox, WebKit/Safari, Edge, and Android/iOS-equivalent mobile profiles.
- [ ] Verify reduced motion, zoom/reflow, tap targets, mobile keyboard form flow, and no horizontal
      overflow.
- [ ] Back up DNS, record rollback steps, deploy, smoke the live origin, then enable indexing.
- [ ] Monitor form delivery, crawl/index state, Core Web Vitals, and conversion events after launch.
