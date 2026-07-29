import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { siteConfig } from '@/data/site';

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('journal', ({ data }) => !data.draft);
  return rss({
    title: `${siteConfig.businessName} Journal`,
    description:
      'Practical Orange County event planning guidance about timelines, vendors, venues, design, and logistics.',
    site: context.site ?? 'https://the-oc-events-market.example',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt ?? new Date(0),
      link: `/journal/${post.id}/`,
    })),
  });
};
