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
  brandPromise: 'Your vision. Every detail. Thoughtfully coordinated.',
  shortDefinition:
    'The OC Events Market is an event planning and design practice led by a dedicated planner in Orange County.',
  fullDefinition:
    'The OC Events Market is an event planning and design practice led by a dedicated planner in Orange County. From intimate gatherings to large events, the work connects the vision, plan, vendors, and approved details through the event.',
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
      'Management on the day of the event is included only when stated in the selected service. When included, we coordinate the approved timeline, vendor arrivals, setup flow, and planned event transitions.',
  },
  {
    question: 'What is the difference between planning and coordination?',
    answer:
      'Planning shapes decisions before the event, including scope, budget structure, design, vendors, logistics, and the timeline. Coordination organizes approved plans and vendor details closer to the event and manages the flow included on the event day.',
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
    title: 'Management on the event day',
    body: 'When included, oversee the approved timeline, vendor flow, setup priorities, and key event transitions.',
  },
] as const;
