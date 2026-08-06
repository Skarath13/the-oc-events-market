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
    'The public contact method is text message. Exact service scope, availability, inclusions, staffing, and event-day hours are confirmed in the selected service or proposal.',
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
      'Planning, design, vendor coordination, logistics, and event-day workstreams, with scope limitations stated clearly.',
    ),
    formatLink(
      origin,
      'About',
      '/about/',
      'The planning approach and the role of a dedicated planner for Orange County events.',
    ),
    formatLink(
      origin,
      'Contact',
      '/contact/',
      'The text-message inquiry path for prospective event-planning clients.',
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
      'How existing vendors and recommended professionals can be coordinated within the selected planning scope.',
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
      'An overview of supported celebration types; client stories are withheld until facts and photography are approved.',
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
