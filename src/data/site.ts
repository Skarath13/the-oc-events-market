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
  descriptor: 'Event Planning & Design',
  brandPromise: 'Your vision. Every detail. Thoughtfully coordinated.',
  shortDefinition:
    'The OC Events Market is a planner-led event planning and design practice in Orange County.',
  fullDefinition:
    'The OC Events Market is a planner-led event planning and design practice in Orange County. From intimate gatherings to large-scale events, the work connects the vision, plan, vendors, and approved details through event day.',
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
  ogImage: '/social/og-default.jpg',
} as const;

const textMessageBody =
  'Hi! I’d like to plan an event with The OC Events Market. Event type: [type]. Date or planning window: [date]. Estimated guest count: [count].';

export const contactLinks = {
  phone: `tel:${siteConfig.publicPhone}`,
  text: `sms:${siteConfig.publicPhone}?&body=${encodeURIComponent(textMessageBody)}`,
} as const;

export const coreFaqs = [
  {
    question: 'Can I use vendors I already chose?',
    answer:
      'Yes. We can bring the professionals you already know into the event plan and timeline according to the scope of your selected service.',
  },
  {
    question: 'Can you recommend vendors?',
    answer:
      'Yes. When sourcing is part of your service, we can recommend professionals suited to the event’s needs, direction, and logistics. You are not required to replace vendors you have already selected.',
  },
  {
    question: 'What kinds of events do you plan?',
    answer:
      'The OC Events Market plans weddings, baby and bridal showers, birthdays and milestone celebrations, children’s parties, and corporate or brand events in Orange County.',
  },
  {
    question: 'How early should I inquire?',
    answer:
      'Inquire once you have a working date or planning window, even if the venue and every detail are not decided. Availability depends on the date, event scope, and planning support required.',
  },
  {
    question: 'Do you help with event design and decor?',
    answer:
      'Design direction, decor, rentals, layouts, and related vendor coordination may be included depending on the selected service. Your proposal will state exactly what we will handle.',
  },
  {
    question: 'Do you manage the event day?',
    answer:
      'Event-day management is included only when stated in the selected service. When included, we coordinate the approved timeline, vendor arrivals, setup flow, and planned event transitions.',
  },
  {
    question: 'What is the difference between planning and coordination?',
    answer:
      'Planning shapes decisions before the event: scope, budget structure, design, vendors, logistics, and timeline. Coordination organizes approved plans and vendor details closer to the event and manages the included event-day flow.',
  },
] as const;

export const capabilityRows = [
  {
    title: 'Vision and creative direction',
    body: 'Turn the occasion, priorities, and desired guest experience into a clear visual and planning direction.',
  },
  {
    title: 'Budget and planning roadmap',
    body: 'Organize the decisions, working budget, deadlines, and responsibilities included in the selected scope.',
  },
  {
    title: 'Venue and vendor coordination',
    body: 'Source trusted professionals when included or bring the vendors already selected into one communication plan.',
  },
  {
    title: 'Design, decor, rentals, and layout',
    body: 'Guide the elements that shape how the celebration looks, feels, and moves, as defined in the proposal.',
  },
  {
    title: 'Timeline and logistics',
    body: 'Build the working schedule, arrival details, dependencies, and transitions that keep the event moving.',
  },
  {
    title: 'Event-day management',
    body: 'When included, oversee the approved timeline, vendor flow, setup priorities, and key event transitions.',
  },
] as const;

export const processSteps = [
  {
    title: 'Discover',
    body: 'Learn the occasion, priorities, guest experience, working budget, and visual direction.',
  },
  {
    title: 'Plan & Design',
    body: 'Build the roadmap, concept, timeline, layout, and decision structure included in the service.',
  },
  {
    title: 'Coordinate Every Piece',
    body: 'Source the right professionals when included or organize the vendors already selected.',
  },
  {
    title: 'Bring It to Life',
    body: 'Manage the approved details and event-day flow so the host can stay present.',
  },
] as const;
