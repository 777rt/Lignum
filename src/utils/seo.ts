/**
 * Utilidades reutilizables para SEO técnico.
 *
 * La mayor parte funciona de forma declarativa desde MainLayout; estas
 * funciones concentran la lógica de títulos, canonicals y JSON-LD.
 */

import { SITE } from '@/data/site';
import { withBase } from '@/utils/links';

export type JsonLd = Record<string, unknown>;

/** Genera el <title> con separador de marca. */
export function buildPageTitle(title: string, includeSuffix = true): string {
  return includeSuffix ? `${title} | ${SITE.name}` : title;
}

/** URL canónica absoluta a partir de una ruta interna. */
export function buildCanonicalURL(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return new URL(withBase(clean), SITE.url).toString();
}

/** Schema.org: Organización. */
export function buildOrganizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: new URL(SITE.logo.path, SITE.url).toString(),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      contactType: 'customer service',
      areaServed: 'CL',
      availableLanguage: ['es'],
    },
  };
}

/** Schema.org: WebSite (con SearchAction deshabilitado, sitio sin buscador). */
export function buildWebSiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.locale,
  };
}

/** Schema.org: Negocio local (base para SEO local en Santiago). */
export function buildLocalBusinessSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: SITE.name,
    image: new URL(SITE.logo.path, SITE.url).toString(),
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santiago',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    },
    geo: {
      // PLACEHOLDER: coordenadas de la empresa (Pagina sin backend).
      '@type': 'GeoCoordinates',
      latitude: -33.4489,
      longitude: -70.6693,
    },
    areaServed: SITE.zones.map((zone) => ({
      '@type': 'Place',
      name: zone,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
  };
}

/** Schema.org: migas de pan. */
export function buildBreadcrumbSchema(crumbs: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: buildCanonicalURL(crumb.path),
    })),
  };
}
