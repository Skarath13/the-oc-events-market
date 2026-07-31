import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL ?? 'https://the-oc-events-market.example';
const excludedFromSitemap = [
  '/services/full-service-planning-design/',
  '/services/partial-planning/',
  '/services/event-management-coordination/',
  '/journal/',
  '/privacy/',
  '/terms/',
];

export default defineConfig({
  site,
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return (
          !pathname.startsWith('/api/') &&
          !pathname.includes('/design-preview/') &&
          !excludedFromSitemap.includes(pathname)
        );
      },
    }),
  ],
  build: {
    assets: '_assets',
    inlineStylesheets: 'always',
  },
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
  redirects: {
    '/services/full-service/': '/services/full-service-planning-design/',
    '/services/coordination/': '/services/event-management-coordination/',
    '/events/showers/': '/events/baby-bridal-showers/',
    '/events/birthdays/': '/events/birthdays-milestones/',
    '/portfolio/': '/celebrations/',
    '/vendors/': '/for-vendors/',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
      cssMinify: 'lightningcss',
    },
  },
});
