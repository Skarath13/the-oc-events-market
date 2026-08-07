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

export const media = {
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
