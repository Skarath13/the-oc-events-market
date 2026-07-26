import type { MediaKey } from './media';
import type { Faq } from './services';

export type EventTypePage = {
  slug: string;
  title: string;
  gatewayTitle: string;
  gatewayBody: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  whoFor: string;
  capabilities: Array<{ title: string; body: string }>;
  considerations: Array<{ title: string; body: string }>;
  faqs: Faq[];
  image: MediaKey;
  imageAlt: string;
};

const vendorFaq: Faq = {
  question: 'Can we keep the vendors we already selected?',
  answer:
    'Yes. You can bring professionals you already know and love. We coordinate the approved team around the event plan and timeline according to your selected scope.',
};

export const eventTypes: EventTypePage[] = [
  {
    slug: 'weddings',
    title: 'Weddings',
    gatewayTitle: 'Weddings',
    gatewayBody: 'A clear planning structure for a celebration with many connected decisions.',
    metaTitle: 'Orange County Wedding Planner & Designer',
    metaDescription:
      'Plan an Orange County wedding with one team for vision, vendors, design, logistics, and event-day support included in your chosen service.',
    h1: 'Orange County Wedding Planning & Design',
    summary:
      'A wedding planner brings the planning roadmap, design direction, vendor team, logistics, and included event-day responsibilities into one coherent plan. The OC Events Market helps Orange County couples make connected decisions without losing sight of the reason everyone is gathering.',
    whoFor:
      'For couples who want thoughtful design and an accountable planning structure—whether they are beginning with a date and a vision or bringing an existing venue and vendor team.',
    capabilities: [
      {
        title: 'Planning roadmap and priorities',
        body: 'Organize the decision sequence, working budget, approvals, and milestones included in the selected service.',
      },
      {
        title: 'Design direction and layout',
        body: 'Shape a cohesive guest experience across ceremony, reception, tabletop, rentals, signage, and related visual decisions.',
      },
      {
        title: 'Vendor team coordination',
        body: 'Source trusted partners when included or coordinate the professionals already selected.',
      },
      {
        title: 'Wedding-day flow',
        body: 'When included, manage the approved timeline, vendor arrivals, key transitions, and escalation path.',
      },
    ],
    considerations: [
      {
        title: 'Ceremony and reception transitions',
        body: 'Guest movement, room turns, transportation, photo timing, and vendor resets can affect the entire schedule.',
      },
      {
        title: 'Venue requirements',
        body: 'Access windows, insurance, sound rules, rentals, power, parking, and required vendor procedures should be understood early.',
      },
      {
        title: 'Interdependent vendors',
        body: 'Catering, rentals, florals, entertainment, photography, and venue teams need one current timeline and clear handoffs.',
      },
    ],
    faqs: [
      vendorFaq,
      {
        question: 'Do you help with wedding design?',
        answer:
          'Design direction, layouts, rentals, decor, florals, and related coordination may be included depending on the selected service.',
      },
      {
        question: 'Do you run the rehearsal?',
        answer:
          'Rehearsal support is not assumed. It must be listed in the selected package or proposal.',
      },
      {
        question: 'Will you manage the wedding day?',
        answer:
          'Event-day management is included only when stated in the selected service, including the approved staffing and hours.',
      },
    ],
    image: 'weddings',
    imageAlt: 'Wedding reception tables with colorful floral centerpieces',
  },
  {
    slug: 'baby-bridal-showers',
    title: 'Baby & Bridal Showers',
    gatewayTitle: 'Showers',
    gatewayBody:
      'Warm, layered gatherings designed around the guest of honor and the people showing up for them.',
    metaTitle: 'Baby & Bridal Shower Planner in Orange County',
    metaDescription:
      'Thoughtful planning and design for Orange County baby showers, bridal showers, and the people gathering to celebrate.',
    h1: 'Baby & Bridal Shower Planning in Orange County',
    summary:
      'A shower planner coordinates the setting, guest flow, design choices, vendors, and included event-day details around one thoughtful plan. We help Orange County hosts create a gathering that feels personal without asking them to manage every moving piece.',
    whoFor:
      'For families, friends, and hosts planning a baby shower, bridal shower, or related celebration at a venue or another owner-approved setting.',
    capabilities: [
      {
        title: 'Guest-experience plan',
        body: 'Shape the arrival, food, activities, gifting, speeches, and transitions around the pace of the gathering.',
      },
      {
        title: 'Design and tabletop direction',
        body: 'Guide color, florals, rentals, paper details, dessert displays, and focal moments when included.',
      },
      {
        title: 'Vendor and rental coordination',
        body: 'Organize catering, rentals, decor, entertainment, and other approved partners.',
      },
      {
        title: 'Setup and timing',
        body: 'Define what arrives when, who installs it, and how the event moves from welcome through farewell.',
      },
    ],
    considerations: [
      {
        title: 'Home versus venue logistics',
        body: 'Access, power, restrooms, parking, rentals, cleanup, and weather protection change substantially by setting.',
      },
      {
        title: 'Activities without a traffic jam',
        body: 'Food, games, gifting, photos, and dessert need enough room and a sequence that keeps guests comfortable.',
      },
      {
        title: 'Setup and breakdown ownership',
        body: 'Every rental, floral piece, personal item, and gift should have a clear arrival and removal plan.',
      },
    ],
    faqs: [
      vendorFaq,
      {
        question: 'Can you help with the shower theme and decor?',
        answer:
          'Design direction and decor coordination may be included. The selected service should define sourcing, purchasing, rentals, installation, and breakdown.',
      },
      {
        question: 'Can you coordinate activities and gifting?',
        answer:
          'Those moments can be incorporated into the approved event flow when they are part of the planning scope.',
      },
      {
        question: 'Do you plan showers at private homes?',
        answer:
          'Private-home event availability has not yet been confirmed by the owner. Share the setting in your inquiry so the team can review it honestly.',
      },
    ],
    image: 'showers',
    imageAlt: 'Soft pink flowers and wooden baby lettering arranged for a shower',
  },
  {
    slug: 'birthdays-milestones',
    title: 'Birthdays & Milestones',
    gatewayTitle: 'Birthdays & Milestones',
    gatewayBody: 'Meaningful dinners and lively parties organized around the person and the room.',
    metaTitle: 'Orange County Birthday & Milestone Event Planner',
    metaDescription:
      'Planning and design for first birthdays, adult birthdays, and milestone celebrations across Orange County.',
    h1: 'Orange County Birthday & Milestone Event Planning',
    summary:
      'A birthday or milestone planner brings the design, entertainment, food flow, vendors, and event-day timing into one organized celebration. We plan for the person being honored and the guests sharing the moment—not a one-size-fits-all party format.',
    whoFor:
      'For hosts planning first birthdays, adult birthdays, anniversaries, private dinners, and milestone gatherings that need a cohesive plan and a clear point of contact.',
    capabilities: [
      {
        title: 'Celebration concept',
        body: 'Translate the guest of honor, priorities, and desired atmosphere into a useful creative direction.',
      },
      {
        title: 'Food, bar, and entertainment flow',
        body: 'Coordinate the sequence and spatial needs of the approved catering, bar, music, and activities.',
      },
      {
        title: 'Design and vendor team',
        body: 'Organize the selected rentals, florals, decor, entertainment, and venue partners.',
      },
      {
        title: 'Milestone moments',
        body: 'Plan the timing for welcomes, speeches, cake, performances, surprises, and other approved moments.',
      },
    ],
    considerations: [
      {
        title: 'Mixed-age guest needs',
        body: 'Seating, sound, food timing, mobility, and entertainment should work for the actual guest list.',
      },
      {
        title: 'Program without over-programming',
        body: 'Speeches, performances, surprises, and dining need breathing room so the celebration still feels social.',
      },
      {
        title: 'Room transitions',
        body: 'Cocktails, dinner, entertainment, dessert, and dancing may compete for the same space or vendor window.',
      },
    ],
    faqs: [
      vendorFaq,
      {
        question: 'Do you plan both adult and children’s birthdays?',
        answer:
          'Yes. Adult birthdays and milestone events are planned here; children’s celebrations have a dedicated planning page.',
      },
      {
        question: 'Can you coordinate a surprise?',
        answer:
          'Surprise logistics may be planned when the confidentiality, access, communication, and timing responsibilities are included in the scope.',
      },
      {
        question: 'Can you help with entertainment?',
        answer:
          'Entertainment recommendations and coordination may be included depending on the selected service and event needs.',
      },
    ],
    image: 'birthdays',
    imageAlt: 'A candlelit dinner table set for an evening celebration',
  },
  {
    slug: 'kids-parties',
    title: 'Kids’ Parties',
    gatewayTitle: 'Kids’ Parties',
    gatewayBody: 'Playful ideas grounded in timing, guest comfort, and a plan adults can follow.',
    metaTitle: 'Kids’ Party Planning & Design in Orange County',
    metaDescription:
      'Orange County children’s party planning that brings the theme, vendor team, guest flow, and event-day details into one organized plan.',
    h1: 'Kids’ Party Planning & Design in Orange County',
    summary:
      'A children’s party planner turns the theme, activities, food, vendors, and guest flow into one age-aware event plan. The result can feel imaginative without leaving the host to coordinate every delivery, transition, and cleanup handoff.',
    whoFor:
      'For parents and families planning first birthdays, children’s birthdays, and playful milestone events with a considered design and manageable flow.',
    capabilities: [
      {
        title: 'Theme with a real plan',
        body: 'Translate the child’s interests into a visual direction without letting decorations overwhelm the event experience.',
      },
      {
        title: 'Age-aware timing',
        body: 'Sequence food, activities, entertainment, cake, and transitions around the age range and event window.',
      },
      {
        title: 'Vendor coordination',
        body: 'Coordinate approved entertainment, rentals, catering, decor, and venue partners within the selected scope.',
      },
      {
        title: 'Setup and guest flow',
        body: 'Plan circulation, activity zones, adult seating, gifts, food, and the included setup responsibilities.',
      },
    ],
    considerations: [
      {
        title: 'Safety roles stay explicit',
        body: 'Planning and vendor coordination do not imply childcare, lifeguarding, medical supervision, or responsibility for children unless separately contracted and legally appropriate.',
      },
      {
        title: 'Entertainment transitions',
        body: 'Performers, play areas, crafts, food, and cake work best when setup windows and attention spans inform the schedule.',
      },
      {
        title: 'Weather and cleanup backup',
        body: 'Outdoor play, food service, rentals, waste, and breakdown need a workable alternative when conditions change.',
      },
    ],
    faqs: [
      vendorFaq,
      {
        question: 'Can you work with a theme my child already chose?',
        answer:
          'Yes. A chosen theme can guide the approved design and vendor plan without forcing every detail into a branded template.',
      },
      {
        question: 'Do you provide childcare or supervise children?',
        answer:
          'No childcare or safety-supervision service is claimed. Those responsibilities must remain with the appropriate adults or separately contracted qualified providers.',
      },
      {
        question: 'Can you coordinate entertainment and rentals?',
        answer:
          'Those vendors may be sourced or coordinated when included in the selected planning scope.',
      },
    ],
    image: 'kidsParties',
    imageAlt: 'Gold birthday balloon and colorful party details',
  },
  {
    slug: 'corporate-brand-events',
    title: 'Corporate & Brand Events',
    gatewayTitle: 'Corporate & Brand Events',
    gatewayBody:
      'Guest experience, brand standards, vendors, and run of show brought into one production plan.',
    metaTitle: 'Corporate & Brand Event Planner in Orange County',
    metaDescription:
      'Orange County corporate and brand event planning shaped around your audience, objectives, visual direction, vendors, and approved run of show.',
    h1: 'Corporate & Brand Event Planning in Orange County',
    summary:
      'A corporate event planner aligns the event objective, audience, brand direction, vendors, production dependencies, and run of show. We help Orange County teams turn internal approvals and external partners into one coordinated guest experience.',
    whoFor:
      'For office managers, founders, marketing teams, and organizational leads planning company gatherings, client events, launches, dinners, or brand experiences.',
    capabilities: [
      {
        title: 'Objective and audience alignment',
        body: 'Start with what the gathering needs to accomplish and how guests should move through the experience.',
      },
      {
        title: 'Stakeholder and approval structure',
        body: 'Clarify decision owners, review points, brand requirements, budget responsibilities, and the final escalation path.',
      },
      {
        title: 'Production and vendor coordination',
        body: 'Organize approved venue, catering, rentals, audiovisual, entertainment, signage, and other partners.',
      },
      {
        title: 'Run of show',
        body: 'Build the schedule around arrivals, program moments, speakers, service, transitions, and production dependencies.',
      },
    ],
    considerations: [
      {
        title: 'Brand standards need an owner',
        body: 'Logos, colors, signage, presentations, sponsor requirements, and approvals should have one current source and decision path.',
      },
      {
        title: 'Accessibility is a production input',
        body: 'Venue access, seating, sound, visual content, dietary needs, and program formats should be considered before the final run of show.',
      },
      {
        title: 'Every cue has a dependency',
        body: 'Speakers, audiovisual teams, catering, lighting, photography, and venue operations need aligned timing and contingencies.',
      },
    ],
    faqs: [
      vendorFaq,
      {
        question: 'Can you work with our internal marketing or operations team?',
        answer:
          'Yes. The planning structure can include defined client stakeholders, approvals, and communication handoffs.',
      },
      {
        question: 'Do you manage audiovisual production?',
        answer:
          'Audiovisual sourcing or coordination may be included, but technical production scope and vendor responsibility must be defined in the proposal.',
      },
      {
        question: 'Can you follow existing brand standards?',
        answer:
          'Approved brand standards can guide the visual and production plan when the client supplies current assets and an authorized decision-maker.',
      },
    ],
    image: 'corporate',
    imageAlt: 'Formal event space arranged with round tables and warm lighting',
  },
];

export const getEventTypeBySlug = (slug: string) =>
  eventTypes.find((eventType) => eventType.slug === slug);
