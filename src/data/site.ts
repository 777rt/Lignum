import logoSymbol from '@/assets/icons/logo-lignum-symbol.png';

export type NavigationLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  /** Dominio real del sitio. PROVISIONAL: reemplazar tras la compra. */
  url: string;
  name: string;
  legalName: string;
  description: string;
  tagline: string;
  locale: string;
  currency: string;
  /** Teléfono en formato internacional. PROVISIONAL: reemplazar tras la compra. */
  phone: string;
  /** WhatsApp en formato internacional (solo dígitos). PROVISIONAL: reemplazar tras la compra. */
  whatsappNumber: string;
  instagram: string;
  instagramUrl: string;
  email: string;
  hours: {
    days: string;
    range: string;
  };
  coverage: string;
  navigation: NavigationLink[];
  logo: {
    path: string;
    alt: string;
    width: number;
    height: number;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  themeColor: string;
  ogImage: string;
  brandLabel: string;
};

/**
 * En CI (GitHub Pages) la URL se inyecta con `SITE_URL`; en local se usa la
 * provisional. `process` solo se lee en tiempo de build y se protege con
 * `typeof` porque este módulo también llega al navegador.
 */
const envUrl = typeof process !== 'undefined' ? process.env.SITE_URL : undefined;

export const SITE = {
  url: envUrl ?? 'https://www.tudominio.cl', // PROVISIONAL: dominio no comprado.
  name: 'Lignum',
  legalName: 'Construcción y Mantenciones de Espacios Verdes Limitada',
  description:
    'Construcción y mantención de áreas verdes en la Región Metropolitana y sus alrededores. Paisajismo, desmalezado, podas y tala de árboles con cotización clara.',
  tagline: 'Construcción y mantención de espacios verdes.',
  locale: 'es-CL',
  currency: 'CLP',
  phone: '+56 9 0000 0000', // PROVISIONAL: teléfono no comprado.
  whatsappNumber: '56900000000', // PROVISIONAL: WhatsApp no comprado.
  instagram: '@lignum_ltda',
  instagramUrl: 'https://www.instagram.com/lignum_ltda',
  email: 'lignum.ltda@gmail.com',
  hours: {
    days: 'Lunes a Domingo',
    range: '08:00 - 19:00',
  },
  coverage: 'Región Metropolitana y sus alrededores',
  navigation: [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Trabajos', href: '/trabajos' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Contacto', href: '/contacto' },
  ],
  logo: {
    path: logoSymbol.src,
    alt: 'Logotipo de Lignum',
    width: logoSymbol.width,
    height: logoSymbol.height,
  },
  colors: {
    primary: '#2F5C2D',
    secondary: '#1F321F',
    accent: '#7FA87C',
    background: '#F5F5F2',
    text: '#1A1916',
  },
  themeColor: '#162318',
  ogImage: '/og-image.jpg',
  brandLabel: 'Lignum',
} satisfies SiteConfig;
