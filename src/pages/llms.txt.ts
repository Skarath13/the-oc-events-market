import type { APIRoute } from 'astro';
import { eventTypes } from '@/data/eventTypes';
import { siteConfig } from '@/data/site';

const fallbackOrigin = new URL('https://the-oc-events-market.example');

const formatLink = (origin: URL, label: string, pathname: string, description: string) =>
  `- [${label}](${new URL(pathname, origin).href}): ${description}`;

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? fallbackOrigin;
  const eventLinks = eventTypes.map((eventType) =>
    formatLink(origin, eventType.title, `/events/${eventType.slug}/`, eventType.gatewayBody),
  );

  const body = [
    `# ${siteConfig.businessName}`,
    '',
    `> ${siteConfig.fullDefinition}`,
    '',
    'The public contact method is text message. Each proposal confirms availability, deliverables, staffing, responsibilities, and event day coverage before booking.',
    '',
    '## Planning and Business',
    '',
    formatLink(
      origin,
      'Home',
      '/',
      'Overview of the event planning and design practice, supported event types, planning capabilities, and frequently asked questions.',
    ),
    formatLink(
      origin,
      'Services',
      '/services/',
      'Planning, design, vendor coordination, logistics, and event day support shaped around the event and its starting point.',
    ),
    formatLink(
      origin,
      'About',
      '/about/',
      'Meet Ivone and discover the thoughtful, attentive approach behind The OC Events Market.',
    ),
    formatLink(
      origin,
      'Contact',
      '/contact/',
      'The text message inquiry path for prospective event planning clients.',
    ),
    '',
    '## Event Types',
    '',
    ...eventLinks,
    '',
    '## Vendor Information',
    '',
    formatLink(
      origin,
      'Vendor Coordination',
      '/trusted-creative-network/',
      'How existing vendors and recommended professionals work from one creative direction and current timeline.',
    ),
    formatLink(
      origin,
      'Vendor Introductions',
      '/for-vendors/',
      'How event businesses can introduce their work without implying partnership, recommendation, or preferred status.',
    ),
    '',
    '## Optional',
    '',
    formatLink(
      origin,
      'Celebrations',
      '/celebrations/',
      'An overview of the weddings, showers, birthdays, kids’ parties, and corporate or brand events the studio plans.',
    ),
    formatLink(
      origin,
      'Accessibility',
      '/accessibility/',
      'The website accessibility approach and feedback path.',
    ),
    formatLink(
      origin,
      'XML Sitemap',
      '/sitemap-index.xml',
      'The canonical index of public, indexable site URLs.',
    ),
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
