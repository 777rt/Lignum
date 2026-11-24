/**
 * Utilidades reutilizables para SEO técnico.
 *
 * La mayor parte funciona de forma declarativa desde MainLayout; estas
 * funciones concentran la lógica de títulos, canonicals y JSON-LD.
 */

import { SITE } from '@/data/site';
import type { Service } from '@/data/services';
import { withBase } from '@/utils/links';

export type JsonLd = Record<string, unknown>;

/**
 * Marcador con el que el proyecto señala el contenido que la empresa todavía
 * no ha confirmado. Todo texto que lo contenga es un borrador: no debe
 * publicarse en el HTML ni en los metadatos.
 */
export const MARCADOR_PENDIENTE = '(PLACEHOLDER)';

/** true si el texto sigue pendiente de confirmación por la empresa. */
export function estaPendiente(texto: string): boolean {
  return texto.includes(MARCADOR_PENDIENTE);
}

/** Genera el <title> con separador de marca. */
export function buildPageTitle(title: string, includeSuffix = true): string {
  return includeSuffix ? `${title} | ${SITE.name}` : title;
}

/**
 * Resuelve la metadescripción de una página.
 *
 * Nunca devuelve un borrador: si la descripción (propia o por defecto)
 * sigue marcada como pendiente, se devuelve una cadena vacía y la página se
 * publica sin metadescripción en lugar de publicar el marcador. En cuanto la
 * empresa confirme el texto, vuelve a emitirse sin tocar nada más.
 */
export function buildMetaDescription(description: string | undefined, fallback: string): string {
  const candidata = description ?? fallback;
  return estaPendiente(candidata) ? '' : candidata;
}

/** URL canónica absoluta a partir de una ruta interna. */
export function buildCanonicalURL(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return new URL(withBase(clean), SITE.url).toString();
}

/** URL absoluta de un asset interno, respetando el base path del sitio. */
function buildAssetURL(path: string): string {
  return new URL(withBase(path), SITE.url).toString();
}

/** Schema.org: Organización. */
export function buildOrganizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    legalName: SITE.legalName,
    url: buildCanonicalURL('/'),
    logo: buildAssetURL(SITE.logo.path),
    email: SITE.email,
    sameAs: [SITE.instagramUrl],
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
    url: buildCanonicalURL('/'),
    inLanguage: SITE.locale,
  };
}

/** Horario de apertura validado, listo para Schema.org. */
type Horario = {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

/** Convierte un rango "HH:MM - HH:MM" en apertura y cierre, o null si no es válido. */
function parseHours(rango: string): [string, string] | null {
  const partes = rango.split('-').map((parte) => parte.trim());
  if (partes.length !== 2) return null;
  const patron = /^\d{2}:\d{2}$/;
  if (!patron.test(partes[0]) || !patron.test(partes[1])) return null;
  return [partes[0], partes[1]];
}

/**
 * Schema.org: Negocio local (base para SEO local en Santiago).
 *
 * Solo se declaran datos que la empresa haya confirmado: los horarios salen
 * de `SITE.hours` (única fuente) y se omiten las tarifas y las coordenadas,
 * que serían datos inventados.
 */
export function buildLocalBusinessSchema(): JsonLd {
  const horarios: Horario[] = [];
  const horas = parseHours(SITE.hours.range);

  if (horas) {
    const [opens, closes] = horas;
    horarios.push({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens,
      closes,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: SITE.name,
    legalName: SITE.legalName,
    image: buildAssetURL(SITE.logo.path),
    url: buildCanonicalURL('/'),
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    },
    areaServed: {
      '@type': 'Place',
      name: SITE.coverage,
    },
    openingHoursSpecification: horarios,
  };
}

/** Schema.org: servicio individual. */
export function buildServiceSchema(service: Service): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    serviceType: service.name,
    url: buildCanonicalURL(`/servicios/${service.slug}`),
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      legalName: SITE.legalName,
      url: buildCanonicalURL('/'),
    },
    areaServed: {
      '@type': 'Place',
      name: SITE.coverage,
    },
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
