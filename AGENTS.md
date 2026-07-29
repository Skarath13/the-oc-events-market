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
