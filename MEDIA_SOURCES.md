# Media sources and licenses

## Retired stock hero video

Retrieved July 30, 2026. These files are retained for provenance but are no longer referenced by a
public route or site metadata.

### Desktop

- Source: [Elegant Outdoor Wedding Table in Tuscan Villa](https://www.pexels.com/video/elegant-outdoor-wedding-table-in-tuscan-villa-29956462/)
- Creator: Marian Croitoru
- Source asset: Pexels video 29956462
- License at retrieval: [Pexels License](https://www.pexels.com/license/)
- Local derivatives:
  - `public/videos/hero/oc-events-hero-desktop-v1.mp4`
  - `public/videos/hero/oc-events-hero-desktop-v1.webm`
  - `public/videos/hero/oc-events-hero-desktop-v1-poster.webp`

### Mobile

- Source: [Video of Food on Table](https://www.pexels.com/video/video-of-a-food-on-table-8775221/)
- Creator: Julia M Cameron
- Source asset: Pexels video 8775221
- License at retrieval: [Pexels License](https://www.pexels.com/license/)
- Local derivatives:
  - `public/videos/hero/oc-events-hero-mobile-v1.mp4`
  - `public/videos/hero/oc-events-hero-mobile-v1.webm`
  - `public/videos/hero/oc-events-hero-mobile-v1-poster.webp`

The derivatives are silent, resized, web-optimized background media. They are editorial stock
imagery and must not be represented as The OC Events Market portfolio work, staff, clients, venue,
or event documentation.

## Owner-supplied event media

Source filenames are dated August 1, August 3, and August 7, 2026; the files were supplied for this
website on August 6 and August 7, 2026. The site places selected owner-supplied event details
alongside visually relevant celebration categories. Those placements do not establish the depicted
event’s client, venue, vendor, category, or The OC Events Market’s exact scope of work.

### Published still derivatives

- `src/assets/images/actual/dessert-favor-collection.webp`
  - Source: `WhatsApp Image 2026-08-01 at 4.50.42 PM.jpeg`
  - Use: wedding planning card and wedding page hero
- `src/assets/images/actual/duck-cake-pops.webp`
  - Source: `WhatsApp Image 2026-08-01 at 7.23.58 PM.jpeg`
  - Use: shower planning card, shower page hero, and dessert-video poster
- `src/assets/images/actual/first-birthday-balloon-backdrop.webp`
  - Source: `WhatsApp Image 2026-08-03 at 11.20.07 AM.jpeg`
  - Use: kids’ party planning card and kids’ party page hero
- `src/assets/images/actual/fiftieth-milestone-balloon-backdrop.webp`
  - Source: owner-provided `Pasted Image 1.jpg`, supplied August 6, 2026
  - Use: birthday and milestone planning card and page hero
- `src/assets/images/actual/buffet-service-table.webp`
  - Source: `WhatsApp Image 2026-08-07 at 12.55.34 PM.jpeg`
  - Use: homepage real event detail gallery
- `src/assets/images/actual/restroom-trailer.webp`
  - Source: `WhatsApp Image 2026-08-07 at 12.55.34 PM (1).jpeg`
  - Use: homepage real event detail gallery; phone interface was cropped out
- `src/assets/images/actual/guest-table-setup.webp`
  - Source: `WhatsApp Image 2026-08-07 at 12.55.33 PM (2).jpeg`
  - Use: homepage real event detail gallery
- `src/assets/images/actual/birthday-gift-table.webp`
  - Source: `WhatsApp Image 2026-08-07 at 12.55.33 PM (3).jpeg`
  - Use: homepage real event detail gallery
- `src/assets/images/actual/cupcake-display.webp`
  - Source: `WhatsApp Image 2026-08-07 at 12.55.33 PM (1).jpeg`
  - Use: homepage real event detail gallery
- `src/assets/images/actual/refreshment-table.webp`
  - Source: `WhatsApp Image 2026-08-07 at 12.55.33 PM.jpeg`
  - Use: homepage real event detail gallery

The WebP derivatives are resized only when needed, stripped of source metadata, and served through
Astro’s responsive image pipeline.

### Published video derivatives

- Source: `WhatsApp Video 2026-08-01 at 4.27.45 PM.mp4`
  - The featured person was confirmed by the project owner as Ivone.
  - Use: mobile homepage hero, hands-on setup motion cards, and About profile motion
  - Local derivatives:
    - `public/videos/actual/actual-ivone-event-details-v1.mp4`
    - `public/videos/actual/actual-ivone-event-details-v1-poster.webp`
- Source: `WhatsApp Video 2026-08-01 at 4.38.31 PM.mp4`
  - Use: desktop homepage hero and shower-detail motion cards
  - Local derivatives:
    - `public/videos/actual/actual-dessert-finishing-v1.mp4`
    - `public/videos/actual/actual-dessert-finishing-v1-poster.webp`

The published clips are 24 fps, silent H.264 loops with fast-start metadata. Ivone's portrait clip
is 576 by 768 pixels and the dessert close-up is 576 by 480 pixels. Both are lazy-loaded near the
viewport. Ivone’s clip uses its optimized WebP poster. The dessert gateway card uses a generated
AVIF derivative of the duck-cake-pop still while the homepage hero uses the video’s WebP poster.
Both retain a poster surface for reduced motion, Save-Data, playback failure, or unsupported media.

The project owner directed that the supplied media be published as event work. Photographer rights,
client or venue permission, vendor-credit requirements, and decor or product-provider attribution
must remain documented outside the repository. Ivone's identity in the supplied clip and poster is
confirmed, and the About page uses that portrait and name. No role, title, ownership, or biography
is inferred from the identity confirmation. The August 7 gallery includes visible third-party
product branding and small family photographs at the project owner’s direct request. Captions remain
category-neutral and do not present any brand, person, venue, or vendor as a client, partner, or
endorser. Supplied media with visible AI-edit or export marks is not published; the trailer
screenshot was cropped to remove the phone interface.

## September 29, 2026 owner-supplied photo update

Source: Ivone's September 29 messages in the Launch Event Planning Business WhatsApp group.
All 37 unique photos are included across the wedding, shower, birthday, and Celebrations galleries.
Three new videos and the unmodified originals remain in the local Downloads folder. Only exported,
metadata-stripped WebP photographs are included in the site; Astro generates responsive derivatives
without enlarging the originals. The exact export mapping, original hashes, crops, and mask coordinates
are recorded in [the export manifest](scripts/media/whatsapp-september-29.json).

The project owner requested permanent emoji compositing. Twenty-two masks appear in sixteen photos.
Only fully visible faces of the primary wedding couple or expectant parent(s) are masked. Profile views,
partially obscured faces, and surrounding people remain unchanged by explicit instruction. This is
selective face concealment, not complete anonymization. All masks are composited into source pixels
before any responsive derivative is generated; no removable CSS overlay or unmasked source fallback
is used. The About portrait and existing approved videos are outside this photo-edit request.

The birthday music screenshot is cropped to its photographic area. The lock-screen screenshot is
cropped below the phone interface, preserving its close-up wedding detail. Both sources are included.
No AI redraw was used. Re-export with:

```sh
node scripts/export-event-photos.mjs /path/to/originals
```

Emoji artwork: [Twemoji v17.0.1](https://github.com/jdecked/twemoji/tree/v17.0.1),
Copyright Twitter, Inc. and contributors, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
The smile and heart-eyes SVGs are resized and composited over selected faces. Copies of the source
SVGs and graphics license are in `scripts/assets/privacy-emoji/`. Public attribution appears beneath
the galleries containing these adaptations.

| Site asset                           | Original file                                     | Source SHA-256                                                   | Masks |
| ------------------------------------ | ------------------------------------------------- | ---------------------------------------------------------------- | ----: |
| coastal-wedding-lift.webp            | WhatsApp Image 2026-09-29 at 6.02.58 PM.jpeg      | 844dc45eb7acd85b022542398623a92ad71ec1791a540329eb390de7f93f0ee2 |     0 |
| milestone-dessert-table.webp         | WhatsApp Image 2026-09-29 at 6.00.24 PM.jpeg      | ff205d5a3a21b8262c5bc01895f9eafe6177f5fbbf88cc5a7408fa9a09d2e016 |     0 |
| milestone-live-music.webp            | WhatsApp Image 2026-09-29 at 6.00.24 PM (1).jpeg  | 97170ae734b4c6365f49adc0b7874547f8223f4d12546699531e0bc59cabe4ef |     0 |
| coastal-wedding-portrait.webp        | WhatsApp Image 2026-09-29 at 6.02.57 PM.jpeg      | 4164aedc7fffdccdbd2aaaaf74d1c8fca6266491cdc45ffae3aa20df98c93511 |     2 |
| coastal-wedding.webp                 | WhatsApp Image 2026-09-29 at 6.02.58 PM (1).jpeg  | 5bf70ad299cf1cf8397a0cbc55ee0ed91193aa913707bd98adc92a9c5c5b6475 |     0 |
| coastal-wedding-monochrome.webp      | WhatsApp Image 2026-09-29 at 6.02.58 PM (2).jpeg  | 49ab7908610b9126a4b5e40e560f96464a1242cf399b5c05439e5cc65f265b19 |     1 |
| coastal-wedding-embrace.webp         | WhatsApp Image 2026-09-29 at 6.02.58 PM (3).jpeg  | 270e64bd671c7b751dc760ec0d79ab311f1b7855b88fc7ea7945e33038a0c570 |     1 |
| coastal-wedding-family.webp          | WhatsApp Image 2026-09-29 at 6.02.58 PM (5).jpeg  | ac7d04ed087ba1d10e34470c54c0682e92f2d5fcd0b3d77c2770ae8f28cc3101 |     2 |
| coastal-wedding-party.webp           | WhatsApp Image 2026-09-29 at 6.02.58 PM (6).jpeg  | bc463ebe58c4afb9a233331bb16dcfadb03dfd0f157a734a8cc19117099c1ef0 |     0 |
| coastal-wedding-bouquet.webp         | WhatsApp Image 2026-09-29 at 6.02.58 PM (7).jpeg  | 08f6e9db17c981dea48c65fc47497b77cdc90965ef7d331f308b3f387ed0def3 |     1 |
| coastal-wedding-floral-frame.webp    | WhatsApp Image 2026-09-29 at 6.02.58 PM (8).jpeg  | fb376a6c991c5e1db02e8158f1f3bdaeed1dd002d3ceff8e292316233a068d3b |     2 |
| coastal-wedding-sunlight.webp        | WhatsApp Image 2026-09-29 at 6.02.58 PM (9).jpeg  | 0cd8595c0b3a89908245d4bc7bdbaa876c76c636348e6d1a323a64d10a2ea634 |     1 |
| coastal-wedding-beach-embrace.webp   | WhatsApp Image 2026-09-29 at 6.02.58 PM (10).jpeg | d493ec322c36e3b9a3e50567698db448f1dc31656aca6145f4fca425dd906dbb |     0 |
| wedding-sweetheart-table.webp        | WhatsApp Image 2026-09-29 at 6.02.58 PM (11).jpeg | d2950c6f1109845ee49e5c49388be8bdff8bb3c02257c4a00657821705e535f3 |     0 |
| wedding-first-dance.webp             | WhatsApp Image 2026-09-29 at 6.02.58 PM (12).jpeg | 9a0d96ab419e8e9604f950c0adb9b0c0d23243cfbd6b1d7cb2d9c26791328299 |     0 |
| wedding-balloon-exit.webp            | WhatsApp Image 2026-09-29 at 6.02.58 PM (13).jpeg | de545366fd99eb7d008b839cbd5a2aeacec317007340c5293d040704961acede |     1 |
| coastal-wedding-bouquet-closeup.webp | WhatsApp Image 2026-09-29 at 6.02.59 PM.jpeg      | ee177eea8f27ae41ed9efb68097f6a3dd8eae775860aa4e63d42058a1a43857f |     1 |
| wedding-staircase.webp               | WhatsApp Image 2026-09-29 at 6.02.59 PM (1).jpeg  | ab1be6f932256c2d5800374c1dd684515bc2258dbf203d5b3631cdcd2e39e39d |     0 |
| garden-ceremony.webp                 | WhatsApp Image 2026-09-29 at 6.02.59 PM (2).jpeg  | 665a1f015842c79d7e8921703f411ef7367b381478a35493df3d29d2ebb31cbd |     2 |
| coastal-wedding-party-wide.webp      | WhatsApp Image 2026-09-29 at 6.02.59 PM (3).jpeg  | 5ecb738dfb14f9de018375dadcc7c5b09d527b0264c39bcbbbbbb0a0573428af |     0 |
| wedding-dance-musicians.webp         | WhatsApp Image 2026-09-29 at 6.02.59 PM (4).jpeg  | e93f7b85fe116461ca2fb377cf1e64b5d43bd833a1cd208cce24cdd2569b17d5 |     0 |
| coastal-wedding-embrace-closeup.webp | WhatsApp Image 2026-09-29 at 6.02.59 PM (5).jpeg  | 905cd01fba12d78cc290a37a476595573aff7539194aeb78735eb94d85abccfe |     0 |
| wedding-tablescape.webp              | WhatsApp Image 2026-09-29 at 6.17.33 PM.jpeg      | e2646bc6eafb954a70c9826912ca9cb23f85055de6c79d4e3730c36639a97977 |     0 |
| garden-wedding-recessional.webp      | WhatsApp Image 2026-09-29 at 6.17.33 PM (1).jpeg  | 1a30a41922364a2543e746a62ef92201cd17255a87829876b000564502a7cd80 |     1 |
| garden-wedding-family.webp           | WhatsApp Image 2026-09-29 at 6.17.33 PM (2).jpeg  | a1cfa14c144b0a25dd30e75f0c98692318910dc492e0d25e3c3ba49d127e8cd2 |     0 |
| wedding-bridal-group.webp            | WhatsApp Image 2026-09-29 at 6.17.33 PM (3).jpeg  | fd74b6d3c685f3362ec00da6b3b7de3bc6d48cfe4edb03f51414a480cd41c25f |     1 |
| pink-shower-couple.webp              | WhatsApp Image 2026-09-29 at 6.17.54 PM.jpeg      | 3508bc97766a9131608a76522d7a22e72e97dbe3d38648b03e8e2b9882e724a7 |     2 |
| pink-shower-backdrop.webp            | WhatsApp Image 2026-09-29 at 6.17.55 PM.jpeg      | e8844efabdc91142e645e587cba5bfe2c5d387adf954ebd0655d27e20a33b1bd |     2 |
| pink-shower-family.webp              | WhatsApp Image 2026-09-29 at 6.17.55 PM (1).jpeg  | eb73dddbeed0aef90d2c573cadd7130489498e5a5b25c7bd98f1e31f875af4f4 |     1 |
| pink-shower-family-portrait.webp     | WhatsApp Image 2026-09-29 at 6.17.55 PM (2).jpeg  | 84fe8c1a6461980ad71c8dc7498f11a853f73f651f50cc62d7fa99e2eaefb0db |     1 |
| outdoor-photo-booth.webp             | WhatsApp Image 2026-09-29 at 6.18.17 PM.jpeg      | 4b9855d29425063b124f56774464d26ed097f9fc36956c08a7dc6a8aace63b0d |     0 |
| outdoor-photo-booth-props.webp       | WhatsApp Image 2026-09-29 at 6.18.18 PM.jpeg      | 449b7cbcfbc7660ca82ffd513b00487368f2870a853ce22a8b8bb665043c7936 |     0 |
| indoor-photo-booth-guests.webp       | WhatsApp Image 2026-09-29 at 6.18.18 PM (1).jpeg  | 23121d387b3c9d4409249a8ee9ddeece523583fddddbc3548bb4a23810975541 |     0 |
| photo-booth-styling.webp             | WhatsApp Image 2026-09-29 at 6.18.18 PM (2).jpeg  | 0ec6ebc3879ea0291e1016ccfb4b92a92467c49c9b151bb8f43750f47664214e |     0 |
| indoor-photo-booth-details.webp      | WhatsApp Image 2026-09-29 at 6.18.18 PM (3).jpeg  | 84dbc11c846dfae74b95dc889e638d3962c00dfc5826d9fa5095bc5ad482b1df |     0 |
| draped-photo-backdrop.webp           | WhatsApp Image 2026-09-29 at 6.18.18 PM (4).jpeg  | 825414e501068af1ab8202aeb49f8c60aa7489f1b6a9c8de16d0bb4eb7425b76 |     0 |
| garden-photo-booth.webp              | WhatsApp Image 2026-09-29 at 6.18.18 PM (5).jpeg  | 28783bab66d08ad5ae260e9905fca8e2ec6612d6419b68fd5e7ce465a4e070e6 |     0 |
