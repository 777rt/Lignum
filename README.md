# Lignum

Sitio web estático para Construcción y Mantenciones de Espacios Verdes Limitada, con operación en la Región Metropolitana y sus alrededores. Prioriza rendimiento, SEO local y conversión a WhatsApp.

> Estado vigente: datos comerciales reales cargados, 12 rutas HTML y cinco fichas de servicio publicadas. El dominio `.cl` y la decisión final de `base` siguen pendientes. El Hero está aprobado y no debe modificarse.

## Stack

| Tecnología                                     | Uso                                    |
| ---------------------------------------------- | -------------------------------------- |
| [Astro](https://astro.build)                   | Framework estático (SSG)               |
| TypeScript                                     | Tipado estricto                        |
| [Tailwind CSS v4](https://tailwindcss.com)     | Estilos utility-first                  |
| [@lucide/astro](https://lucide.dev/docs/astro) | Iconos SVG                             |
| [GSAP](https://gsap.com)                       | Reveals con carga diferida             |
| ESLint + eslint-plugin-astro                   | Linting                                |
| Prettier + prettier-plugin-astro               | Formato                                |
| @astrojs/sitemap                               | Sitemap XML                            |
| Playwright                                     | Pruebas end-to-end en tres navegadores |

No se usan React, Vue, Svelte, backend, base de datos ni CMS. El sitio se compila a HTML estático.

## Requisitos

- Node.js >= 22.12
- npm 10+

## Instalación

```bash
npm install
```

## Comandos

| Comando                       | Descripción                                               |
| ----------------------------- | --------------------------------------------------------- |
| `npm run dev`                 | Servidor de desarrollo en `http://localhost:4321/Lignum/` |
| `npm run build`               | Build de producción en `dist/`                            |
| `npm run preview`             | Previsualiza el build local                               |
| `npm run check`               | Type-check de Astro, incluye archivos `.astro`            |
| `npm run lint`                | ESLint con `--max-warnings=0`                             |
| `npm run lint:fix`            | ESLint con autocorrección                                 |
| `npm run format`              | Prettier: formatea todo el proyecto                       |
| `npm run format:check`        | Prettier: verifica el formato                             |
| `npm test`                    | Playwright en Chromium, Firefox y WebKit                  |
| `npm test -- --reporter=line` | Suite completa con reporte en línea                       |

## Estructura de carpetas

```text
src/
├── assets/
│   ├── fonts/              # Satoshi, Geist y Geist Mono self-hosted
│   ├── icons/              # Símbolo del logo
│   ├── images/             # Fotos por catálogo y pósters de video
│   │   ├── general/
│   │   ├── desmalezado/
│   │   ├── mantencion-de-areas-verdes-y-jardines/
│   │   ├── paisajismo/
│   │   ├── podas/
│   │   └── tala-de-arboles/
│   └── videos/             # MP4 por catálogo
├── components/
│   ├── layout/             # Navbar y Footer
│   ├── ui/                 # Button, Container, SectionTitle, WhatsAppButton
│   ├── home/               # Hero, ServicesPreview, FeaturedWork, AboutPreview,
│   │                       # Testimonials, FinalCTA
│   ├── services/           # ServiceCard y ServiceGrid en Astro
│   ├── gallery/            # Gallery y VideoGallery en Astro
│   └── quote/              # QuoteForm
├── data/
│   ├── site.ts             # Datos confirmados de la empresa
│   └── services.ts         # Catálogo de servicios y rutas de fotos
├── layouts/
│   └── MainLayout.astro    # SEO head, nav, footer, WhatsApp flotante y reveals
├── pages/
│   ├── index.astro
│   ├── servicios/index.astro
│   ├── servicios/[slug].astro
│   ├── trabajos.astro
│   ├── nosotros.astro
│   ├── contacto.astro
│   ├── blog/index.astro
│   ├── 404.astro
│   └── robots.txt.ts
├── styles/global.css       # Tailwind v4, tokens y estilos base
└── utils/
    ├── whatsapp.ts         # Enlaces y mensajes de WhatsApp
    ├── seo.ts              # Canonical, OG y constructores de JSON-LD
    ├── links.ts            # withBase y comparación de rutas
    └── animation.ts        # Carga diferida de GSAP y reveals

public/
├── favicon.png
└── og-image.jpg

docs/
├── referencia-tarjeta-lignum.pdf
├── CLIENT_DATA_REQUIRED.md
├── IMAGE_AUDIT.md
├── LIGHTHOUSE_AUDIT.md
├── PROJECT_AUDIT_2026.md
└── AUTOMATION_PLAN.md

tests/
└── lignum.spec.ts
```

## Rutas y servicios

El sitio publica 12 rutas HTML más el endpoint dinámico `robots.txt`. Las cinco fichas activas viven en `/servicios/[slug]`:

- `mantencion-de-areas-verdes-y-jardines`
- `desmalezado`
- `paisajismo`
- `podas`
- `tala-de-arboles`

Cada ficha usa `getStaticPaths()`, fotografías propias por catálogo y galería sin descripciones literales. `/blog` existe como placeholder editorial y no figura en la navegación.

## Datos de la empresa

La fuente única es `src/data/site.ts`:

- Teléfono y WhatsApp: `+56 9 9582 0797`, dígitos `56995820797`.
- Email: `lignum.ltda@gmail.com`.
- Instagram: `https://www.instagram.com/lignum_ltda`.
- Cobertura: Región Metropolitana y sus alrededores.
- Horario: Lunes a Domingo, 08:00 a 19:00.
- Dominio: `https://www.tudominio.cl`, provisional hasta comprar el `.cl` definitivo.

El dominio alimenta canonical, Open Graph, sitemap y JSON-LD. Los tokens de Tailwind v4 se definen en `src/styles/global.css` y deben sincronizarse con `colors` de `site.ts`.

## WhatsApp

`src/data/site.ts` define el número confirmado. Todo lo demás usa `generateWhatsAppLink()` de `src/utils/whatsapp.ts`: botón flotante, Navbar, Footer, FinalCTA, `/contacto`, fichas de servicio y `QuoteForm`. Los enlaces `tel:` derivan de `SITE.phone`.

## Base path y deploy

Mientras no se compre el dominio, mantener `BASE_PATH: /Lignum` en `astro.config.ts` y en los workflows. Tras comprar el dominio, decidir si el sitio se publica en raíz con `base: '/'` o conserva `/Lignum`, y actualizar `SITE.url`, `astro.config.ts` y `.github/workflows/deploy.yml`.

Antes de publicar: `npm run format:check`, `npm run lint`, `npm run check`, `npm run build` y `npm test -- --reporter=line`.

## Referencias

- Documentación de Astro: https://docs.astro.build
- Rutas dinámicas: https://docs.astro.build/en/core-concepts/routing/
- Componentes: https://docs.astro.build/en/basics/astro-components/
