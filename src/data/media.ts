import type { ImageMetadata } from 'astro';
import actualDessertFavorCollection from '@/assets/images/actual/dessert-favor-collection.webp';
import actualDuckCakePops from '@/assets/images/actual/duck-cake-pops.webp';
import actualFiftiethMilestoneBalloonBackdrop from '@/assets/images/actual/fiftieth-milestone-balloon-backdrop.webp';
import actualFirstBirthdayBalloonBackdrop from '@/assets/images/actual/first-birthday-balloon-backdrop.webp';

export const media = {
  actualDessertFavorCollection,
  actualDuckCakePops,
  actualFiftiethMilestoneBalloonBackdrop,
  actualFirstBirthdayBalloonBackdrop,
} satisfies Record<string, ImageMetadata>;

export type MediaKey = keyof typeof media;
