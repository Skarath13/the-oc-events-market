# Validation report

Release candidate tested July 25, 2026 (America/Los_Angeles).

## Quality gates

| Gate                | Result                                                                     |
| ------------------- | -------------------------------------------------------------------------- |
| `pnpm format:check` | Passed                                                                     |
| `pnpm lint`         | Passed                                                                     |
| `pnpm check`        | Passed with no Astro or TypeScript errors                                  |
| `pnpm build`        | Passed; server output, sitemap, RSS, redirects, and static pages generated |
| `pnpm links`        | Passed; 113 local links, assets, stylesheets, and fragments checked        |
| `pnpm test:e2e`     | Passed; 241 passed, 11 intentional project skips, 0 failed                 |
| `pnpm lighthouse`   | Passed every configured assertion on five representative pages             |

The 11 Playwright skips are expected: the mobile-menu case does not run in desktop projects, and
the screenshot suite runs once in its designated Chromium project rather than duplicating artifacts
in every browser.

## Browser, behavior, and accessibility coverage

The 252-case Playwright matrix exercised:

- Chromium desktop and a 390 × 844 Android profile;
- installed Google Chrome desktop;
- Firefox desktop;
- WebKit desktop and a 390 × 844 iPhone profile; and
- Microsoft Edge 150.0.4078.99 desktop.

The suite covers all published route metadata and heading contracts, canonical output, structured
data parsing, draft exclusions, actual 404 status, robots, sitemap, RSS, redirects, client and vendor
form validation, recoverable server errors, mocked successful submissions, mobile-menu focus and
Escape behavior, skip-link focus, horizontal overflow, hero safety, and required screenshots.

Automated axe-core WCAG 2 A/AA checks passed on the home, services, weddings, contact, vendor, and
accessibility pages in every browser project. Keyboard paths were exercised in the automated suite;
WebKit uses Option-Tab to reflect Safari's default keyboard navigation behavior.

## Lighthouse

Mobile Lighthouse CI ran against the production build. Scores are expressed from 0 to 1.

| Route               | Performance | Accessibility | Best practices |  SEO |      LCP |    CLS |  TBT | Transfer |
| ------------------- | ----------: | ------------: | -------------: | ---: | -------: | -----: | ---: | -------: |
| `/`                 |        0.98 |          1.00 |           1.00 | 1.00 | 2,332 ms | 0.0250 | 0 ms |   295 KB |
| `/services/`        |        0.99 |          1.00 |           1.00 | 1.00 | 1,876 ms | 0.0011 | 0 ms |   173 KB |
| `/events/weddings/` |        0.99 |          1.00 |           1.00 | 1.00 | 1,801 ms | 0.0014 | 0 ms |   144 KB |
| `/contact/`         |        1.00 |          1.00 |           1.00 | 1.00 | 1,651 ms | 0.0008 | 0 ms |   116 KB |
| `/for-vendors/`     |        0.99 |          1.00 |           1.00 | 1.00 | 1,651 ms | 0.0471 | 0 ms |   114 KB |

Assertions enforce performance of at least 0.90, accessibility and SEO of 1.00, best practices of
at least 0.95, LCP at or below 2.5 seconds, CLS at or below 0.1, TBT at or below 200 ms, compressed
JavaScript below 75 KB, compressed CSS below 50 KB, intrinsic image sizing, and responsive image
delivery.

The final machine-readable and HTML audits are retained in `reports/lighthouse`.

## Visual artifacts

Full-page home screenshots:

- 390 × 844
- 430 × 932
- 768 × 1024
- 1024 × 768
- 1440 × 900
- 1920 × 1080

Additional 390 × 844 screenshots cover services, weddings, client contact, and vendor inquiry.
All ten artifacts are in `reports/screenshots`.

## Remaining launch verification

Playwright's iPhone and Android coverage uses browser-engine device profiles rather than physical
hardware. Complete a final smoke test on current physical iOS and Android devices after the
production origin and form credentials are configured. GitHub Pages is a static, noindex visual
preview, so its inquiry buttons are intentionally disabled; server-form delivery must be verified
on the eventual server-capable production host.
