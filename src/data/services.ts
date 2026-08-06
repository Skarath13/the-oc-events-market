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
    title: 'Planning and Design From Start to Finish',
    shortTitle: 'Planning From Start to Finish',
    metaTitle: 'Event Planning and Design From Start to Finish in Orange County',
    metaDescription:
      'Orange County event planning and design that connects the roadmap, creative direction, vendors, logistics, and event day flow from the first decisions forward.',
    h1: 'Planning From Start to Finish',
    summary:
      'For hosts who want the entire event to speak the same language. We connect the roadmap, design, vendors, logistics, and event day flow from the first decisions forward.',
    forWhom: [
      'You want an expert to shape the plan before the big decisions harden.',
      'A cohesive visual direction matters as much as sharp execution.',
      'You want one accountable planner across deadlines, vendors, handoffs, and event day flow.',
    ],
    capabilities: [
      {
        title: 'A roadmap with momentum',
        body: 'Sequence decisions, deadlines, approvals, and responsibilities so every next move is clear.',
      },
      {
        title: 'A recognizable point of view',
        body: 'Give layout, rentals, florals, tabletop, signage, and the guest experience one visual language.',
      },
      {
        title: 'The right team, working as one',
        body: 'Source the missing specialists or bring your chosen vendors into one communication and production plan.',
      },
      {
        title: 'A room that runs beautifully',
        body: 'Connect arrivals, production dependencies, service, transitions, and the moments guests actually experience.',
      },
    ],
    considerations: [
      {
        title: 'Clarity before the work begins',
        body: 'Your proposal defines meetings, sourcing, design, purchasing, production, staffing, and event day coverage in plain language.',
      },
      {
        title: 'Fast decisions need clear owners',
        body: 'We identify what you approve, what your planner manages, and how vendor contracts and payments move.',
      },
      {
        title: 'Let the budget express the priorities',
        body: 'A useful working budget turns what matters most into a sequence of informed creative and production decisions.',
      },
    ],
    faqs: [
      {
        question: 'What does an event planner handle from start to finish?',
        answer:
          'The engagement can cover the roadmap, design, vendors, logistics, and event day management. Your proposal defines the exact deliverables and coverage before you book.',
      },
      {
        question: 'Will you work with vendors we already booked?',
        answer:
          'Absolutely. We bring your existing professionals into the same creative direction, communication flow, and event timeline.',
      },
      {
        question: 'Does planning from start to finish include design and decor?',
        answer:
          'Design direction, decor planning, rentals, layouts, and related coordination can be included. The proposal makes each creative deliverable and installation responsibility clear.',
      },
      {
        question: 'Is management on the event day included?',
        answer:
          'Event day management is included when it appears in your proposal, along with team size, hours, setup responsibilities, and handoffs.',
      },
    ],
    image: 'actualDessertFavorCollection',
    imageAlt: 'Packaged mini cakes and decorated cake pops presented in blush pink favor boxes',
    verified: false,
  },
  {
    slug: 'partial-planning',
    title: 'Partial Planning',
    shortTitle: 'Partial Planning',
    metaTitle: 'Partial Event Planning in Orange County',
    metaDescription:
      'Partial event planning in Orange County for hosts who have started and want expert help with selected decisions, design, vendors, or logistics.',
    h1: 'Partial Planning for What Comes Next',
    summary:
      'You have momentum. We bring the perspective, structure, and accountability to make the remaining decisions feel intentional instead of inherited.',
    forWhom: [
      'You have a venue or key vendors and need a smarter plan for what comes next.',
      'Specific creative or planning workstreams need an experienced owner.',
      'The remaining responsibilities need a clean divide between host, planner, and vendors.',
    ],
    capabilities: [
      {
        title: 'A sharp reset',
        body: 'See what is decided, contracted, outstanding, and at risk before setting the next priorities.',
      },
      {
        title: 'Focused vendor support',
        body: 'Take ownership of the vendor categories and communication handoffs that need it most.',
      },
      {
        title: 'A stronger creative direction',
        body: 'Bring existing inspiration, rentals, decor, and visual decisions into a more cohesive direction.',
      },
      {
        title: 'Structure for the final stretch',
        body: 'Organize timelines, layouts, arrivals, and dependencies before the event starts moving fast.',
      },
    ],
    considerations: [
      {
        title: 'Start with the full picture',
        body: 'Contracts, deadlines, budgets, and existing decisions show us where the plan is strong and where it needs attention.',
      },
      {
        title: 'Make the handoff clean',
        body: 'We define which decisions stay with you and which workstreams move to your planner.',
      },
      {
        title: 'Protect what cannot slip',
        body: 'Venue requirements, vendor dependencies, rental deadlines, and guest communication set the critical path.',
      },
    ],
    faqs: [
      {
        question: 'When is partial planning a good fit?',
        answer:
          'It is a strong fit when meaningful planning is complete but the remaining creative or operational work needs an expert owner.',
      },
      {
        question: 'Can you review vendors we already hired?',
        answer:
          'Yes, when vendor review or coordination is part of your proposal. You remain responsible for legal review of the contracts you sign.',
      },
      {
        question: 'Can partial planning include design help?',
        answer:
          'Yes. Your proposal can define the creative decisions, design deliverables, sourcing, and installation responsibilities you want us to own.',
      },
      {
        question: 'How is this different from coordination?',
        answer:
          'Partial planning still shapes open decisions. Coordination takes an established plan, aligns the final details, and carries it into the event day flow.',
      },
    ],
    image: 'actualFiftiethMilestoneBalloonBackdrop',
    imageAlt:
      'Black, gold, and silver balloons frame a round black backdrop with gold number 50 balloons',
    verified: false,
  },
  {
    slug: 'event-management-coordination',
    title: 'Event Management and Coordination',
    shortTitle: 'Event Management',
    metaTitle: 'Event Management and Coordination in Orange County',
    metaDescription:
      'Orange County event management and coordination that aligns established plans, vendors, timelines, and the event day flow.',
    h1: 'Event Management and Coordination',
    summary:
      'You built the event. We turn the established plan into one current timeline, align the vendors, and keep the day moving with calm authority.',
    forWhom: [
      'The major creative, venue, and vendor decisions are already made.',
      'You need one current timeline and communication point as the date approaches.',
      'The plan is established and ready for a disciplined operational handoff.',
    ],
    capabilities: [
      {
        title: 'A disciplined handoff',
        body: 'Bring contracts, contacts, decisions, floor plans, and schedules into one working source of truth.',
      },
      {
        title: 'Every arrival accounted for',
        body: 'Confirm vendor arrivals, access details, dependencies, and the handoffs that keep setup moving.',
      },
      {
        title: 'A timeline people can use',
        body: 'Bring the event sequence, production moments, and vendor movements into one clear run of show.',
      },
      {
        title: 'Calm control on event day',
        body: 'Manage the confirmed hours, transitions, vendor flow, and escalation path when event day coverage is included.',
      },
    ],
    considerations: [
      {
        title: 'Coordination starts with a plan',
        body: 'Open decisions about the venue, design, vendors, budget, or guest experience need to be settled before the handoff.',
      },
      {
        title: 'Setup and strike need names',
        body: 'Every rental, decor piece, personal item, and delivery needs a named arrival, installation, and removal owner.',
      },
      {
        title: 'Clear authority keeps the room calm',
        body: 'The planner, client, venue, and vendors need to know who can approve changes and resolve conflicts in the moment.',
      },
    ],
    faqs: [
      {
        question: 'Is coordination the same as planning from start to finish?',
        answer:
          'No. Coordination organizes approved details closer to the event. Planning from start to finish can shape decisions, design, vendors, and logistics much earlier.',
      },
      {
        question: 'When does the coordination handoff begin?',
        answer:
          'Your proposal confirms the handoff window and exactly what we need from you, the venue, and each vendor before it begins.',
      },
      {
        question: 'Will you contact every vendor?',
        answer:
          'Your proposal identifies the vendors we confirm and coordinate, along with any relationships you continue to manage directly.',
      },
      {
        question: 'Does coordination include decorating?',
        answer:
          'Setup, styling, personal decor, rentals, and breakdown are included only when listed in your proposal, with clear installation and removal owners.',
      },
    ],
    image: 'actualDuckCakePops',
    imageAlt:
      'Mint green cake pops topped with yellow ducks and pearl sprinkles sit in a clear stand',
    verified: false,
  },
];

export const getServiceBySlug = (slug: string) => services.find((service) => service.slug === slug);
