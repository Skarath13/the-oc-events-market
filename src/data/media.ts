import type { ImageMetadata } from 'astro';
import heroDesktop from '@/assets/images/hero-desktop.jpg';
import heroMobile from '@/assets/images/hero-mobile.jpg';
import weddings from '@/assets/images/weddings.jpg';
import birthdays from '@/assets/images/birthdays.jpg';
import kidsParties from '@/assets/images/kids-parties.jpg';
import corporate from '@/assets/images/corporate.jpg';
import planningDetail from '@/assets/images/planning-detail.jpg';
import network from '@/assets/images/network.jpg';
import venue from '@/assets/images/venue.jpg';
import actualDessertFavorCollection from '@/assets/images/actual/dessert-favor-collection.webp';
import actualDuckCakePops from '@/assets/images/actual/duck-cake-pops.webp';
import actualFiftiethMilestoneBalloonBackdrop from '@/assets/images/actual/fiftieth-milestone-balloon-backdrop.webp';
import actualFirstBirthdayBalloonBackdrop from '@/assets/images/actual/first-birthday-balloon-backdrop.webp';

export const media = {
  heroDesktop,
  heroMobile,
  weddings,
  birthdays,
  kidsParties,
  corporate,
  planningDetail,
  network,
  venue,
  actualDessertFavorCollection,
  actualDuckCakePops,
  actualFiftiethMilestoneBalloonBackdrop,
  actualFirstBirthdayBalloonBackdrop,
} satisfies Record<string, ImageMetadata>;

export type MediaKey = keyof typeof media;
