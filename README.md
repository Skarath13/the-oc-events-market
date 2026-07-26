# The OC Events Market

Production-oriented Astro repository for **The OC Events Market — Event Planning & Design**, an
Orange County planning studio. The site is planner-first, vendor-flexible, claim-controlled, and
server-first. Unverified owner facts are omitted or feature-flagged.

## Local setup

Requirements: Node 24 and pnpm 10.20.

```sh
pnpm install --frozen-lockfile
cp .env.example .env
pnpm dev
```

The default build is intentionally noindex and uses the reserved
`https://the-oc-events-market.example` canonical origin until production configuration is supplied.

## Commands

```sh
pnpm dev
pnpm build
pnpm start
pnpm check
pnpm lint
pnpm format:check
pnpm test:e2e
pnpm test:a11y
pnpm test:forms
pnpm lighthouse
pnpm verify
```

Playwright starts a production Node build on port 4377. Lighthouse uses port 4388. Required visual
screenshots are written to `reports/screenshots`.

## Content and claims

- Business facts and feature flags: `src/data/site.ts`
- Event-type pages: `src/data/eventTypes.ts`
- Owner-gated package previews: `src/data/services.ts`
- Celebrations and journal schemas: `src/content.config.ts`
- Editing instructions: `CONTENT_GUIDE.md`
- Unresolved owner facts: `CONTENT_NEEDED.md`

Celebration and journal entries are draft-only until verified. Stock photographs are not client
stories or portfolio proof.

## Forms

`/contact/` and `/for-vendors/` submit to separate server endpoints with Zod validation, output
sanitization, size limits, a honeypot, optional Turnstile validation, safe errors, and Resend
delivery. Configure the server-only variables in `.env.example`. Production should replace the
process-local limiter with a shared host-level implementation.

No provider response means no success state. `FORM_DELIVERY_MODE=test` works only when
`NODE_ENV=test`.

## GitHub Pages staging

The Pages workflow builds the prerendered client, rewrites paths for the repository base, adds
`.nojekyll`, and deploys a public noindex preview. GitHub Pages cannot run Astro server endpoints, so
both forms are clearly disabled in that build. Use a server-capable host for production.

## Production deployment

1. Complete `CONTENT_NEEDED.md` and `LAUNCH_CHECKLIST.md`.
2. Choose an Astro-compatible server host because forms require runtime endpoints.
3. Set the final canonical origin, delivery credentials, optional Turnstile, and optional analytics.
4. Run the complete validation suite against the final build.
5. Deploy with indexing still disabled, smoke the live origin, then set
   `PUBLIC_SITE_INDEXABLE=true` and redeploy.

The public source repository grants no license to reuse the brand, copy, or code. Temporary
photographs remain governed by the licenses recorded in `IMAGE_LICENSES.md`.
