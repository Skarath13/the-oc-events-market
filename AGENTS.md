# Project deployment constraints

## Cloudflare production scope

- The production domain is `theoceventsmarket.com`.
- Production Cloudflare resources for this project belong to
  `Ivoneatelegantlashes@gmail.com's Account` (`23f44eec8348248aa186c7511ed36e07`).
- The production DNS zone is `theoceventsmarket.com`
  (`f28b9d284b4012231a96bf4a2b8f20c7`).
- Do not create or deploy this project's Worker, routes, custom domains, or DNS records in the
  `Dylan` Cloudflare account.
- Before every Cloudflare mutation, verify that the active credential can access the account and
  zone IDs above and explicitly set `CLOUDFLARE_ACCOUNT_ID=23f44eec8348248aa186c7511ed36e07`.
- Scope deployment credentials to this account and zone. Never commit Cloudflare tokens or place
  them in tracked environment files.

## Production deployment method

- The required production deployment path is Cloudflare Workers Builds connected directly to
  `Skarath13/the-oc-events-market` on GitHub.
- The production branch is `main`. A push or merge to `main` must run
  `pnpm run build:cloudflare` and deploy the existing `the-oc-events-market` Worker with
  `npx wrangler deploy`.
- Non-production branches should build preview versions with
  `npx wrangler versions upload`; they must not replace the active production deployment.
- Do not use GitHub Pages or a separate GitHub Actions deployment workflow as the production
  release path.
- Treat local `wrangler deploy` as an explicitly authorized emergency or recovery fallback, not the
  normal release method.
