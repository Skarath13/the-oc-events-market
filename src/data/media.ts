import type { ImageMetadata } from 'astro';
import heroDesktop from '@/assets/images/hero-desktop.jpg';
import heroMobile from '@/assets/images/hero-mobile.jpg';
import weddings from '@/assets/images/weddings.jpg';
import showers from '@/assets/images/showers.jpg';
import birthdays from '@/assets/images/birthdays.jpg';
import kidsParties from '@/assets/images/kids-parties.jpg';
import corporate from '@/assets/images/corporate.jpg';
import planningDetail from '@/assets/images/planning-detail.jpg';
import network from '@/assets/images/network.jpg';
import venue from '@/assets/images/venue.jpg';

export const media = {
  heroDesktop,
  heroMobile,
  weddings,
  showers,
  birthdays,
  kidsParties,
  corporate,
  planningDetail,
  network,
  venue,
} satisfies Record<string, ImageMetadata>;

export type MediaKey = keyof typeof media;
