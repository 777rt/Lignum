/**
 * Configuración central del sitio.
 *
 * TODOS los campos marcados como PLACEHOLDER deben ser reemplazados
 * posteriormente con la información real de la empresa.
 */

import logoSymbol from '@/assets/icons/logo-lignum-symbol.png';

export type NavigationLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  /** Dominio real del sitio. PLACEHOLDER: reemplazar antes del deploy. */
  url: string;
  /** Nombre de la marca que aparece en títulos y pie de página. */
  name: string;
  /** Nombre legal de la empresa (para Schema.org). PLACEHOLDER. */
  legalName: string;
  /** Descripción corta para meta description y Open Graph. PLACEHOLDER. */
  description: string;
  /** Eslogan/lema provisional. PLACEHOLDER. */
  tagline: string;
  locale: string;
  currency: string;
  /** Teléfono en formato internacional para mostrar. PLACEHOLDER. */
  phone: string;
  /** Número de WhatsApp en formato internacional (solo dígitos). PLACEHOLDER. */
  whatsappNumber: string;
  /** Usuario de Instagram. PLACEHOLDER. */
  instagram: string;
  /** Email de contacto. PLACEHOLDER. */
  email: string;
  /** Horarios de atención. PLACEHOLDER. */
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  /** Zonas de cobertura (comunas de Santiago). PLACEHOLDER: completar. */
  zones: string[];
  /** Rutas principales del sitio. */
  navigation: NavigationLink[];
  /** Logo (símbolo, fondo transparente, derivado de iconlignum.jpg). */
  logo: {
    path: string;
    alt: string;
  };
  /** Colores corporativos. PLACEHOLDER: definir con la identidad real. */
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  /** Color para <meta name="theme-color">. */
  themeColor: string;
  /** Imagen social por defecto (Open Graph / Twitter). PLACEHOLDER. */
  ogImage: string;
  /** Nombre visual de la marca (aparece en la barra de navegación). */
  brandLabel: string;
};

/**
 * URL pública del sitio.
 *
 * En CI (GitHub Pages) se inyecta con la variable de entorno `SITE_URL`;
 * en local se usa el PLACEHOLDER. `process` solo se lee en tiempo de build,
 * por eso se protege con `typeof` (este módulo también llega al navegador).
 */
const envUrl = typeof process !== 'undefined' ? process.env.SITE_URL : undefined;

export const SITE = {
  url: envUrl ?? 'https://www.tudominio.cl', // PLACEHOLDER: dominio real
  name: 'Lignum',
  legalName: 'Razón Social o Persona Natural (PLACEHOLDER)',
  description:
    'Servicios profesionales de jardinería en Santiago de Chile. Mantención de jardines, poda, diseño y paisajismo. (PLACEHOLDER)',
  tagline: 'Jardinería profesional en Santiago (PLACEHOLDER)',
  locale: 'es-CL',
  currency: 'CLP',
  phone: '+56 9 0000 0000', // PLACEHOLDER
  whatsappNumber: '56900000000', // PLACEHOLDER: número real de WhatsApp
  instagram: '@tu-usuario-instagram', // PLACEHOLDER
  email: 'contacto@tudominio.cl', // PLACEHOLDER
  hours: {
    weekdays: '08:00 - 18:00', // PLACEHOLDER
    saturday: '09:00 - 13:00', // PLACEHOLDER
    sunday: 'Cerrado', // PLACEHOLDER
  },
  zones: [
    'Santiago Centro', // PLACEHOLDER: ajustar comunas reales de cobertura
    'Ñuñoa',
    'Providencia',
    'Las Condes',
    'Vitacura',
  ],
  navigation: [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Trabajos', href: '/trabajos' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Contacto', href: '/contacto' },
    { label: 'Blog', href: '/blog' },
  ],
  logo: {
    path: logoSymbol.src,
    alt: 'Logotipo de Lignum',
  },
  colors: {
    primary: '#2F5C2D',
    secondary: '#1F321F',
    accent: '#7FA87C',
    background: '#F5F5F2',
    text: '#1A1916',
  },
  themeColor: '#162318',
  ogImage: '', // PLACEHOLDER: ruta hacia la imagen social definitiva
  brandLabel: 'Lignum',
} satisfies SiteConfig;
