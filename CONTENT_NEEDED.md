# Owner content needed

The website renders honestly without these facts. Unverified sections are disabled in
`src/data/site.ts`; package pages remain accessible for review but are noindex and excluded from the
sitemap.

## Required before a production launch

- Original transparent logo in SVG or high-resolution PNG. The header currently uses a live-text
  fallback and the favicon is temporary.
- Final domain and production deployment provider.
- Public inquiry email and the private destination inbox for form delivery.
- Exact service area. The current safe statement is Orange County, California only.
- Confirmation of which packages are actively offered: full-service planning and design, partial
  planning, and event management/coordination.
- Exact inclusions, exclusions, staffing, event-day hours, planning start windows, meeting cadence,
  purchasing/payment responsibilities, and package terminology.
- Confirmation that each published event type is actively accepted.
- Approved privacy notice, terms, and form consent wording from the owner/legal reviewer.
- Real portfolio galleries, verified facts, photographer permissions, and vendor-credit wording.
- Production email and bot-defense credentials.

## Business identity and contact

- Legal business name, if different from the public brand.
- Public email.
- Public phone or text number and whether it may be linked.
- Preferred contact method.
- Public address only if legitimate and intentionally published; do not supply a residential address
  merely for SEO.
- Confirmed business hours.
- Owner name, approved biography, role/title, pronouns if desired, and headshot.
- Social profile URLs.
- Google Business Profile URL.

## Optional, publish only when verified

- Public pricing, minimum investment, or owner-approved budget bands.
- Verified testimonials with exact wording, attribution, and publication permission.
- Awards, certifications, memberships, press, and source links.
- Vendor logos and written permission.
- Venue relationships or partnerships and written permission.
- Proposals/engagement planning as an active event category.
- Private-home event availability.
- Response-time expectation.
- Analytics provider and property/site ID.
- IndexNow key if the owner elects to use it after launch.

## Feature flags to review

All begin `false`: `showPricing`, `showTestimonials`, `showTeam`, `showPhone`, `showAddress`,
`showVendorLogos`, `showAwards`, `showJournal`, `showCelebrationStories`,
`showProposalPlanning`, and `showPackagePagesInNavigation`.

Do not flip a flag until the associated content, claim, permissions, and page-level QA are complete.
