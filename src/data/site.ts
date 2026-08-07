export type FeatureFlags = {
  showPricing: boolean;
  showTestimonials: boolean;
  showTeam: boolean;
  showPhone: boolean;
  showAddress: boolean;
  showVendorLogos: boolean;
  showAwards: boolean;
  showJournal: boolean;
  showCelebrationStories: boolean;
  showProposalPlanning: boolean;
  showPackagePagesInNavigation: boolean;
};

export const featureFlags: FeatureFlags = {
  showPricing: false,
  showTestimonials: false,
  showTeam: false,
  showPhone: true,
  showAddress: false,
  showVendorLogos: false,
  showAwards: false,
  showJournal: false,
  showCelebrationStories: false,
  showProposalPlanning: false,
  showPackagePagesInNavigation: false,
};

export const siteConfig = {
  businessName: 'The OC Events Market',
  descriptor: 'Event Planning and Design',
  brandPromise: 'Beautifully imagined. Impeccably run.',
  shortDefinition: 'The OC Events Market is an Orange County event planning and design studio.',
  fullDefinition:
    'The OC Events Market is an Orange County event planning and design studio. From intimate gatherings to celebrations of every scale, the studio brings creative direction, vendors, logistics, and event day flow into one beautifully considered plan.',
  serviceArea: 'Orange County, California',
  serviceAreaShort: 'Orange County',
  logo: {
    src: null as string | null,
    alt: 'The OC Events Market',
  },
  publicEmail: null as string | null,
  publicPhone: '+19495913087',
  publicPhoneDisplay: '+1 (949) 591-3087',
  publicAddress: null as string | null,
  hours: null as string | null,
  socialProfiles: [] as Array<{ label: string; href: string }>,
  googleBusinessProfile: null as string | null,
  legalName: null as string | null,
  locale: 'en_US',
  ogImage: '/videos/actual/actual-dessert-finishing-v1-poster.webp',
} as const;

const inquiryDraft = 'Hi! I’d like to inquire about planning an event with The OC Events Market.';
const vendorIntroductionDraft =
  'Hi! I’d like to introduce my event business to The OC Events Market.';
const createTextLink = (body: string) =>
  `sms:${siteConfig.publicPhone}?&body=${encodeURIComponent(body)}`;

export const contactLinks = {
  inquiryText: createTextLink(inquiryDraft),
  vendorIntroductionText: createTextLink(vendorIntroductionDraft),
} as const;

export const coreFaqs = [
  {
    question: 'Can I use vendors I already chose?',
    answer:
      'Absolutely. We bring the professionals you already love into the same creative direction, communication flow, and event timeline.',
  },
  {
    question: 'Can you recommend vendors?',
    answer:
      'Yes. When sourcing is part of the plan, we recommend professionals who fit the vision, logistics, and working budget. You can keep a great team you already have.',
  },
  {
    question: 'What kinds of events do you plan?',
    answer:
      'The OC Events Market plans weddings, baby and bridal showers, birthdays and milestone celebrations, children’s parties, and corporate or brand events in Orange County.',
  },
  {
    question: 'How early should I inquire?',
    answer:
      'As soon as you have a date or planning window. The venue, guest count, and design can still be taking shape; we will start with what you know and build from there.',
  },
  {
    question: 'Do you help with event design and decor?',
    answer:
      'Yes, when design is part of your plan. We can shape the visual direction, layout, rentals, decor, and the vendor team that brings it to life. Your proposal makes every deliverable clear before you book.',
  },
  {
    question: 'Do you manage the event day?',
    answer:
      'Event day management is available when included in your proposal. We run the approved timeline, vendor arrivals, setup flow, and key transitions so the plan holds when the room comes alive.',
  },
  {
    question: 'What is the difference between planning and coordination?',
    answer:
      'Planning shapes the priorities, budget structure, design, vendors, logistics, and timeline. Coordination takes an established plan, aligns the final details, and runs the event day flow included in your proposal.',
  },
] as const;

export const capabilityRows = [
  {
    title: 'Creative direction',
    body: 'Give the occasion a distinct visual language, grounded in the people, setting, and feeling at its center.',
  },
  {
    title: 'Intelligent priorities',
    body: 'Sequence the budget, scope, approvals, and deadlines so each decision strengthens the next.',
  },
  {
    title: 'The right collaborators',
    body: 'Curate the missing specialists or bring your chosen partners into one clear working rhythm.',
  },
  {
    title: 'Space with purpose',
    body: 'Shape the layout, rentals, lighting, and guest flow so beauty and function feel inseparable.',
  },
  {
    title: 'Production with precision',
    body: 'Build the timing, arrivals, handoffs, and contingencies that keep the experience moving naturally.',
  },
  {
    title: 'A calm command',
    body: 'When event day management is included, direct the timeline, vendor flow, setup, and key transitions.',
  },
] as const;
