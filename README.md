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

The default build is intentionally noindex. The canonical production origin is
`https://theoceventsmarket.com`.

## Commands

```sh
pnpm dev
pnpm build
pnpm build:cloudflare
pnpm start
pnpm check
pnpm lint
pnpm format:check
pnpm test:e2e
pnpm test:a11y
pnpm test:contact
pnpm lighthouse
pnpm verify
pnpm verify:cloudflare
pnpm run deploy
```

Playwright starts the Cloudflare Worker build over local HTTPS on port 4377. Lighthouse uses the
same runtime on port 4388. Required visual screenshots are written to `reports/screenshots`.

## Content and claims

- Business facts and feature flags: `src/data/site.ts`
- Event-type pages: `src/data/eventTypes.ts`
- Owner-gated package previews: `src/data/services.ts`
- Celebrations and journal schemas: `src/content.config.ts`
- Editing instructions: `CONTENT_GUIDE.md`
- Unresolved owner facts: `CONTENT_NEEDED.md`

Celebration and journal entries are draft-only until verified. Stock photographs are not client
stories or portfolio proof.

## Text contact

`/contact/` and `/for-vendors/` provide native `sms:` links instead of collecting information in
website forms. The phone number is printed only in the footer. On desktop, each contact page renders
a locally generated QR code for the same SMS action; no QR-code service receives visitor data.

## GitHub Pages staging

The Pages workflow builds the prerendered client, rewrites paths for the repository base, adds
`.nojekyll`, and deploys a public noindex preview. Cloudflare Workers is the production runtime.

## Production deployment

1. Complete `CONTENT_NEEDED.md` and `LAUNCH_CHECKLIST.md`.
2. Run the complete validation suite against the final build.
3. Merge the verified change to `main`. Cloudflare Workers Builds automatically runs
   `pnpm run build:cloudflare` and `npx wrangler deploy` against the existing production Worker.
4. Confirm the Git-triggered build succeeds in Cloudflare and smoke
   `https://theoceventsmarket.com`.
5. Production belongs to `Ivoneatelegantlashes@gmail.com's Account`; do not use the `Dylan`
   Cloudflare account. See `AGENTS.md` for the pinned account, zone, branch, and fallback rules.

The canonical origin and Cloudflare account are pinned in `wrangler.jsonc`. Production builds are
indexable; GitHub Pages staging remains explicitly noindex. Local `pnpm run deploy` is an
emergency/recovery fallback, not the normal release path.

The public source repository grants no license to reuse the brand, copy, or code. Temporary
photographs remain governed by the licenses recorded in `IMAGE_LICENSES.md`.
