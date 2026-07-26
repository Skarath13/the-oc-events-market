import { siteConfig } from '@/data/site';

export type Breadcrumb = {
  name: string;
  path: string;
};

export type JsonLd = Record<string, unknown>;

export const organizationId = (origin: URL) => new URL('/#organization', origin).href;
export const websiteId = (origin: URL) => new URL('/#website', origin).href;

export function organizationSchema(origin: URL): JsonLd {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId(origin),
    name: siteConfig.businessName,
    description: siteConfig.fullDefinition,
    url: new URL('/', origin).href,
    logo: siteConfig.logo.src ? new URL(siteConfig.logo.src, origin).href : undefined,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: siteConfig.serviceArea,
    },
    sameAs:
      siteConfig.socialProfiles.length > 0
        ? siteConfig.socialProfiles.map((profile) => profile.href)
        : undefined,
  };

  return removeUndefined(schema);
}

export function websiteSchema(origin: URL): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId(origin),
    url: new URL('/', origin).href,
    name: siteConfig.businessName,
    publisher: { '@id': organizationId(origin) },
    inLanguage: 'en-US',
  };
}

export function serviceSchema({
  origin,
  pathname,
  name,
  description,
  serviceType,
}: {
  origin: URL;
  pathname: string;
  name: string;
  description: string;
  serviceType: string;
}): JsonLd {
  const url = new URL(pathname, origin).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    serviceType,
    url,
    provider: { '@id': organizationId(origin) },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: siteConfig.serviceArea,
    },
  };
}

export function breadcrumbSchema(origin: URL, breadcrumbs: Breadcrumb[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: new URL(breadcrumb.path, origin).href,
    })),
  };
}

function removeUndefined(value: JsonLd): JsonLd {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined));
}
