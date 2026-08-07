# Content editing guide

## Business facts and feature flags

Edit `src/data/site.ts` for centralized business identity, service area, contact details, social
profiles, and feature flags. A missing value should stay `null` or an empty array. Never add a
placeholder claim to make a section appear complete.

Event-type copy lives in `src/data/eventTypes.ts`. Package previews live in
`src/data/services.ts`; set a package’s `verified` field to `true` only after its current offer and
scope are owner-approved. Run `pnpm check` after any data change.

## Add a celebration

Create `src/content/celebrations/descriptive-slug.md`. Use the typed fields defined in
`src/content.config.ts`:

```yaml
---
title: Verified celebration title
eventType: Wedding
location: Newport Beach, California
venue: Verified venue name
date: 2026-01-01
summary: A concise factual summary.
clientGoal: Verified client goal.
planningScope:
  - Verified responsibility
designDirection: Verified design direction.
vendorCoordination: Verified coordination work.
logisticalChallenge: Verified challenge.
solution: Verified solution.
result: Verified factual outcome without inflated claims.
featuredImage: /approved-image-path.jpg
gallery:
  - src: /approved-gallery-image.jpg
    alt: Specific visible content and context
vendorCredits:
  - Vendor Name — Role
featured: false
draft: true
---
```

Keep `draft: true` until every fact, image permission, alt description, and credit is reviewed.
Then enable `showCelebrationStories` and rerun all tests.

## Add a journal article

The existing eight Markdown files are owner-review briefs, not publishable articles. Add first-hand
experience, verified facts, a real author, dates, and approved images before changing `draft`.
Required planning fields include `searchIntent`, `audienceQuestion`, `ownerContributionNeeded`,
`proposedOutline`, `internalLinks`, `assetsNeeded`, `factsToVerify`, and `conversionCta`.

When publishing, also set `author`, `publishedAt`, and—when applicable—`updatedAt`, `heroImage`, and
`heroImageAlt`. Enable `showJournal` only after the journal index contains reviewed articles.

## Editorial rules

- Use one clear H1, direct answer-first openings, descriptive headings, and useful internal links.
- Every line must earn its place by creating desire, expressing a point of view, clarifying a
  decision, or moving the reader forward. Cut copy that merely narrates the image, restates the
  section, or announces the obvious. Phrases such as "real events, real details" are labels, not
  ideas.
- Keep visible image captions editorial and restrained. Let the surrounding headline and body
  carry the brand promise; use alt text only to describe the meaningful visual content accurately
  for someone who cannot see it.
- Prefer confident, specific language over filler such as "beautiful moments," "special details,"
  "made with love," or "we bring your vision to life."
- Describe scope with “may” or “when included” until package inclusions are contractually verified.
- Never create a case study from stock photography.
- Never publish client names, addresses, dates, budgets, images, or vendor credits without
  permission.
- Preserve descriptive alt text for informative images and empty alt text only for decoration.
- Run `pnpm format`, `pnpm check`, `pnpm build`, and the relevant Playwright tests.
