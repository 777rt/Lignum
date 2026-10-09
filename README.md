# Web para empresa de jardinería — Santiago (PLACEHOLDER)

Sitio web estático para una PYME de jardinería con operación en Santiago de
Chile. Orientado a máximo rendimiento, SEO local y conversión a WhatsApp.

> ⚠️ **Fase actual: arquitectura inicial.** Todo el contenido visible es
> provisional y está marcado como `PLACEHOLDER`. No hay información real de la
> empresa, ni testimonios, ni fotografías.

## Stack

| Tecnología                                     | Uso                                             |
| ---------------------------------------------- | ----------------------------------------------- |
| [Astro](https://astro.build)                   | Framework estático (SSG)                        |
| TypeScript                                     | Tipado estricto                                 |
| [Tailwind CSS v4](https://tailwindcss.com)     | Estilos (utility-first)                         |
| [@lucide/astro](https://lucide.dev/docs/astro) | Iconos                                          |
| [GSAP](https://gsap.com)                       | Animaciones (carga diferida, solo donde se usa) |
| ESLint + eslint-plugin-astro                   | Linting                                         |
| Prettier + prettier-plugin-astro               | Formato                                         |
| @astrojs/sitemap                               | Sitemap XML                                     |

No se usan React, frameworks de componentes, backend, base de datos ni CMS:
el sitio se compila a HTML estático.

## Requisitos

- Node.js >= 22.12
- npm 10+

## Instalación

```bash
npm install
```

## Comandos

| Comando                | Descripción                                       |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo en `http://localhost:4321` |
| `npm run build`        | Build de producción en `dist/`                    |
| `npm run preview`      | Previsualiza el build local                       |
| `npm run check`        | Type-check de Astro (también revisa .astro)       |
| `npm run lint`         | ESLint (errores convierten el comando en falla)   |
| `npm run lint:fix`     | ESLint con autocorrección                         |
| `npm run format`       | Prettier: formatea todo el proyecto               |
| `npm run format:check` | Prettier: verifica el formato                     |

## Estructura de carpetas

```
src/
├── assets/                 # Imágenes, videos e íconos locales (use Astro <Image>)
│   ├── images/
│   ├── videos/
│   └── icons/
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── ui/                 # Button, Container, SectionTitle, WhatsAppButton
│   ├── home/               # Hero, ServicesPreview, FeaturedWork, AboutPreview,
│   │                       # Testimonials, FinalCTA
│   ├── services/           # ServiceCard, ServiceGrid
│   ├── gallery/            # Gallery, VideoGallery
│   └── quote/              # QuoteForm
├── data/                   # Fuente de verdad del sitio
│   ├── site.ts             # Datos de la empresa (PLACEHOLDER)
│   └── services.ts         # Catálogo de servicios
├── layouts/
│   └── MainLayout.astro    # SEO head, nav, footer, WhatsApp flotante
├── pages/                  # Rutas (/ , /servicios, /trabajos, /nosotros,
│   │                       # /contacto, /blog, /404)
├── styles/
│   └── global.css          # Tailwind v4 topic + estilos base (mobile-first)
└── utils/
    ├── whatsapp.ts         # Enlaces y mensajes de WhatsApp
    ├── seo.ts              # title/canonical + builders de JSON-LD
    └── animation.ts        # Lazy loader de GSAP + reveal on scroll
public/
├── favicon.png              # Favicon (símbolo del logo, fondo transparente)
├── fonts/
└── robots.txt
```

Nuevas páginas de servicio se agregarán en `src/pages/servicios/[slug].astro`
(ver abajo "Agregar nuevos servicios").

## Cómo agregar nuevos servicios

1. Agregar la entrada en `src/data/services.ts` (slug único, nombre, resumen,
   icono de Lucide; `image`/`imageAlt` opcionales para la fotografía real del
   servicio — sin foto se usa el placeholder).
2. Cuando existan las páginas de detalle, crear
   `src/pages/servicios/[slug].astro` leyendo el slug desde
   `Astro.params` con `getServiceBySlug()`.
3. La tarjeta `ServiceCard` usa `slug` para los anclajes de `#slug` en
   `/servicios`.

## Cómo agregar nuevas páginas

1. Crear el archivo en `src/pages/` (`.astro` o `.md`).
2. Envolver el contenido en `MainLayout` con `title` (y `description`
   cuando difiera del default).
3. La ruta se genera automáticamente desde el nombre de archivo
   (ver [routing en Astro](https://docs.astro.build/en/guides/routing/)).

## Cómo modificar los datos de la empresa

Todo se centraliza en `src/data/site.ts`:

- nombre, teléfono, WhatsApp, email, Instagram
- zonas de cobertura, horarios
- logo, colores, dominio (`url`)

Cambiar los valores PLACEHOLDER. El **dominio** también alimenta el
canonical, el sitemap (`@astrojs/sitemap`) y el JSON-LD.
Los tokens de color de Tailwind v4 se definen en
`src/styles/global.css` (`@theme`) y deben sincronizarse con
`colors` de `site.ts`.

## Cómo configurar WhatsApp

1. Reemplazar `whatsappNumber` en `src/data/site.ts` por el número real en
   formato internacional (solo dígitos, ej: `56912345678`).
2. Todo lo demás (botón flotante, CTAs, formulario de cotización) usa la
   función `generateWhatsAppLink()` de `src/utils/whatsapp.ts`.

## Cómo preparar el deploy

1. Reemplazar `SITE.url` por el dominio real.
2. Reemplazar todos los PLACEHOLDER (datos, logo, favicon, robots.txt).
3. `npm run build` y servir `dist/` en cualquier host estático
   (Netlify, Vercel, Cloudflare Pages, GitHub Pages, hosting con Nginx...).
4. El sitemap se genera en `dist/sitemap-index.xml`; verificar robots.txt.

## Referencias

- Docs Astro: https://docs.astro.build
- Rutas dinámicas: https://docs.astro.build/en/core-concepts/routing/
- Componentes: https://docs.astro.build/en/basics/astro-components/
