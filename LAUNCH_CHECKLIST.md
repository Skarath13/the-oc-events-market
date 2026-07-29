# Launch checklist

## Owner and legal gate

- [ ] Resolve every launch-blocking item in `CONTENT_NEEDED.md`.
- [ ] Replace the live-text logo fallback, temporary favicon, Open Graph crop, and priority stock
      images.
- [ ] Verify active packages, exact inclusions/exclusions, event types, and service area.
- [ ] Approve portfolio facts, image permissions, vendor credits, and testimonials.
- [ ] Have the privacy notice, terms, messaging practices, and data retention reviewed.

## Production configuration

- [x] Use Cloudflare Workers in the pinned production account; GitHub Pages remains staging-only.
- [x] Set `PUBLIC_SITE_URL=https://theoceventsmarket.com`.
- [x] Remove website forms, delivery credentials, bot defense, and form rate limiting; contact is
      text-only.
- [x] Configure production security headers and HSTS; update CSP only for an approved future
      analytics provider.
- [x] Confirm deployment credentials never enter client bundles or repository files; scan for
      Cloudflare token patterns after release.

## Search and local discovery

- [x] Enable `PUBLIC_SITE_INDEXABLE=true` for production while keeping GitHub Pages staging noindex.
- [x] Verify canonical URLs, sitemap URLs, redirects, robots response, 404 status, RSS, and JSON-LD
      on the indexable production deployment.
- [ ] Submit the sitemap in Google Search Console and Bing Webmaster Tools after indexing is enabled.
- [ ] Align name, contact details, service area, hours, and URL with Google Business Profile.
- [ ] Verify Bing Webmaster Tools, citation consistency, and links from owned social profiles.
- [ ] Add unique city pages only when meaningful local proof exists.

## Analytics and conversion

- [x] Keep production analytics disabled unless an owner-approved provider and ID are selected.
- [ ] Verify primary, service, client-text, vendor-text, and portfolio events if analytics is enabled.
- [ ] Add consent tooling only if the selected technology and applicable policy require it.
- [ ] Scan the desktop QR code with iPhone and Android hardware and send one real client and vendor
      text.

## Engineering and release

- [x] Run `pnpm install --frozen-lockfile`.
- [x] Run `pnpm format:check`, `pnpm lint`, `pnpm check`, `pnpm build`, `pnpm test:e2e`,
      `pnpm lighthouse`, and a recursive link check.
- [x] Inspect the six required viewports and keyboard paths.
- [x] Test Chrome, Firefox, WebKit/Safari, and Android/iOS-equivalent mobile profiles.
- [ ] Run the release matrix in Microsoft Edge on a machine with Edge installed.
- [ ] Verify reduced motion, zoom/reflow, tap targets, native SMS handoff, and no horizontal
      overflow.
- [x] Leave DNS unchanged, record the previous Worker version for rollback, deploy, and smoke the
      indexable live origin.
- [ ] Monitor crawl/index state, Core Web Vitals, and conversion events after launch.

Release record:

- Previous Worker version: `83207577-12b2-4d86-865e-9a7a75981cf1`
- Indexable text-contact release: `c2882bfe-340e-450d-850d-1f5b490e249e`
