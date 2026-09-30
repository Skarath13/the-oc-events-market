import type { ImageMetadata } from 'astro';
import actualBirthdayGiftTable from '@/assets/images/actual/birthday-gift-table.webp';
import actualBuffetServiceTable from '@/assets/images/actual/buffet-service-table.webp';
import actualCupcakeDisplay from '@/assets/images/actual/cupcake-display.webp';
import actualDessertFavorCollection from '@/assets/images/actual/dessert-favor-collection.webp';
import actualDuckCakePops from '@/assets/images/actual/duck-cake-pops.webp';
import actualFiftiethMilestoneBalloonBackdrop from '@/assets/images/actual/fiftieth-milestone-balloon-backdrop.webp';
import actualFirstBirthdayBalloonBackdrop from '@/assets/images/actual/first-birthday-balloon-backdrop.webp';
import actualGuestTableSetup from '@/assets/images/actual/guest-table-setup.webp';
import actualRefreshmentTable from '@/assets/images/actual/refreshment-table.webp';
import actualRestroomTrailer from '@/assets/images/actual/restroom-trailer.webp';
import actualCoastalWedding from '@/assets/images/actual/coastal-wedding.webp';
import actualWeddingStaircase from '@/assets/images/actual/wedding-staircase.webp';
import actualGardenCeremony from '@/assets/images/actual/garden-ceremony.webp';
import actualWeddingTablescape from '@/assets/images/actual/wedding-tablescape.webp';
import actualPinkShowerBackdrop from '@/assets/images/actual/pink-shower-backdrop.webp';
import actualMilestoneDessertTable from '@/assets/images/actual/milestone-dessert-table.webp';
import actualOutdoorPhotoBooth from '@/assets/images/actual/outdoor-photo-booth.webp';
import actualPhotoBoothStyling from '@/assets/images/actual/photo-booth-styling.webp';
import actualDrapedPhotoBackdrop from '@/assets/images/actual/draped-photo-backdrop.webp';
import actualGardenPhotoBooth from '@/assets/images/actual/garden-photo-booth.webp';

import actualCoastalWeddingLift from '@/assets/images/actual/coastal-wedding-lift.webp';
import actualMilestoneLiveMusic from '@/assets/images/actual/milestone-live-music.webp';
import actualCoastalWeddingPortrait from '@/assets/images/actual/coastal-wedding-portrait.webp';
import actualCoastalWeddingMonochrome from '@/assets/images/actual/coastal-wedding-monochrome.webp';
import actualCoastalWeddingEmbrace from '@/assets/images/actual/coastal-wedding-embrace.webp';
import actualCoastalWeddingFamily from '@/assets/images/actual/coastal-wedding-family.webp';
import actualCoastalWeddingParty from '@/assets/images/actual/coastal-wedding-party.webp';
import actualCoastalWeddingBouquet from '@/assets/images/actual/coastal-wedding-bouquet.webp';
import actualCoastalWeddingFloralFrame from '@/assets/images/actual/coastal-wedding-floral-frame.webp';
import actualCoastalWeddingSunlight from '@/assets/images/actual/coastal-wedding-sunlight.webp';
import actualCoastalWeddingBeachEmbrace from '@/assets/images/actual/coastal-wedding-beach-embrace.webp';
import actualWeddingSweetheartTable from '@/assets/images/actual/wedding-sweetheart-table.webp';
import actualWeddingFirstDance from '@/assets/images/actual/wedding-first-dance.webp';
import actualWeddingBalloonExit from '@/assets/images/actual/wedding-balloon-exit.webp';
import actualCoastalWeddingBouquetCloseup from '@/assets/images/actual/coastal-wedding-bouquet-closeup.webp';
import actualCoastalWeddingPartyWide from '@/assets/images/actual/coastal-wedding-party-wide.webp';
import actualWeddingDanceMusicians from '@/assets/images/actual/wedding-dance-musicians.webp';
import actualCoastalWeddingEmbraceCloseup from '@/assets/images/actual/coastal-wedding-embrace-closeup.webp';
import actualGardenWeddingRecessional from '@/assets/images/actual/garden-wedding-recessional.webp';
import actualGardenWeddingFamily from '@/assets/images/actual/garden-wedding-family.webp';
import actualWeddingBridalGroup from '@/assets/images/actual/wedding-bridal-group.webp';
import actualPinkShowerCouple from '@/assets/images/actual/pink-shower-couple.webp';
import actualPinkShowerFamily from '@/assets/images/actual/pink-shower-family.webp';
import actualPinkShowerFamilyPortrait from '@/assets/images/actual/pink-shower-family-portrait.webp';
import actualOutdoorPhotoBoothProps from '@/assets/images/actual/outdoor-photo-booth-props.webp';
import actualIndoorPhotoBoothGuests from '@/assets/images/actual/indoor-photo-booth-guests.webp';
import actualIndoorPhotoBoothDetails from '@/assets/images/actual/indoor-photo-booth-details.webp';

export const media = {
  actualCoastalWeddingLift,
  actualMilestoneLiveMusic,
  actualCoastalWeddingPortrait,
  actualCoastalWeddingMonochrome,
  actualCoastalWeddingEmbrace,
  actualCoastalWeddingFamily,
  actualCoastalWeddingParty,
  actualCoastalWeddingBouquet,
  actualCoastalWeddingFloralFrame,
  actualCoastalWeddingSunlight,
  actualCoastalWeddingBeachEmbrace,
  actualWeddingSweetheartTable,
  actualWeddingFirstDance,
  actualWeddingBalloonExit,
  actualCoastalWeddingBouquetCloseup,
  actualCoastalWeddingPartyWide,
  actualWeddingDanceMusicians,
  actualCoastalWeddingEmbraceCloseup,
  actualGardenWeddingRecessional,
  actualGardenWeddingFamily,
  actualWeddingBridalGroup,
  actualPinkShowerCouple,
  actualPinkShowerFamily,
  actualPinkShowerFamilyPortrait,
  actualOutdoorPhotoBoothProps,
  actualIndoorPhotoBoothGuests,
  actualIndoorPhotoBoothDetails,
  actualCoastalWedding,
  actualWeddingStaircase,
  actualGardenCeremony,
  actualWeddingTablescape,
  actualPinkShowerBackdrop,
  actualMilestoneDessertTable,
  actualOutdoorPhotoBooth,
  actualPhotoBoothStyling,
  actualDrapedPhotoBackdrop,
  actualGardenPhotoBooth,
  actualBirthdayGiftTable,
  actualBuffetServiceTable,
  actualCupcakeDisplay,
  actualDessertFavorCollection,
  actualDuckCakePops,
  actualFiftiethMilestoneBalloonBackdrop,
  actualFirstBirthdayBalloonBackdrop,
  actualGuestTableSetup,
  actualRefreshmentTable,
  actualRestroomTrailer,
} satisfies Record<string, ImageMetadata>;

export type MediaKey = keyof typeof media;
