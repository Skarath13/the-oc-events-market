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
  showPhone: false,
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
  brandPromise: 'We plan the party. You enjoy the moment.',
  shortDefinition: 'The OC Events Market is an Orange County event planning and design studio.',
  fullDefinition:
    'The OC Events Market is an Orange County event planning and design studio. We shape the vision, build the plan, coordinate the vendor team, and manage the approved details from the first idea through event day.',
  serviceArea: 'Orange County, California',
  serviceAreaShort: 'Orange County',
  logo: {
    src: null as string | null,
    alt: 'The OC Events Market',
  },
  publicEmail: null as string | null,
  publicPhone: null as string | null,
  publicAddress: null as string | null,
  hours: null as string | null,
  socialProfiles: [] as Array<{ label: string; href: string }>,
  googleBusinessProfile: null as string | null,
  legalName: null as string | null,
  locale: 'en_US',
  ogImage: '/social/og-default.jpg',
} as const;

export const coreFaqs = [
  {
    question: 'Can we use our own vendors?',
    answer:
      'Yes. You may use professionals you already know and love. We coordinate the approved vendor team around the event plan and timeline according to the scope of your selected service.',
  },
  {
    question: 'Can you recommend vendors?',
    answer:
      'Yes. When vendor sourcing is part of your service, we can recommend creative partners suited to the event’s needs and direction. You are not required to replace vendors you have already selected.',
  },
  {
    question: 'What kinds of events do you plan?',
    answer:
      'The OC Events Market plans weddings, baby and bridal showers, birthdays and milestone celebrations, children’s parties, and corporate or brand events in Orange County.',
  },
  {
    question: 'How early should we inquire?',
    answer:
      'Inquire once you have a working date or planning window, even if the venue and every detail are not decided. Availability depends on the date, event scope, and planning support required.',
  },
  {
    question: 'Do you help with event design and decor?',
    answer:
      'Design direction, decor, rentals, layouts, and related vendor coordination may be included depending on the selected service. Your proposal should state exactly what the planning team will handle.',
  },
  {
    question: 'Do you manage the event day?',
    answer:
      'Event-day management is included only when stated in the selected service. When included, the team coordinates the approved timeline, vendor arrivals, setup flow, and planned event transitions.',
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
    title: 'Coordinate the Team',
    body: 'Source trusted partners when included or organize the vendors already selected.',
  },
  {
    title: 'Bring It to Life',
    body: 'Manage the approved details and event-day flow so the host can stay present.',
  },
] as const;
