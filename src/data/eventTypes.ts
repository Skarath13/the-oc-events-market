import type { MediaKey } from './media';
import type { Faq } from './services';

export type EventTypePage = {
  slug: string;
  title: string;
  gatewayTitle: string;
  gatewayBody: string;
  metaTitle: string;
  metaDescription: string;
  serviceType: string;
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
  question: 'Can I keep the vendors I already selected?',
  answer:
    'Yes. We can bring professionals you already know and love into the event plan and timeline according to your selected scope.',
};

export const eventTypes: EventTypePage[] = [
  {
    slug: 'weddings',
    title: 'Weddings',
    gatewayTitle: 'Weddings',
    gatewayBody: 'A clear planning structure for a celebration with many connected decisions.',
    metaTitle: 'Wedding Planner in Orange County',
    metaDescription:
      'Plan your wedding with an Orange County wedding planner connecting the vision, vendors, design, logistics, and included support on the event day.',
    serviceType: 'Wedding planning and design',
    h1: 'Wedding Planner in Orange County',
    summary:
      'We connect the roadmap, design, vendors, logistics, and included responsibilities on the wedding day so each decision supports the next and you can stay focused on the celebration.',
    whoFor:
      'For couples who want thoughtful design and an accountable planner, whether they are beginning with a date and a vision or bringing an existing venue and vendors.',
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
        title: 'Vendor coordination',
        body: 'Source trusted professionals when included or coordinate the people already selected.',
      },
      {
        title: 'Wedding day flow',
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
          'Management on the event day is included only when stated in the selected service, including the approved staffing and hours.',
      },
    ],
    image: 'weddings',
    imageAlt: 'Wedding reception tables with colorful floral centerpieces',
  },
  {
    slug: 'baby-bridal-showers',
    title: 'Baby and Bridal Showers',
    gatewayTitle: 'Showers',
    gatewayBody:
      'Warm, layered gatherings designed around the guest of honor and the people showing up for them.',
    metaTitle: 'Baby and Bridal Shower Planner in Orange County',
    metaDescription:
      'Thoughtful planning and design for Orange County baby showers, bridal showers, and the people gathering to celebrate.',
    serviceType: 'Baby and bridal shower planning and design',
    h1: 'Baby and Bridal Shower Planner in Orange County',
    summary:
      'We connect the setting, guest flow, design, vendors, and included details on the event day in one thoughtful plan so you do not have to manage every moving piece.',
    whoFor:
      'For families, friends, and hosts planning a baby shower, bridal shower, or related celebration at a venue or another setting the owner has approved.',
    capabilities: [
      {
        title: 'Plan for the guest experience',
        body: 'Shape the arrival, food, activities, gifting, speeches, and transitions around the pace of the gathering.',
      },
      {
        title: 'Design and tabletop direction',
        body: 'Guide color, florals, rentals, paper details, dessert displays, and focal moments when included.',
      },
      {
        title: 'Vendor and rental coordination',
        body: 'Organize catering, rentals, decor, entertainment, and other approved professionals.',
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
          'Availability for events at private homes has not yet been confirmed. Share the setting in your inquiry so we can review it honestly.',
      },
    ],
    image: 'showers',
    imageAlt: 'Soft pink flowers and wooden baby lettering arranged for a shower',
  },
  {
    slug: 'birthdays-milestones',
    title: 'Birthdays and Milestones',
    gatewayTitle: 'Birthdays and Milestones',
    gatewayBody: 'Meaningful dinners and lively parties organized around the person and the room.',
    metaTitle: 'Party Planner in Orange County',
    metaDescription:
      'Work with an Orange County party planner on first birthdays, adult birthdays, anniversaries, private dinners, and milestone celebrations.',
    serviceType: 'Birthday party and milestone event planning',
    h1: 'Orange County Party Planner for Birthdays and Milestones',
    summary:
      'We organize the design, entertainment, food flow, vendors, and timing around the person being honored instead of a generic party format.',
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
        title: 'Design and vendors',
        body: 'Organize the selected rentals, florals, decor, entertainment, and venue professionals.',
      },
      {
        title: 'Milestone moments',
        body: 'Plan the timing for welcomes, speeches, cake, performances, surprises, and other approved moments.',
      },
    ],
    considerations: [
      {
        title: 'The needs of guests of different ages',
        body: 'Seating, sound, food timing, mobility, and entertainment should work for the actual guest list.',
      },
      {
        title: 'A program with room to breathe',
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
          'Yes. Adult birthdays and milestone events are planned here. Children’s celebrations have a dedicated planning page.',
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
    metaTitle: 'Kids’ Party Planning and Design in Orange County',
    metaDescription:
      'Orange County children’s party planning that brings the theme, vendors, guest flow, and details on the event day into one organized plan.',
    serviceType: 'Kids’ party planning and design',
    h1: 'Kids’ Party Planning and Design',
    summary:
      'We turn the theme, activities, food, vendors, and guest flow into one plan suited to the age group. The party can feel imaginative without leaving you to coordinate every delivery, transition, and cleanup handoff.',
    whoFor:
      'For parents and families planning first birthdays, children’s birthdays, and playful milestone events with a considered design and manageable flow.',
    capabilities: [
      {
        title: 'Theme with a real plan',
        body: 'Translate the child’s interests into a visual direction without letting decorations overwhelm the event experience.',
      },
      {
        title: 'Timing suited to the age group',
        body: 'Sequence food, activities, entertainment, cake, and transitions around the age range and event window.',
      },
      {
        title: 'Vendor coordination',
        body: 'Coordinate approved entertainment, rentals, catering, decor, and venue professionals within the selected scope.',
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
          'No childcare or safety supervision service is claimed. Those responsibilities must remain with the appropriate adults or separately contracted qualified providers.',
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
    title: 'Corporate and Brand Events',
    gatewayTitle: 'Corporate and Brand Events',
    gatewayBody:
      'Guest experience, brand standards, vendors, and run of show brought into one production plan.',
    metaTitle: 'Corporate Event Planner in Orange County',
    metaDescription:
      'Work with an Orange County corporate event planner to align the audience, objectives, brand direction, vendors, production details, and run of show.',
    serviceType: 'Corporate and brand event planning',
    h1: 'Corporate Event Planner in Orange County',
    summary:
      'We align the objective, audience, brand direction, vendors, production dependencies, and run of show from internal approvals through the guest experience.',
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
        body: 'Organize approved venue, catering, rentals, audiovisual, entertainment, signage, and other professionals.',
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
          'Approved brand standards can guide the visual and production plan when the client supplies current assets and names someone authorized to make decisions.',
      },
    ],
    image: 'corporate',
    imageAlt: 'Formal event space arranged with round tables and warm lighting',
  },
];

export const getEventTypeBySlug = (slug: string) =>
  eventTypes.find((eventType) => eventType.slug === slug);
