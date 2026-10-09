/**
 * Catálogo de servicios de la empresa.
 *
 * Este archivo es la fuente de verdad para listar servicios en la página de
 * servicios, los previews del home y el formulario de cotización.
 *
 * Las descripciones están marcadas como PLACEHOLDER: serán redactadas
 * posteriormente con contenido definitivo y optimizado para SEO.
 *
 * La ruta futura de cada detalle será: /servicios/{slug} (ver README).
 */

import imgAreasVerdes from '@/assets/images/WhatsApp Image 2026-10-08 at 4.43.00 PM (3).jpeg';
import imgJardineria from '@/assets/images/WhatsApp Image 2026-10-08 at 9.41.51 PM.jpeg';
import imgJardines from '@/assets/images/WhatsApp Image 2026-10-08 at 4.43.00 PM (2).jpeg';
import imgPaisajismo from '@/assets/images/WhatsApp Image 2026-10-08 at 5.47.57 PM (1).jpeg';
import imgPodas from '@/assets/images/WhatsApp Image 2026-10-08 at 4.43.00 PM (1).jpeg';

export type Service = {
  /** Slug de la URL futura de la página de detalle. */
  slug: string;
  /** Nombre público del servicio. */
  name: string;
  /** Descripción corta para tarjetas y meta description. PLACEHOLDER. */
  shortDescription: string;
  /** Descripción larga para la futura página de detalle. PLACEHOLDER. */
  description: string;
  /** Nombre del icono de Lucide (formato kebab-case). */
  icon: string;
  /** Fotografía propia del servicio. Si no está definida se usa el placeholder. */
  image?: ImageMetadata;
  /** Texto alternativo de la fotografía del servicio. */
  imageAlt?: string;
  /** Servicio principal de la empresa (destacado en el home). */
  mainService?: boolean;
  /** Marcador interno: el contenido aún no es definitivo. */
  status: 'placeholder';
};

export const SERVICES: Service[] = [
  {
    slug: 'mantencion-de-áreas-verdes-y-jardines',
    name: 'Mantención de áreas verdes y jardines',
    shortDescription:
      'Corte de césped, orillado, fertilización, control de malezas, instalación de plantas, resiembras y decoración de jardines. Dejamos tu espacio verde siempre ordenado, limpio y con una cotización clara antes de comenzar.',
    description: 'Descripción pendiente para mantención de jardines. (PLACEHOLDER)',
    icon: 'sprout',
    image: imgJardines,
    imageAlt: 'Corte de césped en un jardín con líneas de corte, patio y un perro sobre el pasto',
    mainService: true,
    status: 'placeholder',
  },
  {
    slug: 'Desmalezado',
    name: 'Desmalezado',
    shortDescription:
      'Limpieza profunda y eliminación de maleza, matorrales y vegetación no deseada en patios, parcelas y antejardines. Dejamos tu terreno limpio, seguro y ordenado con retiro de escombros vegetales.',
    description: 'Descripción pendiente para jardinería. (PLACEHOLDER)',
    icon: 'trees',
    image: imgJardineria,
    imageAlt: 'Cantera con estrelichias y arbustos podados, con mantillo nuevo, junto a la vereda',
    status: 'placeholder',
  },
  {
    slug: 'paisajismo',
    name: 'Paisajismo',
    shortDescription:
      'Diseño y transformación integral de áreas verdes para resaltar la belleza de tus espacios exteriores. Combinamos selección de plantas adaptadas al clima de su Región, senderos y decoración vegetal con presupuestos claros y ejecucción a tiempo.',
    description: 'Descripción pendiente para paisajismo. (PLACEHOLDER)',
    icon: 'pencil-ruler',
    image: imgPaisajismo,
    imageAlt: 'Sendero de piedras entre plantaciones de arbustos y gramíneas',
    status: 'placeholder',
  },
  {
    slug: 'podas',
    name: 'Podas',
    shortDescription:
      'Servicio profesional de poda de árboles de gran altura, palmeras, arbustos y cercos vivos. Trabajamos con equipamiento de seguridad adecuado, limpieza de la zona de trabajo y retiro de residuos (opcional dependiendo del cliente).',
    description: 'Descripción pendiente para podas. (PLACEHOLDER)',
    icon: 'scissors',
    image: imgPodas,
    imageAlt: 'Podador arborizado cortando el tronco de una palmera con motosierra',
    status: 'placeholder',
  },
  {
    slug: 'Tala-de-árboles',
    name: 'Tala de árboles',
    shortDescription:
      'Servicio seguro de tala y extracción de árboles en casas, terrenos y parcelas. Agendamiento puntual en todo Chile y tarifas claras desde la primera consulta. ',
    description: 'Descripción pendiente para mantención de áreas verdes. (PLACEHOLDER)',
    icon: 'leaf',
    image: imgAreasVerdes,
    imageAlt: 'Área verde recién cortada con líneas de corte, un árbol y setos junto a un muro',
    status: 'placeholder',
  },
];

/** Servicio principal para destacados. */
export const MAIN_SERVICES: Service[] = SERVICES.filter((s) => s.mainService);

/** Índice por slug para consultas futuras. */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
