# Photo replacement plan

The stock set is suitable for a noindex staging preview, not final portfolio proof. Replace images
only with files the owner controls or has written commercial permission to publish.

## Current partial replacement

The homepage actual-details module and the shower event image now use selected owner-provided real
event details, including first-birthday and 50th-milestone backdrops. Wedding, birthday, kids’ party
gateway, corporate, hero, About, venue, and broader planning imagery remain editorial stock until
matching rights-cleared actuals are available. The portrait balloon images are intentionally kept in
portrait cards instead of being forced into landscape hero crops.

## Replacement order

1. **Hero — critical.** Supply one signature real event with separate landscape and portrait crops.
   Preserve clear text-safe areas and provide photographer and vendor credit requirements.
2. **Event gateways — high.** Supply at least one verified wedding, shower, birthday, kids’ party,
   and corporate/brand event. Each image must belong to the matching event type.
3. **Celebration stories — high.** Supply complete galleries and verified project facts before
   enabling `showCelebrationStories`.
4. **Planning proof — medium.** Add legitimate behind-the-scenes images: walkthroughs, floor plans,
   timeline review, installation, vendor check-in, or detail styling. Do not expose private client
   data in documents or screens.
5. **About/team — medium.** Add an approved owner portrait and working image before enabling
   `showTeam`.
6. **Social and icons — critical for launch.** Replace the temporary Open Graph image and favicon
   set after the original transparent logo is received.

## Per-image intake

Record the original file, creator, copyright owner, written usage permission, event name, event type,
venue, city, alt-text context, vendor-credit wording, consent limits, and expiration or takedown
terms. Keep model releases where recognizable people are central. Do not infer consent from an
Instagram post.

After replacement, remove the unused stock source from `src/assets/images`, update
`IMAGE_LICENSES.md`, verify all crops at the six required viewports, and rerun `pnpm verify`.
