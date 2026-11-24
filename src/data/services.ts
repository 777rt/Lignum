import imgCespedNeumaticos from '@/assets/images/paisajismo/cesped-desparejo-neumaticos.jpeg';
import imgCespedRastrillo from '@/assets/images/mantencion-de-areas-verdes-y-jardines/cesped-desparejo-rastrillo.jpeg';
import imgDesmalezadoCaseta from '@/assets/images/desmalezado/desmalezado-malezas-caseta.jpeg';
import imgDesmalezadoMalezas from '@/assets/images/desmalezado/desmalezado-malezas-desbrozadora.jpeg';
import imgDesmalezadoMuro from '@/assets/images/desmalezado/desmalezado-malezas-altas-muro.jpeg';
import imgDesmalezadoResiduos from '@/assets/images/desmalezado/desmalezado-residuos-retirados.jpeg';
import imgJardines from '@/assets/images/mantencion-de-areas-verdes-y-jardines/mantencion-area-verde-lineas-corte.jpeg';
import imgLimpiezaCamino from '@/assets/images/desmalezado/limpieza-camino-placas-residuos.jpeg';
import imgMalezasFlores from '@/assets/images/desmalezado/malezas-flores-moradas-muro.jpeg';
import imgMantencionPatio from '@/assets/images/mantencion-de-areas-verdes-y-jardines/mantencion-patio-estrecho-residuos.jpeg';
import imgPaisajismo from '@/assets/images/paisajismo/paisajismo-sendero-piedras.jpeg';
import imgPaisajismoVertical from '@/assets/images/paisajismo/paisajismo-sendero-piedras-vertical.jpeg';
import imgPatioCitrico from '@/assets/images/mantencion-de-areas-verdes-y-jardines/patio-citrico-cesped-arbustos.jpeg';
import imgPatioLateral from '@/assets/images/mantencion-de-areas-verdes-y-jardines/patio-lateral-cesped-seco.jpeg';
import imgPatioMalezas from '@/assets/images/desmalezado/patio-malezas-manguera-enredada.jpeg';
import imgPatioPosterior from '@/assets/images/mantencion-de-areas-verdes-y-jardines/patio-posterior-arboles-cesped.jpeg';
import imgPodaPalmeraPoster from '@/assets/images/podas/video-poda-palmera-poster.jpg';
import imgPodas from '@/assets/images/podas/poda-palmera-motosierra-tronco.jpeg';
import imgPodasAltura from '@/assets/images/podas/poda-palmera-arbolista-altura.jpeg';
import imgResultadoCesped from '@/assets/images/paisajismo/resultado-instalacion-cesped.jpeg';
import imgRollosTrabajador from '@/assets/images/paisajismo/instalacion-cesped-rollos-trabajador.jpeg';
import imgRollosVivienda from '@/assets/images/paisajismo/instalacion-cesped-rollos-vivienda.jpeg';
import imgTala from '@/assets/images/tala-de-arboles/video-poda-tronco-ladera-poster.jpg';
import imgTerrenoAmplio from '@/assets/images/paisajismo/preparacion-terreno-area-amplia.jpeg';
import imgTerrenoPreparado from '@/assets/images/paisajismo/preparacion-terreno-suelo-preparado.jpeg';
import { SITE } from '@/data/site';

export type ServicePhoto = {
  src: ImageMetadata;
  alt: string;
};

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: ImageMetadata;
  imageAlt: string;
  gallery: ServicePhoto[];
  includes: string[];
  mainService?: boolean;
  status: 'active';
};

export const SERVICES: Service[] = [
  {
    slug: 'mantencion-de-areas-verdes-y-jardines',
    name: 'Mantención de áreas verdes y jardines',
    shortDescription: `Corte de césped, orillado, fertilización, control de malezas y cuidado de plantas en jardines y áreas verdes de ${SITE.coverage}.`,
    description: `Realizamos la mantención de jardines y áreas verdes en ${SITE.coverage}: corte de césped, orillado, fertilización, control de malezas y reposición de plantas. Adaptamos la intervención a cada espacio y dejamos el área ordenada, con los residuos vegetales retirados al terminar el trabajo.`,
    icon: 'sprout',
    image: imgJardines,
    imageAlt: 'Área verde con líneas de corte recientes junto a un muro',
    gallery: [
      {
        src: imgPatioCitrico,
        alt: 'Patio con árbol cítrico y césped',
      },
      {
        src: imgPatioPosterior,
        alt: 'Patio posterior con árboles y césped',
      },
      {
        src: imgCespedRastrillo,
        alt: 'Césped desparejo siendo alisado con rastrillo',
      },
      {
        src: imgPatioLateral,
        alt: 'Patio lateral con césped seco',
      },
      {
        src: imgMantencionPatio,
        alt: 'Patio estrecho durante la mantención',
      },
    ],
    includes: [
      'Corte y orillado de césped',
      'Fertilización y control de malezas',
      'Reposición y cuidado de plantas',
      'Retiro de residuos vegetales',
    ],
    mainService: true,
    status: 'active',
  },
  {
    slug: 'desmalezado',
    name: 'Desmalezado',
    shortDescription: `Limpieza de patios, antejardines y terrenos con eliminación de maleza y retiro de residuos vegetales en ${SITE.coverage}.`,
    description: `Ejecutamos desmalezado en patios, antejardines, muros y caminos de ${SITE.coverage}. Retiramos maleza y vegetación no deseada, limpiamos el terreno y dejamos el material vegetal retirado para su disposición, según lo acordado con el cliente.`,
    icon: 'trees',
    image: imgDesmalezadoResiduos,
    imageAlt: 'Residuos vegetales retirados tras la limpieza',
    gallery: [
      {
        src: imgDesmalezadoMalezas,
        alt: 'Desbroce de maleza junto a una caseta',
      },
      {
        src: imgDesmalezadoMuro,
        alt: 'Maleza alta junto a un muro',
      },
      {
        src: imgDesmalezadoCaseta,
        alt: 'Terreno con maleza junto a una caseta',
      },
      {
        src: imgLimpiezaCamino,
        alt: 'Camino limpio con placas y residuos retirados',
      },
      {
        src: imgMalezasFlores,
        alt: 'Maleza con flores moradas junto a un muro',
      },
      {
        src: imgPatioMalezas,
        alt: 'Patio con maleza y manguera en el suelo',
      },
    ],
    includes: [
      'Corte y extracción de maleza',
      'Limpieza de muros, caminos y canteras',
      'Retiro de residuos vegetales',
      'Entrega del terreno limpio y ordenado',
    ],
    status: 'active',
  },
  {
    slug: 'paisajismo',
    name: 'Paisajismo',
    shortDescription: `Diseño y ejecución de áreas verdes, preparación de suelo, instalación de césped y senderos en ${SITE.coverage}.`,
    description: `Diseñamos y ejecutamos intervenciones de paisajismo en ${SITE.coverage}: preparación de suelo, instalación de césped, senderos y plantación de arbustos y gramíneas. Seleccionamos especies adecuadas al espacio y coordinamos la entrega del terreno listo para su uso.`,
    icon: 'pencil-ruler',
    image: imgPaisajismo,
    imageAlt: 'Sendero de piedras entre arbustos y gramíneas',
    gallery: [
      {
        src: imgPaisajismoVertical,
        alt: 'Sendero de piedras visto en formato vertical',
      },
      {
        src: imgTerrenoPreparado,
        alt: 'Terreno rastrillado y preparado con pala y sustrato',
      },
      {
        src: imgTerrenoAmplio,
        alt: 'Área amplia de terreno preparada para paisajismo',
      },
      {
        src: imgRollosVivienda,
        alt: 'Rollos de césped apilados junto a una vivienda',
      },
      {
        src: imgRollosTrabajador,
        alt: 'Trabajador acomodando rollos de césped en un patio',
      },
      {
        src: imgCespedNeumaticos,
        alt: 'Césped desparejo con marcas de neumáticos',
      },
      {
        src: imgResultadoCesped,
        alt: 'Césped recién instalado junto a un muro',
      },
    ],
    includes: [
      'Preparación y nivelación de suelo',
      'Instalación de césped y plantas',
      'Diseño de canteras y senderos',
      'Limpieza final del área',
    ],
    status: 'active',
  },
  {
    slug: 'podas',
    name: 'Podas',
    shortDescription: `Poda de árboles, palmeras, arbustos y cercos vivos con equipamiento de seguridad en ${SITE.coverage}.`,
    description: `Realizamos podas de árboles, palmeras, arbustos y cercos vivos en ${SITE.coverage}. El trabajo considera el uso de equipamiento de seguridad, el corte controlado de las ramas y la limpieza del área, con retiro del material vegetal según lo acordado.`,
    icon: 'scissors',
    image: imgPodas,
    imageAlt: 'Podador cortando el tronco de una palmera con motosierra',
    gallery: [
      {
        src: imgPodasAltura,
        alt: 'Trabajador arborizado en una palmera con equipo de seguridad',
      },
      {
        src: imgPodaPalmeraPoster,
        alt: 'Poda de palmera con motosierra en altura',
      },
    ],
    includes: [
      'Poda de palmeras y árboles en altura',
      'Formación de arbustos y cercos',
      'Uso de equipamiento de seguridad',
      'Limpieza y retiro de residuos vegetales',
    ],
    status: 'active',
  },
  {
    slug: 'tala-de-arboles',
    name: 'Tala de árboles',
    shortDescription: `Tala y extracción controlada de árboles en casas, patios y terrenos de ${SITE.coverage}.`,
    description: `Realizamos tala y extracción controlada de árboles en ${SITE.coverage}. Coordinamos la intervención, cortamos y bajamos el árbol por tramos cuando el espacio lo requiere y retiramos los restos de madera y follaje según lo acordado con el cliente.`,
    icon: 'leaf',
    image: imgTala,
    imageAlt: 'Tronco de palmera derribado en una ladera siendo cortado',
    gallery: [],
    includes: [
      'Evaluación previa del árbol y del entorno',
      'Corte controlado y bajada por tramos',
      'Limpieza del área de trabajo',
      'Retiro de restos según lo acordado',
    ],
    status: 'active',
  },
];

/** Servicio principal para destacados. */
export const MAIN_SERVICES: Service[] = SERVICES.filter((s) => s.mainService);

/** Índice por slug para consultas futuras. */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
