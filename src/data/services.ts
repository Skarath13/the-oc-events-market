import type { MediaKey } from './media';

export type Faq = {
  question: string;
  answer: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  forWhom: string[];
  capabilities: Array<{ title: string; body: string }>;
  considerations: Array<{ title: string; body: string }>;
  faqs: Faq[];
  image: MediaKey;
  imageAlt: string;
  verified: boolean;
};

export const services: ServicePage[] = [
  {
    slug: 'full-service-planning-design',
    title: 'Full-Service Planning & Design',
    shortTitle: 'Full-Service Planning & Design',
    metaTitle: 'Full-Service Event Planning & Design in Orange County',
    metaDescription:
      'One planning partner for the roadmap, design direction, vendor coordination, logistics, and event-day execution included in your Orange County package.',
    h1: 'Full-Service Event Planning & Design in Orange County',
    summary:
      'A full-service event planner can manage the planning roadmap, design direction, vendor coordination, logistics, and event-day execution included in the client’s package. The exact scope, responsibilities, and availability of this service must be confirmed in the proposal.',
    forWhom: [
      'Hosts who want one planning partner to organize decisions from an early stage.',
      'Clients who value cohesive design and a coordinated vendor team.',
      'Busy hosts who do not want to personally own every deadline, handoff, and event-day detail.',
    ],
    capabilities: [
      {
        title: 'Planning roadmap',
        body: 'A clear sequence for decisions, deadlines, approvals, and responsibilities included in the engagement.',
      },
      {
        title: 'Creative direction',
        body: 'A shared visual direction that can guide layout, rentals, florals, tabletop, signage, and related choices.',
      },
      {
        title: 'Vendor coordination',
        body: 'Recommendations when included, plus organized communication with trusted partners or vendors already selected.',
      },
      {
        title: 'Logistics and event flow',
        body: 'An approved timeline, arrival plan, production dependencies, and guest-experience transitions.',
      },
    ],
    considerations: [
      {
        title: 'Scope before assumptions',
        body: 'Full service means different things across planning companies. The proposal should state the meetings, sourcing, design work, purchasing, production, staffing, and event-day hours included.',
      },
      {
        title: 'Decision ownership',
        body: 'The strongest engagements identify what the client approves, what the planner manages, and how vendor contracts and payments are handled.',
      },
      {
        title: 'Budget structure',
        body: 'A working budget is most useful when it connects priorities to real decisions. No savings, discount, or fixed investment claim is made without verified package data.',
      },
    ],
    faqs: [
      {
        question: 'What does a full-service event planner handle?',
        answer:
          'A full-service planner may guide the roadmap, design, vendor team, logistics, and event-day work. The signed proposal is the authority for exactly what is included.',
      },
      {
        question: 'Will you work with vendors we already booked?',
        answer:
          'Yes. Your existing professionals can be coordinated into the approved plan and timeline according to the selected scope.',
      },
      {
        question: 'Does full service include design and decor?',
        answer:
          'It may include design direction, decor planning, rentals, layouts, and related coordination. Those responsibilities must be listed in the proposal before booking.',
      },
      {
        question: 'Is event-day management included?',
        answer:
          'Only when stated in the selected service. The proposal should define staffing, hours, setup responsibilities, and event-day handoffs.',
      },
    ],
    image: 'planningDetail',
    imageAlt: 'Flowers, candles, and glassware arranged on a warm dinner table',
    verified: false,
  },
  {
    slug: 'partial-planning',
    title: 'Partial Planning',
    shortTitle: 'Partial Planning',
    metaTitle: 'Partial Event Planning in Orange County',
    metaDescription:
      'Support for hosts who have started planning and need help with selected decisions, vendors, design, or logistics. Final scope is confirmed before booking.',
    h1: 'Partial Event Planning in Orange County',
    summary:
      'Partial planning is designed for a host who has already made progress and needs experienced support across selected decisions, design work, vendors, or logistics. Availability and inclusions must be confirmed before this service is published as an active package.',
    forWhom: [
      'Hosts who have chosen a venue or key vendors but need structure for what comes next.',
      'Clients who want professional help with specific planning or design workstreams.',
      'Events where the remaining responsibilities need to be clearly divided between host and planner.',
    ],
    capabilities: [
      {
        title: 'Planning audit',
        body: 'Review what is decided, contracted, outstanding, and at risk before setting the next priorities.',
      },
      {
        title: 'Selected vendor support',
        body: 'Coordinate defined vendor categories or communication handoffs without implying that every vendor is sourced.',
      },
      {
        title: 'Design refinement',
        body: 'Bring selected visual decisions into a more cohesive direction when design support is part of the scope.',
      },
      {
        title: 'Logistics structure',
        body: 'Organize the timeline, layouts, arrivals, and dependencies included in the engagement.',
      },
    ],
    considerations: [
      {
        title: 'Start with an honest status review',
        body: 'The planner needs contracts, deadlines, budgets, and existing decisions before accepting responsibility for an in-progress plan.',
      },
      {
        title: 'Define the handoff',
        body: 'A partial scope should make clear which decisions remain with the client and which workstreams move to the planner.',
      },
      {
        title: 'Protect the critical path',
        body: 'Venue requirements, vendor dependencies, rental deadlines, and guest communications may constrain what can still change.',
      },
    ],
    faqs: [
      {
        question: 'When is partial planning a good fit?',
        answer:
          'It can fit when meaningful planning is already complete but selected workstreams still need structure or professional guidance.',
      },
      {
        question: 'Can you review vendors we already hired?',
        answer:
          'Existing vendor information can be reviewed and coordinated when that work is included. The planner does not replace the client’s legal review of contracts.',
      },
      {
        question: 'Can partial planning include design help?',
        answer:
          'It may. The proposal should identify the design decisions, deliverables, sourcing, and installation responsibilities included.',
      },
      {
        question: 'How is this different from coordination?',
        answer:
          'Partial planning can shape remaining decisions before the final coordination period. Coordination generally organizes an approved plan closer to the event.',
      },
    ],
    image: 'venue',
    imageAlt: 'Outdoor event tables arranged among greenery',
    verified: false,
  },
  {
    slug: 'event-management-coordination',
    title: 'Event Management & Coordination',
    shortTitle: 'Event Management',
    metaTitle: 'Event Management & Coordination in Orange County',
    metaDescription:
      'For hosts who planned the event and need help aligning approved details, vendors, timelines, and event-day flow. Scope varies by selected service.',
    h1: 'Event Management & Coordination in Orange County',
    summary:
      'Event management and coordination organize approved plans, vendor details, timelines, and the included event-day flow. It is not automatically the same as full planning, design, unlimited setup, or responsibility for decisions made before the handoff.',
    forWhom: [
      'Hosts who have made the major planning and vendor decisions.',
      'Clients who need one timeline and communication point as the event approaches.',
      'Events with a defined plan that needs a careful operational handoff.',
    ],
    capabilities: [
      {
        title: 'Plan handoff',
        body: 'Gather the approved contracts, contacts, decisions, floor plans, and schedules included in the engagement.',
      },
      {
        title: 'Vendor confirmations',
        body: 'Confirm defined arrival details and dependencies without silently assuming responsibilities outside the scope.',
      },
      {
        title: 'Working timeline',
        body: 'Bring the event sequence, production moments, and vendor movements into one usable run of show.',
      },
      {
        title: 'Included event-day flow',
        body: 'Manage the stated hours, transitions, and escalation path with the approved team.',
      },
    ],
    considerations: [
      {
        title: 'A coordinated plan must already exist',
        body: 'Late-stage coordination cannot safely replace unresolved venue, design, vendor, budget, or guest-experience decisions.',
      },
      {
        title: 'Setup and breakdown need owners',
        body: 'Every rental, decor, personal item, and vendor delivery should have a named setup and removal responsibility.',
      },
      {
        title: 'Authority prevents confusion',
        body: 'The planner, client, venue, and vendors should understand who can approve timeline changes and resolve event-day conflicts.',
      },
    ],
    faqs: [
      {
        question: 'Is coordination the same as full planning?',
        answer:
          'No. Coordination organizes approved details closer to the event. Full planning can shape decisions, design, vendors, and logistics much earlier.',
      },
      {
        question: 'When does the coordination handoff begin?',
        answer:
          'Timing must be confirmed in the package. No handoff window is published until the owner verifies the service terms.',
      },
      {
        question: 'Will you contact every vendor?',
        answer:
          'Defined vendor confirmations may be included. The proposal should identify the communication scope and any vendors the client continues to manage.',
      },
      {
        question: 'Does coordination include decorating?',
        answer:
          'Not automatically. Setup, styling, personal decor, rentals, and breakdown should be separately defined in the selected service.',
      },
    ],
    image: 'network',
    imageAlt: 'An intimate outdoor dining setup surrounded by greenery',
    verified: false,
  },
];

export const getServiceBySlug = (slug: string) => services.find((service) => service.slug === slug);
