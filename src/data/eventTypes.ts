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
  imageFit?: 'cover' | 'contain';
};

const vendorFaq: Faq = {
  question: 'Can I keep the vendors I already selected?',
  answer:
    'Absolutely. We bring the professionals you already love into the same creative direction, communication flow, and event timeline.',
};

export const eventTypes: EventTypePage[] = [
  {
    slug: 'weddings',
    title: 'Weddings',
    gatewayTitle: 'Weddings',
    gatewayBody: 'Personal, polished, and paced so you can actually live the day you planned.',
    metaTitle: 'Wedding Planner in Orange County',
    metaDescription:
      'Plan your wedding with an Orange County wedding planner connecting the vision, vendors, design, logistics, and included support on the event day.',
    serviceType: 'Wedding planning and design',
    h1: 'Wedding Planner in Orange County',
    summary:
      'A wedding should feel deeply personal and completely effortless. We connect the creative direction, vendors, logistics, and event day flow so every moment belongs to the same story.',
    whoFor:
      'For couples who want a distinct point of view, one accountable planner, and the freedom to be present from the first look to the last song.',
    capabilities: [
      {
        title: 'The wedding roadmap',
        body: 'Put priorities, budget decisions, approvals, and deadlines in the right order from the beginning.',
      },
      {
        title: 'A cohesive visual world',
        body: 'Shape the ceremony, reception, tabletop, rentals, signage, and guest flow around one recognizable point of view.',
      },
      {
        title: 'The right team, in sync',
        body: 'Source the missing specialists or bring your chosen professionals into one communication and production plan.',
      },
      {
        title: 'A day that moves beautifully',
        body: 'When event day management is included, run the timeline, arrivals, room transitions, and quiet decisions in the background.',
      },
    ],
    considerations: [
      {
        title: 'Every transition changes the room',
        body: 'Guest movement, room turns, transportation, portrait timing, and vendor resets all shape the pace of the day.',
      },
      {
        title: 'The venue sets the rules',
        body: 'Access windows, sound limits, rentals, power, parking, insurance, and required procedures belong in the plan early.',
      },
      {
        title: 'One timeline, no crossed wires',
        body: 'Catering, rentals, florals, entertainment, photography, and the venue team need one current source of truth.',
      },
    ],
    faqs: [
      vendorFaq,
      {
        question: 'Do you help with wedding design?',
        answer:
          'Yes, when design is part of your proposal. We can shape the visual direction, layouts, rentals, decor, florals, and the team that brings them together.',
      },
      {
        question: 'Do you run the rehearsal?',
        answer:
          'Rehearsal support is available when included in your proposal, with timing and responsibilities confirmed before you book.',
      },
      {
        question: 'Will you manage the wedding day?',
        answer:
          'Event day management is available when included in your proposal. Team size, coverage, hours, and handoffs are confirmed before you book.',
      },
    ],
    image: 'actualDessertFavorCollection',
    imageAlt: 'Packaged mini cakes and decorated cake pops presented in blush pink favor boxes',
    imageFit: 'contain',
  },
  {
    slug: 'baby-bridal-showers',
    title: 'Baby and Bridal Showers',
    gatewayTitle: 'Showers',
    gatewayBody:
      'Charming without the cliché. Every toast, table, and sweet detail is in its place.',
    metaTitle: 'Baby and Bridal Shower Planner in Orange County',
    metaDescription:
      'Thoughtful planning and design for Orange County baby showers, bridal showers, and the people gathering to celebrate.',
    serviceType: 'Baby and bridal shower planning and design',
    h1: 'Baby and Bridal Shower Planner in Orange County',
    summary:
      'We turn a beautiful idea into a gathering that feels warm, polished, and easy to enjoy from the welcome moment to the final favor.',
    whoFor:
      'For families, friends, and hosts who want the shower to feel personal and elevated without spending the celebration managing deliveries, decor, and timing.',
    capabilities: [
      {
        title: 'A welcome that sets the tone',
        body: 'Shape arrival, food, activities, gifting, and toasts around a pace that feels social instead of scheduled.',
      },
      {
        title: 'Details worth gathering around',
        body: 'Connect color, florals, tabletop, rentals, paper details, dessert, and the focal moments guests will photograph.',
      },
      {
        title: 'A vendor team that moves together',
        body: 'Organize catering, rentals, decor, entertainment, and every scheduled arrival around one current plan.',
      },
      {
        title: 'A seamless setup',
        body: 'Define what arrives when, who installs it, and how the celebration moves from welcome through farewell.',
      },
    ],
    considerations: [
      {
        title: 'The setting changes everything',
        body: 'Access, power, restrooms, parking, rentals, cleanup, and weather protection look very different at home and at a venue.',
      },
      {
        title: 'Give every moment room',
        body: 'Food, games, gifting, photos, and dessert need enough space and a sequence that keeps guests comfortable.',
      },
      {
        title: 'Nothing gets left to chance',
        body: 'Every rental, floral piece, personal item, gift, and leftover needs a clear arrival and departure plan.',
      },
    ],
    faqs: [
      vendorFaq,
      {
        question: 'Can you help with the shower theme and decor?',
        answer:
          'Yes, when design is part of your proposal. We define the creative direction and make sourcing, rentals, installation, and breakdown responsibilities clear from the start.',
      },
      {
        question: 'Can you coordinate activities and gifting?',
        answer:
          'Yes. Activities, gifting, toasts, and dessert can be built into the event flow so they feel natural rather than announced one after another.',
      },
      {
        question: 'Do you plan showers at private homes?',
        answer:
          'Tell us the setting in your inquiry. We will review access, parking, power, rentals, cleanup, and weather needs before recommending the right planning approach.',
      },
    ],
    image: 'actualDuckCakePops',
    imageAlt:
      'Mint green cake pops topped with yellow ducks and pearl sprinkles sit in a clear stand',
    imageFit: 'contain',
  },
  {
    slug: 'birthdays-milestones',
    title: 'Birthdays and Milestones',
    gatewayTitle: 'Birthdays and Milestones',
    gatewayBody: 'Big number. Bigger feeling. Built around the person everyone came to celebrate.',
    metaTitle: 'Party Planner in Orange County',
    metaDescription:
      'Work with an Orange County party planner on first birthdays, adult birthdays, anniversaries, private dinners, and milestone celebrations.',
    serviceType: 'Birthday party and milestone event planning',
    h1: 'Orange County Party Planner for Birthdays and Milestones',
    summary:
      'Milestones deserve more than a theme. We build the room, rhythm, food, entertainment, and signature moments around the person at the center of it all.',
    whoFor:
      'For hosts planning an adult birthday, anniversary, private dinner, or landmark celebration that should feel unmistakably personal.',
    capabilities: [
      {
        title: 'A concept with a point of view',
        body: 'Translate the guest of honor, the setting, and the desired atmosphere into a direction that feels specific instead of themed by default.',
      },
      {
        title: 'A room with rhythm',
        body: 'Sequence food, bar, music, and entertainment so the energy builds naturally and guests always know where to go next.',
      },
      {
        title: 'Every creative partner aligned',
        body: 'Bring rentals, florals, decor, entertainment, catering, and the venue into one creative and production plan.',
      },
      {
        title: 'The moments everyone remembers',
        body: 'Give welcomes, speeches, cake, performances, and surprises the timing and space they deserve.',
      },
    ],
    considerations: [
      {
        title: 'Plan for the whole guest list',
        body: 'Seating, sound, food timing, mobility, and entertainment should work beautifully across generations.',
      },
      {
        title: 'Leave room for the party',
        body: 'Speeches, performances, surprises, and dinner need breathing room so the celebration never turns into a program.',
      },
      {
        title: 'Make the room change gracefully',
        body: 'Cocktails, dinner, entertainment, dessert, and dancing may share the same space; every reset needs a clean handoff.',
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
          'Yes, when it is part of the plan. We define the private communication, access, timing, and decision path needed to keep the surprise intact.',
      },
      {
        question: 'Can you help with entertainment?',
        answer:
          'Yes, when entertainment sourcing or coordination is included in your proposal. We match the recommendation to the room, audience, timing, and desired energy.',
      },
    ],
    image: 'actualFiftiethMilestoneBalloonBackdrop',
    imageAlt:
      'Black, gold, and silver balloons frame a round black backdrop with gold number 50 balloons',
    imageFit: 'contain',
  },
  {
    slug: 'kids-parties',
    title: 'Kids’ Parties',
    gatewayTitle: 'Kids’ Parties',
    gatewayBody:
      'High imagination and low chaos. The theme, timing, and adult logistics come together in one plan.',
    metaTitle: 'Kids’ Party Planning and Design in Orange County',
    metaDescription:
      'Orange County children’s party planning that brings the theme, vendors, guest flow, and details on the event day into one organized plan.',
    serviceType: 'Kids’ party planning and design',
    h1: 'Kids’ Party Planning and Design',
    summary:
      'We make the party feel magical for them and manageable for you, connecting the theme, activities, food, vendors, and timing around the age group in the room.',
    whoFor:
      'For parents and families who want a first birthday or kids’ celebration with big personality, smart pacing, and a plan adults can actually follow.',
    capabilities: [
      {
        title: 'A theme with taste',
        body: 'Turn the child’s current obsession into a visual direction that feels playful, intentional, and never overdone.',
      },
      {
        title: 'Pacing built for the age group',
        body: 'Sequence food, activities, entertainment, and cake around attention spans, energy, and the event window.',
      },
      {
        title: 'A team adults can follow',
        body: 'Coordinate entertainment, rentals, catering, decor, and the venue around one arrival and activity plan.',
      },
      {
        title: 'Space for kids and adults',
        body: 'Plan activity zones, adult seating, food, gifts, circulation, and setup so the room works for everyone.',
      },
    ],
    considerations: [
      {
        title: 'Safety roles stay clear',
        body: 'Parents, guardians, and qualified providers remain responsible for childcare, lifeguarding, and medical supervision.',
      },
      {
        title: 'Keep the energy moving',
        body: 'Performers, play areas, crafts, food, and cake work best when setup windows and attention spans shape the schedule.',
      },
      {
        title: 'Have a beautiful Plan B',
        body: 'Outdoor play, food service, rentals, waste, and breakdown need a workable alternative when conditions change.',
      },
    ],
    faqs: [
      vendorFaq,
      {
        question: 'Can you work with a theme my child already chose?',
        answer:
          'Of course. We use the chosen theme as creative direction, then give it enough restraint and structure to feel designed rather than templated.',
      },
      {
        question: 'Do you provide childcare or supervise children?',
        answer:
          'No. Childcare and safety supervision remain with parents, guardians, and separately contracted qualified providers.',
      },
      {
        question: 'Can you coordinate entertainment and rentals?',
        answer:
          'Yes, when sourcing or coordination is included in your proposal. We align their space, arrival, power, timing, and handoffs with the rest of the party.',
      },
    ],
    image: 'actualFirstBirthdayBalloonBackdrop',
    imageAlt:
      'Red, white, and yellow balloons frame a white backdrop with a gold number one balloon',
    imageFit: 'contain',
  },
  {
    slug: 'corporate-brand-events',
    title: 'Corporate and Brand Events',
    gatewayTitle: 'Corporate and Brand Events',
    gatewayBody:
      'Aligned with the brand, clear in the message, and on cue from the first arrival to the final frame.',
    metaTitle: 'Corporate Event Planner in Orange County',
    metaDescription:
      'Work with an Orange County corporate event planner to align the audience, objectives, brand direction, vendors, production details, and run of show.',
    serviceType: 'Corporate and brand event planning',
    h1: 'Corporate Event Planner in Orange County',
    summary:
      'We translate the business objective into an experience people want to be part of, then align the brand, stakeholders, vendors, and production plan behind it.',
    whoFor:
      'For founders, marketing teams, office leaders, and organizations planning a launch, client event, company gathering, dinner, or branded experience.',
    capabilities: [
      {
        title: 'Start with the outcome',
        body: 'Define what the gathering needs to accomplish and what guests should think, feel, or do when they leave.',
      },
      {
        title: 'Keep approvals moving',
        body: 'Clarify decision owners, review moments, brand requirements, budget responsibilities, and the final escalation path.',
      },
      {
        title: 'One production plan',
        body: 'Align the venue, catering, rentals, audiovisual, entertainment, signage, and every scheduled partner.',
      },
      {
        title: 'A run of show that runs',
        body: 'Build the schedule around arrivals, speakers, service, transitions, and the technical dependencies behind every cue.',
      },
    ],
    considerations: [
      {
        title: 'Protect the brand in the room',
        body: 'Logos, color, signage, presentations, sponsor requirements, and approvals need one current source and decision path.',
      },
      {
        title: 'Design for the whole audience',
        body: 'Venue access, seating, sound, visual content, dietary needs, and program formats belong in the production plan from the beginning.',
      },
      {
        title: 'Every cue has a consequence',
        body: 'Speakers, audiovisual, catering, lighting, photography, and venue operations need aligned timing and a smart contingency.',
      },
    ],
    faqs: [
      vendorFaq,
      {
        question: 'Can you work with our internal marketing or operations team?',
        answer:
          'Yes. We create a clear working rhythm for stakeholders, approvals, creative reviews, and communication handoffs.',
      },
      {
        question: 'Do you manage audiovisual production?',
        answer:
          'Audiovisual sourcing or coordination can be included. Your proposal defines the technical partner, production responsibilities, equipment, rehearsals, and coverage on the event day.',
      },
      {
        question: 'Can you follow existing brand standards?',
        answer:
          'Absolutely. Give us the current assets, brand standards, and someone empowered to make decisions. We will carry that system through the room and production plan.',
      },
    ],
    image: 'corporate',
    imageAlt: 'Formal event space arranged with round tables and warm lighting',
  },
];

export const getEventTypeBySlug = (slug: string) =>
  eventTypes.find((eventType) => eventType.slug === slug);
