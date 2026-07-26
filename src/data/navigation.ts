import { featureFlags } from './site';

export const primaryNavigation = [
  { label: 'Services', href: '/services/' },
  { label: 'Celebrations', href: '/celebrations/' },
  { label: 'About', href: '/about/' },
  ...(featureFlags.showJournal ? [{ label: 'Journal', href: '/journal/' }] : []),
  { label: 'Contact', href: '/contact/' },
] as const;

export const footerNavigation = [
  { label: 'Our Process', href: '/process/' },
  { label: 'Trusted Creative Network', href: '/trusted-creative-network/' },
  { label: 'For Vendors', href: '/for-vendors/' },
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Accessibility', href: '/accessibility/' },
] as const;
