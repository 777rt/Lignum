# PROJECT_STATUS.md — Lignum

> **Documento de handoff/contexto para IA.**
> Fuente de verdad: código + configuración + assets + validaciones verificadas el **2026-10-08**.
> No documenta lo que "debería existir": documenta lo que existe.
> Si un plan no está implementado, se indica explícitamente como **Pendiente**.

---

## 1. Información general del proyecto

| Campo         | Valor (verificado)                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Nombre        | **Lignum** (`SITE.name` y `brandLabel` en `src/data/site.ts`; `name: "lignum"` en `package.json`)                                    |
| Propósito     | Sitio web estático para una PYME de jardinería con operación en Santiago de Chile: SEO local + conversión a WhatsApp (`README.md`)   |
| Tipo de sitio | Marketing/corporativo estático (SSG), 7 páginas                                                                                      |
| Fase actual   | **Arquitectura inicial**: todo el contenido visible es provisional y está marcado como `PLACEHOLDER` (afirmación literal del README) |
| Conversión    | CTA "Solicitar cotización" → `/contacto` y WhatsApp (`wa.me`)                                                                        |
| Locale        | `es-CL`, moneda `CLP`                                                                                                                |

**Qué NO es el proyecto** (verificado en `package.json` y código):

- No tiene backend, base de datos, CMS ni framework de componentes (React/Vue/Svelte).
- No tiene e-commerce, login, ni panel de administración.
- No tiene contenido real de empresa (datos, fotos, testimonios) — todo es PLACEHOLDER.
- No tiene blog funcional (la página `/blog` es un stub "próximamente").
- **No es un repositorio git** (no hay carpeta `.git`).

---

## 2. Stack tecnológico

Versiones instaladas verificadas en `node_modules/*/package.json`:

| Tecnología                                        | Uso                                                      | Versión instalada                                            |
| ------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| Astro                                             | Framework estático (SSG)                                 | **7.3.6** (`astro.config.ts`, output `static`)               |
| Node.js                                           | Runtime                                                  | Requisito `>=22.12.0` (engines); entorno actual **v24.13.0** |
| TypeScript                                        | Tipado estricto (`astro/tsconfigs/strict`)               | 5.9.3                                                        |
| Tailwind CSS                                      | Utility-first CSS (vía plugin `@tailwindcss/vite`)       | 4.3.3                                                        |
| GSAP                                              | Animaciones (carga diferida/lazy)                        | 3.15.0                                                       |
| @lucide/astro                                     | Iconos SVG                                               | 1.52.0                                                       |
| @astrojs/sitemap                                  | Sitemap XML en build                                     | 3.7.4                                                        |
| @astrojs/check                                    | `astro check` (type-check .astro + TS)                   | 0.9.10                                                       |
| ESLint (+ eslint-plugin-astro, typescript-eslint) | Linting, `--max-warnings=0`                              | 10.12.0 / 1.7.0 / 8.71.1                                     |
| Prettier (+ prettier-plugin-astro)                | Formato (`semi: true`, `singleQuote`, `printWidth: 100`) | 3.9.9 / 1.1.0                                                |

**No hay:** React, Vue, Svelte, i18n framework, testing framework, CI (no existe `.github/`), `.env`.

**Comandos** (`package.json`):

```bash
npm run dev          # astro dev → http://localhost:4321
npm run build        # astro build → dist/
npm run preview      # previsualiza dist/
npm run check        # astro check (type-check)
npm run lint         # eslint . --max-warnings=0
npm run format       # prettier --write .
npm run format:check # prettier --check .
```

**Configuración relevante:**

- `astro.config.ts`: `site: SITE.url`, integración `sitemap()`, plugin vite `tailwindcss()`.
- `tsconfig.json`: alias `@/* → ./src/*` (usado en TODOS los imports).
- `eslint.config.js`: flat config; regla `astro/no-unused-css-selector: warn` (importante: los estilos de un componente Astro solo aplican a elementos de **su propio template** — mover estilos entre componentes genera warnings y errores).
- `AGENTS.md` / `CLAUDE.md`: el dev server se maneja con `astro dev --background` + `astro dev status|stop|logs`.

---

## 3. Arquitectura del proyecto

```text
Lignum/
├── astro.config.ts          # site=SITE.url, sitemap, tailwind vite plugin
├── tsconfig.json            # strict + alias @/*
├── eslint.config.js         # flat config, astro plugin
├── .prettierrc.json
├── package.json
├── DESIGN.md                # Fuente de verdad de diseño (445 líneas) — NO regenerar
├── README.md                # Docs del proyecto
├── AGENTS.md / CLAUDE.md    # Instrucciones de entorno/dev server
├── PROJECT_STATUS.md        # Este documento
├── preview.log / preview.err# Archivos vacíos residuales (ver §18)
├── public/
│   ├── favicon.png          # 96×96, símbolo transparente
│   ├── robots.txt           # PLACEHOLDER (dominio ficticio)
│   └── fonts/               # 4 woff2 self-hosted (Satoshi×2, Geist, Geist Mono)
├── src/
│   ├── assets/
│   │   ├── icons/           # iconlignum.jpg (original 597×597) + logo-lignum-symbol.png (262×261)
│   │   ├── images/          # 33 JPEG: 31 fotos (WhatsApp) + 2 pósters de video — 14 fotos en la UI
│   │   └── videos/          # 5 originales (WhatsApp) + 2 copias SIN audio usadas en la web
│   ├── components/
│   │   ├── layout/          # Navbar.astro, Footer.astro
│   │   ├── ui/              # Button, Container, SectionTitle, WhatsAppButton
│   │   ├── home/            # Hero, ServicesPreview, FeaturedWork, AboutPreview, Testimonials, FinalCTA
│   │   ├── services/        # ServiceCard.astro, ServiceGrid.astro  ← sistema de servicios
│   │   ├── gallery/         # Gallery.astro, VideoGallery.astro (con slots vacíos)
│   │   └── quote/           # QuoteForm.astro (formulario → WhatsApp, sin backend)
│   ├── data/
│   │   ├── site.ts          # Config central de la empresa (SITE) — fuente única
│   │   └── services.ts      # Catálogo de servicios (SERVICES) — fuente única
│   ├── layouts/MainLayout.astro  # head SEO, skip-link, Navbar, main, Footer, WhatsApp flotante, reveals
│   ├── pages/               # index, servicios/index, trabajos, nosotros, contacto, blog/index, 404
│   ├── styles/global.css    # Tailwind v4 @theme (tokens), @font-face, base, componentes compartidos, reduced-motion
│   └── utils/
│       ├── seo.ts           # buildPageTitle, buildCanonicalURL, builders JSON-LD
│       ├── whatsapp.ts      # generateWhatsAppLink, buildWhatsAppMessage, formatWhatsAppNumber
│       └── animation.ts     # loadGsap (lazy), revealOnScroll, initReveal
└── dist/                    # Build estático (gitignored)
```

**Responsabilidades clave:**

- `src/data/*` → única fuente de verdad de datos. **No duplicar** información en componentes.
- `MainLayout.astro` → único punto del `<head>` SEO y único inicializador de reveals (`initReveal`).
- `global.css` → tokens Tailwind v4 (`@theme`); deben sincronizarse con `colors` de `site.ts` (solo comentario de sincronía, no hay automatización).

---

## 4. Rutas actuales

Verificadas en build (`dist/`, 7 páginas):

| Ruta         | Archivo                       | Propósito                     | Componentes principales                                                   | Lógica especial                                                                             |
| ------------ | ----------------------------- | ----------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `/`          | `pages/index.astro`           | Portada                       | Hero, ServicesPreview, FeaturedWork, AboutPreview, Testimonials, FinalCTA | JSON-LD: Organization + WebSite + LocalBusiness                                             |
| `/servicios` | `pages/servicios/index.astro` | Índice editorial de servicios | ServiceGrid, FinalCTA, Container                                          | **Selector con hash `#slug`** (ver §11); JSON-LD: Organization + LocalBusiness + Breadcrumb |
| `/trabajos`  | `pages/trabajos.astro`        | Galería de proyectos          | Gallery (6 fotos), VideoGallery (2 videos), FinalCTA                      | Video en loop silenciado, autoreproducción por scroll                    |
| `/nosotros`  | `pages/nosotros.astro`        | Sobre la empresa              | FinalCTA + imagen real 21/9 (móvil 16/10)                                 | Copy placeholder; foto de trabajo real                                                      |
| `/contacto`  | `pages/contacto.astro`        | Contacto + cotización         | QuoteForm, botones WhatsApp/tel/email                                     | Columna sticky `lg:top-28`; canales desde `SITE`                                            |
| `/blog`      | `pages/blog/index.astro`      | Stub de blog                  | FinalCTA + image-slot                                                     | "Se implementará en etapa posterior"                                                        |
| `404`        | `pages/404.astro`             | Página no encontrada          | Button                                                                    | `noindex` (única página con `<meta name="robots">`)                                         |

- **No existen rutas dinámicas**: `src/pages/servicios/[slug].astro` **NO existe** (solo `index.astro`). README documenta su creación futura.
- El sitemap (`dist/sitemap-index.xml`) lista 6 URLs (sin 404) con dominio PLACEHOLDER `https://www.tudominio.cl`.

---

## 5. Componentes principales

### Layout

**`src/layouts/MainLayout.astro`** — único layout. Props: `title`, `description?`, `canonicalPath?`, `image?`, `type?`, `noindex?`, `schema?: JsonLd[]` (slot `head` disponible).

- `<head>`: charset, viewport, theme-color, `<title>` (`X | Lignum`), description, canonical, OG/Twitter, favicon `/favicon.png`, JSON-LD array, slot `head`.
- Inline script pre-paint en head: si **no** hay `prefers-reduced-motion`, añade clase `reveal-ready` a `<html>` (los `[data-reveal]` quedan `opacity: 0` solo entonces).
- `<body>`: skip-link "Saltar al contenido principal" → `#contenido`, `<Navbar/>`, `<main id="contenido">`, `<Footer/>`, `<WhatsAppButton/>`, script módulo que ejecuta `initReveal(document)`.

**`src/components/layout/Navbar.astro`** — ver §7.

**`src/components/layout/Footer.astro`** — footer oscuro `bg-forest-950`. 4 columnas lg: marca+descripción, columna **Servicios** (enlaces `/servicios#${slug}` por cada servicio), columna Sitio (`SITE.navigation`), columna Contacto (tel, WhatsApp, email, Instagram placeholder, horarios). Año dinámico `new Date().getFullYear()`.

**`src/components/ui/WhatsAppButton.astro`** — flotante fijo abajo-derecha (`fixed bottom-5 right-5 z-50`), enlace `wa.me` con mensaje por defecto. En mobile solo icono; ≥sm muestra texto.

### UI

- **`Button.astro`** — renderiza `<a>` si hay `href`, si no `<button>`. Variantes implementadas: `primary | secondary | outline | ghost | dark | outline-light`; sizes `sm|md|lg`. Base: `rounded-md`, `duration-fast ease-out-expo`, `active:scale-[0.995]`. `external` agrega `target="_blank" rel="noopener noreferrer"`. **No existe variante `destructive`** (DESIGN.md la menciona; no implementada).
- **`Container.astro`** — `width?: narrow (46rem) | default (1400px) | wide (1560px)`; prop `as`.
- **`SectionTitle.astro`** — eyebrow opcional + heading (h1/h2/h3) + descripción + slot; `onDark`.

### Home

- **`Hero.astro`** — foto real a sangre (`4.43.01 PM.jpeg`, 1600×1200, `loading=eager` + `fetchpriority=high`, `-z-10`) con el degradado CSS (scrim) encima. `min-h-[80svh]`. Título/lead **PLACEHOLDER**. CTAs: "Solicitar cotización" (`/contacto`) + "Ver servicios" (`/servicios`). Reveal delays 0/0.06/0.12/0.18.
- **`ServicesPreview.astro`** — lista de los 5 `SERVICES` con número mono; **cada ítem enlaza a `/servicios#${service.slug}`** (línea 31). CTA secundario "Ver todos los servicios" → `/servicios`.
- **`FeaturedWork.astro`** — `Gallery` con 3 `GalleryItem` **sin `src`** (solo alt/caption PLACEHOLDER) → renderiza placeholders.
- **`AboutPreview.astro`** — foto real `4.43.00 PM.jpeg` (podador en palmera) `aspect-[4/5]` + texto PLACEHOLDER → `/nosotros`.
- **`Testimonials.astro`** — un blockquote PLACEHOLDER centrado (sin datos de clientes).
- **`FinalCTA.astro`** — sección oscura reutilizada en `/servicios`, `/trabajos`, `/nosotros`, `/blog`. CTAs: `/contacto` + WhatsApp + tel.

### Services (ver §11)

- **`ServiceGrid.astro`** — contenedor, scripts de interacción y hash.
- **`ServiceCard.astro`** — fila+panel de cada servicio, ARIA y animación CSS.

### Gallery / Quote

- **`Gallery.astro`** — patrón cíclico de composiciones `feature (16/10) | portrait (3/4) | wide (21/9)`; con `items=[]` muestra el estado vacío con copy PLACEHOLDER. Tipo `GalleryItem` exportado.
- **`VideoGallery.astro`** — ídem para video (`<video muted loop playsinline preload="none" poster data-scroll-video>`, **sin `controls`** y sin pista de audio): script propio con IntersectionObserver que llama `play()` al entrar en pantalla y `pause()` al salir (loop nativo, sin reinicio); con `prefers-reduced-motion` no autoreproduce y habilita controles manuales. `items=[]` → estado vacío.
- **`QuoteForm.astro`** — formulario **sin backend**: validación client-side (nombre y servicio obligatorios), al enviar abre `wa.me` con el mensaje armado (`buildWhatsAppMessage`). Select de servicios poblado desde `SERVICES`. Usa clases compartidas `field-*` de `global.css`. Pista explícita: "Los datos no se guardan en ningún servidor".

---

## 6. Sistema de datos

### `src/data/site.ts` → export `SITE` (satisfies `SiteConfig`)

Consumidores: MainLayout (SEO), Navbar, Footer, FinalCTA, QuoteForm, contacto, WhatsAppButton, whatsapp.ts, seo.ts, astro.config.ts.

| Campo                    | Valor actual                                              | Estado                                                                                           |
| ------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `url`                    | `https://www.tudominio.cl`                                | **PLACEHOLDER** (alimenta canonical, sitemap, JSON-LD)                                           |
| `name` / `brandLabel`    | `Lignum`                                                  | Real (nombre del proyecto)                                                                       |
| `legalName`              | `'Razón Social o Persona Natural (PLACEHOLDER)'`          | PLACEHOLDER                                                                                      |
| `description`, `tagline` | copy con `(PLACEHOLDER)`                                  | PLACEHOLDER                                                                                      |
| `phone`                  | `+56 9 0000 0000`                                         | PLACEHOLDER                                                                                      |
| `whatsappNumber`         | `56900000000`                                             | **PLACEHOLDER — los enlaces wa.me actuales son inválidos**                                       |
| `instagram`              | `@tu-usuario-instagram`                                   | PLACEHOLDER (enlaces apuntan a `https://instagram.com` genérico)                                 |
| `email`                  | `contacto@tudominio.cl`                                   | PLACEHOLDER                                                                                      |
| `hours`                  | 08:00-18:00 / 09:00-13:00 / Cerrado                       | PLACEHOLDER                                                                                      |
| `zones`                  | Santiago Centro, Ñuñoa, Providencia, Las Condes, Vitacura | PLACEHOLDER                                                                                      |
| `navigation`             | Inicio, Servicios, Trabajos, Nosotros, Contacto, Blog     | Real (estructura del sitio)                                                                      |
| `logo`                   | `{ path: logoSymbol.src, alt: 'Logotipo de Lignum' }`     | Real (asset propio)                                                                              |
| `colors`                 | `#2F5C2D / #1F321F / #7FA87C / #F5F5F2 / #1A1916`         | Definidos; **no consumidos por componentes** (sincronía manual con `global.css`, solo comentada) |
| `themeColor`             | `#162318`                                                 | Definido                                                                                         |
| `ogImage`                | `''`                                                      | Vacío → **no se emite `<meta og:image>`**                                                        |

### `src/data/services.ts` → export `SERVICES: Service[]`

Única fuente del catálogo. Consumidores: ServiceGrid/ServiceCard, ServicesPreview, Footer, QuoteForm, página servicios.

```ts
type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string; // clave del mapa de iconos en ServiceCard
  image?: ImageMetadata; // opcional — SIN valores actuales
  imageAlt?: string; // opcional
  mainService?: boolean; // solo mantención-de-jardines
  status: 'placeholder'; // los 5
};
```

También exporta `MAIN_SERVICES` y `getServiceBySlug()` — **ambos sin consumidores** (preparados para páginas de detalle futuras).

**Datos reales vs PLACEHOLDER:** los `slug`, `name`, `icon` e `image*` (estructura) son reales/definitivos; todos los textos (`shortDescription`, `description`) llevan `(PLACEHOLDER)`; `status` marca los 5 como placeholder.

---

## 7. Navbar actual

**Estado visual único (sin JS para el aspecto visual).** Esto es intencional y verificado:

- **NO existe** scroll listener, `data-state`, `scrolled`, ni lógica de "hero transparente → sólido". El HTML/CSS pinta el estado final desde el primer paint.
- **NO usa GSAP.**
- **NO es sticky/fixed**: `<header data-navbar>` está en flujo estático (se desplaza con la página; nada queda tapado al saltar a anclas).

**Aspecto (bloque `<style>` del propio Navbar):**

```css
header[data-navbar] {
  background-color: color-mix(in srgb, var(--color-background) 88%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid color-mix(in srgb, var(--color-stone-200) 70%, transparent);
}
```

- Links: `stone-700` → hover `stone-900`; activo `aria-current='page'` → `forest-600`.
- CTA desktop: `Button variant="primary" size="sm"` → **siempre** `bg-forest-800` (no se intercambia).
- Alturas: `h-16` (64px) / `lg:h-[72px]`, `max-w-[1400px]`.

**Responsive:**

- `<lg`: links y CTA ocultos; botón burger (`aria-expanded`, `aria-controls="menu-movil"`, iconos Lucide Menu/X con `data-icono-abierto/cerrado`).
- `≥lg`: el panel móvil se cierra vía `matchMedia('(min-width: 1024px)')`.

**JS (script módulo, solo menú móvil):** toggle `abrir()/cerrar()` del panel `#menu-movil` (atributo `hidden`), cierra al clickear un link, con `Escape`, y al pasar a desktop. **Nada de esto afecta el estado visual base.**

**⚠️ Problema verificado:** `aria-current` se calcula con `pathname === link.href`, pero en build `Astro.url.pathname` es `/servicios/` (con slash final) y los hrefs son `/servicios`. Resultado verificado en `dist/`: **solo la página de inicio resalta `aria-current="page"`; las 6 subpáginas tienen 0 coincidencias**. El highlight de página activa no funciona fuera de Inicio (ver §18).

---

## 8. Logo e identidad visual

| Archivo                                          | Dimensiones verificadas | Función                                                                                 |
| ------------------------------------------------ | ----------------------- | --------------------------------------------------------------------------------------- |
| `src/assets/icons/iconlignum.jpg`                | **597×597** JPG         | Original de marca; se conserva como fuente. **No se usa en el sitio.**                  |
| `src/assets/icons/logo-lignum-symbol.png`        | **262×261** PNG         | Símbolo recortado con fondo transparente (blanco→alpha). **El logo actual.**            |
| `public/favicon.png`                             | **96×96** PNG           | Favicon (mismo símbolo, transparente)                                                   |
| ~~`public/logo.svg`~~ / ~~`public/favicon.svg`~~ | —                       | **No existen** (eliminados; `public/` solo tiene `favicon.png`, `robots.txt`, `fonts/`) |

**Conexión:** `site.ts` hace `import logoSymbol from '@/assets/icons/logo-lignum-symbol.png'` y expone `SITE.logo = { path: logoSymbol.src, alt: 'Logotipo de Lignum' }`. El asset pasa por el pipeline de Astro (hash en `/_astro/`).

**Usos de `SITE.logo.path` (verificados):**

1. `Navbar.astro` — `<img>` `h-7 w-auto lg:h-8`, `width="262" height="261"`, `loading="eager"`, junto al texto `brandLabel` "Lignum".
2. `Footer.astro` — mismo `<img>` `h-7 w-auto`, `loading="lazy"`.
3. `seo.ts` → `buildOrganizationSchema().logo` y `buildLocalBusinessSchema().image` (`new URL(SITE.logo.path, SITE.url)`).

Favicon link: `<link rel="icon" type="image/png" href="/favicon.png">` en `MainLayout.astro:55`.

---

## 9. Diseño visual

`DESIGN.md` (445 líneas) es la fuente de verdad de diseño. Estado real de implementación:

**Implementado y verificado en código:**

- **Tokens** en `global.css` `@theme` (§2–§6 de DESIGN): paleta forest/olive/sage/stone, superficies, estados (`success/warning/danger/focus`), radios `xs–2xl`, sombras tintadas al fondo `#0F1A12`, `--ease-out-expo: cubic-bezier(0.16,1,0.3,1)`, duraciones `150/200/300/500ms`.
- **Tipografía self-hosted**: Satoshi (`--font-display/heading`), Geist (`--font-sans`), Geist Mono (`--font-mono`) — 4 `.woff2` en `public/fonts/` con `font-display: swap`. Headings con tracking/line-height del DESIGN (§3.3/3.4).
- **Base**: `html { scroll-behavior: smooth }`, scrollbar tintada, `:focus-visible` ring 2px `--color-focus`, `::selection` olive, `[hidden]{display:none!important}`.
- **Componentes compartidos** (`@layer components`): `.eyebrow`, `.field-label/input/error/hint`, `.image-slot` (+`-dark`, `-label`), `.hairline`.
- **Botones**: variantes `primary/secondary/outline/ghost/dark/outline-light` alineadas a §6.1.
- **Grid**: 12 columnas lg (`lg:grid-cols-12`) en secciones; container 1400px.
- **Motion**: reveal GSAP + transiciones CSS con tokens; reduced-motion global.
- **Sombras/radii**: usados con moderación (cards sin sombra por defecto).

**Solo directriz (NO implementado):**

- **Dark mode**: `.dark` existe como bloque de tokens en `global.css` (listo para `.dark` en `<html>`), pero **no hay toggle ni componente que aplique la clase**.
- Variante `destructive` de botón: no existe.
- DESIGN menciona librería "Motion" (framer-motion style): la implementación real es **GSAP lazy + CSS transitions** (decisión del proyecto).
- Hero: DESIGN propone `min-h-[100dvh]`; el real es **`min-h-[80svh]`**.
- `VISUAL_DENSITY 4` → secciones `py-16 md:py-20` ✓ cumplido.

**Dirección estética (§1):** paisajismo chileno premium + editorial; sin "look de IA" (§11.3: sin em-dashes en UI, sin gradientes genéricos, sin glassmorphism, sin serif por defecto, eyebrows ≤1 cada 3 secciones).

---

## 10. Home (`/`)

Orden real de secciones (`pages/index.astro`):

1. **Hero** — foto real a sangre (`4.43.01 PM.jpeg`) + degradado CSS (scrim) encima. Eyebrow "Jardinería profesional en Santiago (PLACEHOLDER)", H1 PLACEHOLDER, lead PLACEHOLDER, CTAs `/contacto` + `/servicios`. Reveal escalonado.
2. **ServicesPreview** — título "Servicios" + CTA "Ver todos los servicios"; lista numerada de los 5 servicios; **cada link es `/servicios#slug`** (este es el entry-point principal al selector de servicios). Reveal por fila con delay `index * 0.05`.
3. **FeaturedWork** — "Trabajos recientes" + CTA `/trabajos`; `Gallery` con 3 items **sin imágenes** → slots placeholder.
4. **AboutPreview** — foto real `4.43.00 PM.jpeg` `4/5` (podador en palmera) + copy PLACEHOLDER + CTA `/nosotros`.
5. **Testimonials** — fondo `sage-100`, un blockquote PLACEHOLDER + "Cliente verificado (PLACEHOLDER)". Sin datos reales.
6. **FinalCTA** — fondo `forest-900`: "¿Listo para transformar tu jardín? (PLACEHOLDER)" + CTAs `/contacto`, WhatsApp, teléfono.

JSON-LD home: Organization + WebSite + LocalBusiness.

---

## 11. Sistema de servicios ⭐ (sección crítica)

### 11.1 Servicios existentes (los 5 reales, en orden de `SERVICES`)

| #   | slug                         | name                       | icon           | mainService |
| --- | ---------------------------- | -------------------------- | -------------- | ----------- |
| 01  | `mantencion-de-jardines`     | Mantención de jardines     | `sprout`       | **true**    |
| 02  | `jardineria`                 | Jardinería                 | `trees`        | —           |
| 03  | `paisajismo`                 | Paisajismo                 | `pencil-ruler` | —           |
| 04  | `podas`                      | Podas                      | `scissors`     | —           |
| 05  | `mantencion-de-areas-verdes` | Mantención de áreas verdes | `leaf`         | —           |

**No existen** otros slugs (p. ej. `#poda-tala` o `#mantencion-jardines` NO existen). El mapa de iconos de `ServiceCard` soporta además `axe`, `hammer`, `droplets`, `layers` (reserva; fallback `Sprout`).

### 11.2 Vista de Inicio → `/servicios`

- `ServicesPreview.astro:31` → `href={`/servicios#${service.slug}`}` (5 links).
- `Footer.astro:39` → mismo patrón en la columna Servicios.
- CTA "Ver todos los servicios" → `/servicios` sin hash.

### 11.3 Vista `/servicios`

- Encabezado: H1 "Servicios de jardinería en Santiago" + contador mono `05` (`SERVICES.length`).
- `ServiceGrid services={SERVICES}`: lista plana de 5 `<article>` + cierre `border-t`.
- Cada `ServiceCard` renderiza:
  - **Fila (siempre visible):** `<h3><button>` con número `01–05`, icono Lucide del servicio, nombre, e icono `Plus` a la derecha.
  - **Panel:** foto o placeholder (`aspect-[16/10]`) + `shortDescription` (`lg:grid-cols-12`, foto `col-span-7`, texto `col-span-5`). **El título NO se repite en el panel** (el título de la pieza es la fila).
- Estado inicial **sin hash**: el servicio con `mainService` (mantención) tiene `data-open` renderizado en HTML → **parte expandido sin JS**.
- Texto inferior PLACEHOLDER + `FinalCTA`.

### 11.4 Regla de estado único (implementada)

Garantizada por **una sola función** en `ServiceGrid.astro` (script módulo):

```ts
function open(target: Entry | undefined, updateHash = true): void {
  for (const entry of entries) {
    // itera los 5 items
    const abierto = entry === target; // SOLO el target
    abierto ? panel.setAttribute('data-open', '') : panel.removeAttribute('data-open');
    trigger.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  }
  // + history.replaceState con #slug o pathname
}
```

- Click en fila cerrada → `open(entry)` (abre solo esa).
- Click en fila **abierta** → `open(undefined)` → **cero abiertos** (permite cerrar todo; máx. 1 siempre).
- El pre-paint hash (abajo) también itera y deja exactamente uno con `data-open`.

### 11.5 Hash / deep linking (implementado)

Tres piezas en `ServiceGrid.astro`, en este orden exacto de ejecución:

1. **`<script is:inline>` #1 — ANTES del markup:** `document.documentElement.classList.add('selector-ready')`.
   - La clase es la gate de CSS: los paneles sin `[data-open]` solo colapsan bajo `:global(.selector-ready)`. **Sin JS la clase nunca existe → los 5 paneles quedan expandidos** (fallback progresivo deliberado).
2. **Markup** (`data-service-selector` con los 5 articles).
3. **`<script is:inline>` #2 — DESPUÉS del markup (pre-paint):** lee `location.hash`, busca `data-slug` coincidente y ajusta `data-open` + `aria-expanded` de los 5 **antes del primer pintado** y antes del salto del navegador al ancla.
4. **`<script>` módulo (TS, diferido):** bindings de click, `hashchange` → `open(entries.find(slug), /* updateHash */ false)`, y `history.replaceState` en cada click:
   - click en servicio → URL `#slug` **sin recarga y sin scroll** (`replaceState` no dispara `hashchange` ni navega).
   - cerrar todo → `replaceState(pathname+search)` (quita el hash).

**Deep linking verificado:** entrar a `/servicios#podas` abre Podas antes del primer paint. Verificado en `dist/servicios/index.html`: solo `mantencion-de-jardines-panel` lleva `data-open` por defecto; los otros 4 no.

**Slugs reales** para deep links: `#mantencion-de-jardines`, `#jardineria`, `#paisajismo`, `#podas`, `#mantencion-de-areas-verdes`.

### 11.6 Scroll

- El salto al ancla lo hace **el navegador nativamente** (hash de URL + `id={slug}` en el `<article>`); no hay JS de scroll.
- `html { scroll-behavior: smooth }` global → scroll suave nativo.
- Cada `<article>` tiene `scroll-mt-24` (offset por si el navbar fuera sticky; hoy el header es estático, no tapa nada).
- El cambio de hash por click usa `replaceState` → **no** mueve el scroll (decisión: cambiar de servicio no redirige la vista).

### 11.7 Animación de apertura/cierre (CSS puro, en `ServiceCard.astro`)

- Panel: `display: grid; grid-template-rows: 1fr` base ↔ `0fr` colapsado (regla `:global(.selector-ready) [data-service-panel]:not([data-open])`).
- Transición: `grid-template-rows 200ms var(--ease-out-expo)`.
- Columnas del panel: fade + `translateY(6px)`, **stagger 60ms** (`:nth-child(2)`), 200ms al abrir / 150ms al cerrar.
- `visibility: hidden` diferido `200ms` al cerrar → el contenido sale del árbol de a11y recién al terminar.
- Indicador: `[aria-expanded='true']` → `Plus` rota `45deg` y color `forest-600` (se ve como "×" verde).
- `prefers-reduced-motion`: override global en `global.css` (`transition-duration: 0.01ms !important`) lo colapsa.
- **Sin GSAP en este componente** (transiciones CSS; GSAP solo se usa en reveals).

### 11.8 Detalles técnicos a preservar

- Los dos scripts **son `is:inline` a propósito**: deben correr en su posición exacta durante el parse (no se empaquetan/posicionan como los scripts procesados de Astro; de hecho Astro **hoistea los scripts procesados a módulos al inicio**, por eso los inline son los que garantizan el orden pre-paint).
- Estilos del panel en `ServiceCard.astro` (no en `ServiceGrid`): el scoping de Astro impide que un componente estilice nodos de otro (moverlos genera warnings `astro/no-unused-css-selector`).
- IDs: `article id = slug`, `trigger id = {slug}-trigger`, `panel id = {slug}-panel`; `aria-controls`/`aria-labelledby` cruzados. **No duplicar ids.**
- `data-open={abierto ? '' : undefined}` renderiza `data-open` (valor vacío) solo en el abierto; el CSS usa presencia `[data-open]`, no valor.
- Hook `data-service-selector` en el contenedor (reserva; los scripts actuales consultan `[data-service-item]`).

---

## 12. Imágenes y assets

**Inventario verificado:**

| Asset                                               | Estado                                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `public/fonts/*.woff2` (4)                          | Reales — Satoshi normal/italic, Geist, Geist Mono                                           |
| `src/assets/icons/iconlignum.jpg` (597×597)         | Real — original de marca, no usado en UI                                                    |
| `src/assets/icons/logo-lignum-symbol.png` (262×261) | Real — logo en Navbar/Footer/JSON-LD                                                        |
| `public/favicon.png` (96×96)                        | Real                                                                                        |
| `src/assets/images/`                                | 33 JPEG: 31 fotos + 2 pósters de video (WhatsApp, 2026-10-08)                               |
| `src/assets/videos/`                                | 5 originales + **2 copias sin audio usadas** (`poda-palmera.mp4`, `poda-tronco-ladera.mp4`) |
| Fotos de servicios                                  | **Las 5 asignadas** en `services.ts` (`image`/`imageAlt`)                                   |
| Foto de hero                                        | **Asignada** (`4.43.01 PM.jpeg`)                                                            |
| Foto de equipo (home)                               | **Asignada** (`4.43.00 PM.jpeg`, podador)                                                   |
| Foto de equipo (`/nosotros`)                        | **Asignada** (`5.47.57 PM (9).jpeg`, banda 21/9)                                            |
| Fotos de trabajos (home/galería)                    | **6 asignadas** en `/trabajos`; `FeaturedWork` en placeholder                               |
| Videos de trabajos                                  | **2 asignados** en `/trabajos` (`VideoGallery`), sin audio                                  |

**Reparto de las 14 fotografías usadas (cada una una sola vez, sin duplicados):**

| Archivo                | Dim.      | Ubicación                             | Contenido (alt real)                                                               |
| ---------------------- | --------- | ------------------------------------- | ---------------------------------------------------------------------------------- |
| `4.43.01 PM.jpeg`      | 1600×1200 | **Hero** (home)                       | Jardín con líneas de corte junto a una pileta, una casa y montañas al fondo        |
| `4.43.00 PM.jpeg`      | 900×1600  | **AboutPreview** (home, 4/5)          | Trabajador arborizado en una palmera con equipo de seguridad y cuerda              |
| `4.43.01 PM (1).jpeg`  | 1200×1600 | `mantencion-de-jardines`              | Corte de césped en un jardín con líneas de corte, patio y un perro sobre el pasto  |
| `5.47.55 PM.jpeg`      | 1280×960  | `jardineria` _(mejorado en 2ª ronda)_ | Cantera con estrelichias y arbustos podados, con mantillo nuevo, junto a la vereda |
| `5.47.57 PM (1).jpeg`  | 1280×720  | `paisajismo` _(mejorado en 2ª ronda)_ | Sendero de piedras entre plantaciones de arbustos y gramíneas                      |
| `4.43.00 PM (1).jpeg`  | 1200×1600 | `podas`                               | Podador arborizado cortando el tronco de una palmera con motosierra                |
| `4.43.00 PM (3).jpeg`  | 1600×900  | `mantencion-de-areas-verdes`          | Área verde recién cortada con líneas de corte, un árbol y setos junto a un muro    |
| `5.47.57 PM (9).jpeg`  | 1280×960  | `/nosotros` (banda 21/9, móvil 16/10) | Trabajador instalando rollos de césped en un patio junto a la vivienda             |
| `5.47.57 PM (8).jpeg`  | 1280×960  | `/trabajos` — feature 16/10           | Trabajador instalando rollos de césped sobre el terreno junto a la terraza         |
| `5.47.57 PM (10).jpeg` | 960×1280  | `/trabajos` — portrait 3/4            | Trabajador acomodando rollos de césped junto a la vivienda                         |
| `5.47.57 PM (2).jpeg`  | 1280×960  | `/trabajos` — wide 21/9               | Jardín con césped, arbustos ornamentales y árboles junto a un muro                 |
| `4.43.00 PM (2).jpeg`  | 1600×1200 | `/trabajos` — feature 16/10           | Corte de césped junto a una pileta y la terraza de una casa                        |
| `5.47.57 PM (5).jpeg`  | 960×1280  | `/trabajos` — portrait 3/4            | Sendero de placas de hormigón entre el jardín y el portón de madera                |
| `5.47.57 PM (11).jpeg` | 1280×960  | `/trabajos` — wide 21/9               | Área verde con césped cortado junto a un muro blanco y un cerco metálico           |

**Descartadas: 17 fotos** de las 31 — repetitivas (mismo patio en varias tomas con/sin flare), mediocres
(manguera enredada, césped parcheado con mascota, neumáticos, maleza "antes", juguetes) o sin relación
con la sección (no hay foto de riego automático → `FeaturedWork` queda en placeholder). Crops
`object-cover` centrados verificados visualmente para 16/10, 3/4 y 21/9 (sujetos preservados).

Verificado: 0 duplicados (dHash par a par 23–39 de 64 bits); build emite los assets de imagen con hash.

**Reparto de video (2 de 5 archivos usados):**

| Original (WhatsApp) | Duración · peso | Copia usada (sin audio)            | Ubicación            | Razón de selección                                                           |
| ------------------- | --------------- | ---------------------------------- | -------------------- | ---------------------------------------------------------------------------- |
| `5.58.45 PM.mp4`    | 20 s · 7,2 MB   | `poda-palmera.mp4` (7,4 MB)        | `/trabajos` — Videos | Plano estable, palmera centrada y podador arborizado visible: mejor del lote |
| `5.58.40 PM.mp4`    | 70 s · 21,4 MB  | `poda-tronco-ladera.mp4` (21,9 MB) | `/trabajos` — Videos | Trabajo real con motosierra, polvo y vista de ciudad: credibilidad de poda   |

**Descartados: 3 videos** — `5.58.40 PM (1)` (6,5 s · ladera con tronco caído, sin trabajador ni plano
interesante), `5.58.41 PM` (30 s · cámara brusca, contenido ambiguo: redes/limpieza) y `5.58.42 PM`
(36,5 s · POV hacia arriba obstruido por techo y frondas, con fotogramas borrosos; `5.58.45` cubre mejor
el mismo tema). Hero y `FeaturedWork` mantienen foto: el video no mejoraba lo suficiente el Hero y
`FeaturedWork` sigue en placeholder.

**Garantía de audio:** las copias se generaron con `ffmpeg -c:v copy -an` (**0 streams de audio**, verificado
sobre los archivos emitidos en `dist/`) y el componente añade `muted`: no existe ningún control ni pista
que permita sonido. **Reproducción:** el video es el elemento visual (sin botón Play ni overlay): `muted`
+ `loop` + `playsinline` en el propio `<video>`, `preload="none"` para no descargar los mp4 al abrir la
página, y arranque/pausa según visibilidad con IntersectionObserver (`play()` al entrar, `pause()` al
salir, reanuda sin reiniciar; loop nativo). El póster JPG queda solo como respaldo de carga. Con
`prefers-reduced-motion` no se reproduce solo y se habilitan los controles nativos como alternativa
manual.

**Arquitectura preparada para fotos reales (ya funciona):**

- **Servicios:** `Service.image?: ImageMetadata` + `imageAlt?` en `services.ts`. `ServiceCard` ya renderiza `<img>` con `src/width/height/loading=lazy` si `service.image` está definido; sin él, placeholder `image-slot aspect-[16/10]`. **Para agregar una foto:** importarla en `services.ts` (`import foto from '@/assets/images/x.jpg'`) y asignar `image: foto, imageAlt: '...'`.
- **Galería:** `GalleryItem.src?` / `VideoGalleryItem.src?` — con `items=[]` muestra estado vacío; con items sin `src` muestra slot.
- **Regla del proyecto (DESIGN §8.3):** no agregar imágenes externas aleatorias; aspect ratios reservados para evitar CLS; alt obligatorio.

---

## 13. SEO

Implementado en `MainLayout` + `utils/seo.ts` (verificado en `dist/`):

| Elemento             | Estado                                                                                                                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<title>`            | `"{título}                                                                                                                                                                                     | Lignum"` (`buildPageTitle`) — verificado: `Portada (PLACEHOLDER) | Lignum` |
| `meta description`   | Por página con default `SITE.description`                                                                                                                                                      |
| `link rel=canonical` | `buildCanonicalURL` → `https://www.tudominio.cl/servicios/` (dominio PLACEHOLDER)                                                                                                              |
| Open Graph           | `og:type/site_name/locale/title/description/url` ✓; **`og:image` NO emitido** (`SITE.ogImage=''`)                                                                                              |
| Twitter card         | Emite `summary` (sin imagen); `summary_large_image` solo si hubiera ogImage                                                                                                                    |
| Sitemap              | `@astrojs/sitemap` → `dist/sitemap-index.xml` + `sitemap-0.xml` (6 URLs, dominio PLACEHOLDER)                                                                                                  |
| Robots               | `public/robots.txt` con `Sitemap: https://www.tudominio.cl/...` **PLACEHOLDER**                                                                                                                |
| `meta robots`        | Solo 404 → `noindex, nofollow`                                                                                                                                                                 |
| JSON-LD              | Builders en `seo.ts`. Conteo verificado: home **3** (Organization+WebSite+LocalBusiness), `/servicios` **3**, `/nosotros` **3**, `/contacto` `/trabajos` `/blog` **1** (Breadcrumb), 404 **0** |
| Favicon              | `/favicon.png` ✓                                                                                                                                                                               |

**Datos JSON-LD con PLACEHOLDER:** teléfono, email, dominio, `geo` genérico de Santiago (-33.4489/-70.6693), horarios hardcodeados en `buildLocalBusinessSchema` (no leen `SITE.hours`), `priceRange: '$$'`.

**No hay:** hreflang, RSS, meta keywords (innecesario), tests de SEO automatizados.

---

## 14. Responsive

- **Breakpoints** estándar Tailwind: `sm 640 / md 768 / lg 1024 / xl 1280`. Mobile-first.
- **Navbar:** burger + panel `#menu-movil` `<lg`; links+CTA en línea `≥lg`. El panel se auto-cierra al cruzar `lg`.
- **Hero:** `min-h-[80svh]`, texto escala `text-4xl sm:text-5xl lg:text-6xl`.
- **Grids editoriales:** patrón repetido `grid gap-… lg:grid-cols-12` con `col-span/col-start` (encabezados de página, home, contacto, servicios). Colapsan a 1 columna `<lg`.
- **Servicios:** filas con `gap-4 md:gap-8`, panel `lg:grid lg:grid-cols-12`; <lg el panel apila foto sobre texto.
- **Contacto:** `lg:sticky lg:top-28` en la columna de canales; formulario `sm:grid-cols-2`.
- **Formularios:** `field-input` con `min-height: 44px` (target táctil 44px).
- **Footer:** `md:grid-cols-2` → `lg:grid-cols-12`.
- **Botones:** CTA nunca envuelve texto en desktop; WhatsAppButton colapsa a icono `<sm`.

---

## 15. Animaciones

**Archivo:** `src/utils/animation.ts`

- `loadGsap()` — import dinámico de GSAP **una sola vez, bajo demanda** (la librería no se carga si no hay `[data-reveal]`).
- `revealOnScroll(el, {delay, y:24, duration:0.5})` — IntersectionObserver `threshold: 0.25`, `once` (se desconecta), GSAP `fromTo autoAlpha 0→1, y 24→0, ease 'expo.out'`. **Si `prefers-reduced-motion` → no hace nada** (contenido visible). **Si GSAP falla → fuerza `opacity:1`** (el contenido nunca queda invisible).
- `initReveal(document)` — llamado **una vez** desde `MainLayout` al final del body; procesa todos los `[data-reveal]` leyendo `data-reveal-delay`.

**Gate de estado inicial:** inline script en head de MainLayout añade `reveal-ready` a `<html>` solo si NO hay reduced-motion; CSS `.reveal-ready [data-reveal] { opacity: 0 }`. **Sin JS o con reduced-motion el contenido nace visible.**

**Animaciones existentes (todas deliberadas):**

| Dónde                                                    | Técnica                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------- |
| Reveals de secciones (todas las páginas, Hero, previews) | GSAP lazy + IntersectionObserver (`data-reveal`)                          |
| Navbar                                                   | Solo `transition` CSS de color (sin scroll animation)                     |
| Selector de servicios                                    | CSS `grid-template-rows` + fade/translate (§11.7) — **no usar GSAP aquí** |
| Botones/links/cards                                      | Transiciones CSS `duration-fast ease-out-expo`, `active:scale-[0.995]`    |
| Menú móvil                                               | Atributo `hidden` (sin animación de altura)                               |
| `prefers-reduced-motion`                                 | Override global `0.01ms !important` + gates JS                            |

**Reglas:** DESIGN §9 — solo `transform`/`opacity` (el acordeón usa `grid-template-rows` como receta sancionada de acordeones), duraciones 150/200/300/500, `expo-out`. No agregar marquee/parallax/pin sin justificación (máx. 1 cada uno).

---

## 16. Accesibilidad

**Implementado (verificado):**

- Skip-link "Saltar al contenido principal" → `#contenido` (`MainLayout`).
- Semántica: `header/nav/main/section/footer`, un `h1` por página, jerarquía H1→H2→H3 (filas de servicios en `<h3>`).
- Focus visible global `:focus-visible` (2px `--color-focus`, offset 2px).
- **Selector de servicios:** `button` real, `aria-expanded`, `aria-controls`, panel `role="region"` + `aria-labelledby`; `visibility` diferido para el árbol de a11y.
- **Menú móvil:** `aria-expanded/controls/label`, cierre con `Escape`, cierre al navegar.
- Formularios: `<label>` asociado, errores con `aria-describedby` + `aria-invalid`, foco al primer error.
- Imágenes decorativas: `aria-hidden`; `image-slot` con `aria-hidden="true"`.
- Iconos Lucide con `aria-hidden="true"`.
- Enlaces externos `rel="noopener noreferrer"`.
- `prefers-reduced-motion` respetado (CSS + JS).
- `html lang="es-CL"`.

**Pendiente/detectado:**

- `aria-current="page"` no se emite en subpáginas (bug de trailing slash, §7/§18) → inexistente feedback de página activa.
- El menú móvil no tiene trampa de foco (tab trap) ni `inert` en el contenido detrás; es un panel simple (aceptable, pero sin audit formal).
- No se ejecutó auditoría Lighthouse/axe automatizada en esta revisión.

---

## 17. Estado de validación (2026-10-08)

| Comando                                        | Resultado                                                                                      |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `npm run format:check`                         | ✅ "All matched files use Prettier code style"                                                 |
| `npm run lint` (eslint, `--max-warnings=0`)    | ✅ 0 problemas                                                                                 |
| `npm run check` (`astro check`, 33 archivos)   | ✅ **0 errors / 0 warnings / 0 hints**                                                         |
| `npm run build`                                | ✅ **7 páginas** en ~7s, sitemap generado                                                      |
| Smoke dev server (`localhost:4321`, pid 18048) | ✅ `/`, `/servicios`, `/nosotros`, `/trabajos`, `/contacto`, `/blog`, `/favicon.png` → **200** |
| `/sitemap-index.xml` en dev                    | ⚠️ No sirve en dev (esperado: solo existe tras `build` en `dist/`)                             |
| Tests unitarios/E2E                            | **No existen** (no hay framework de tests en `package.json`)                                   |
| Git                                            | **No es un repositorio git**                                                                   |

Build verificado además a nivel HTML: ids únicos de servicios, `data-open` solo en mantención por defecto, scripts inline en orden correcto (clase antes del markup, hash después), home y footer con los 5 enlaces `#slug`.

---

## 18. Problemas conocidos

### Crítico

_Ninguno que impida funcionar el sitio actualmente._

### Importante (resolver antes de producción)

1. **`aria-current` no funciona en subpáginas** — `Navbar.astro:70` compara `pathname === link.href` pero el pathname en build trae slash final (`/servicios/` vs `/servicios`). Verificado: solo `/` resalta. Arreglar con normalización (p. ej. quitar slash final a ambos lados).
2. **Todos los datos comerciales son PLACEHOLDER** — WhatsApp `56900000000` (los CTAs `wa.me` actuales no apuntan a un número real), teléfono, email, Instagram, dominio `tudominio.cl`. **El sitio no está listo para deploy real.**
3. **Sitemap y robots.txt con dominio ficticio** — deben coincidir con `SITE.url` al definir el dominio real.
4. **Sin `og:image`** — `SITE.ogImage=''`; los share a redes no tienen imagen.
5. **Fotografías pendientes** — hero, los 5 servicios, AboutPreview (home), `/nosotros` (21/9) y `/trabajos` (6 fotos + 2 videos sin audio) ya tienen material real; **sigue en placeholder** `FeaturedWork` (no hay foto de riego y sus captions son PLACEHOLDER). Además no hay foto que sea "equipo completo", solo trabajos individuales.
6. **JSON-LD con datos placeholder** — horarios hardcodeados en `seo.ts` (no leen `SITE.hours`), coordenadas genéricas.

### Menor

1. `preview.log` y `preview.err` — archivos **vacíos** residuales en la raíz (no forman parte del proyecto; candidatos a eliminar).
2. `SITE.colors` no se consume en ningún componente (solo existe el comentario de sincronía con `global.css`).
3. `MAIN_SERVICES` y `getServiceBySlug()` exportados sin consumidores (preparados para detalle futuro).
4. Dark mode: tokens `.dark` listos en CSS pero **sin toggle** (no es bug, es infraestructura no usada).
5. Enlace de Instagram apunta a `https://instagram.com` (genérico) en Footer y contacto.
6. `/blog` es un stub; no existe infraestructura de posts.
7. No hay suite de tests ni CI ni `.git` (sin control de versiones).
8. La página de servicios no tiene detalle propio (`/servicios/[slug]` no existe) — los textos `description` largos de `services.ts` no se muestran en ningún lado todavía.

---

## 19. Pendientes

**Contenido (requiere a la empresa):**

- Reemplazar TODOS los textos `(PLACEHOLDER)` (Hero, servicios, nosotros, testimonios, FinalCTA, meta descriptions…).
- Datos reales en `site.ts`: razón social, teléfono, **WhatsApp**, email, Instagram, horarios, zonas de cobertura, dominio (`url`), `ogImage`.
- Testimonios reales (hoy 1 blockquote PLACEHOLDER) y foto/datos del equipo.

**Fotografía y video:**

- ✅ Fotos: hero, 5 servicios, AboutPreview, `/nosotros` (21/9) y `/trabajos` (6 fotos).
- ✅ Videos: 2 de 5 integrados en `/trabajos` con copias sin audio + póster (§12); 3 descartados por calidad/claridad.
- Pendiente: `FeaturedWork` (captions PLACEHOLDER y falta foto de riego) y una foto de "equipo completo".
- Opcional: reemplazar fotos/videos descartados por material profesional cuando el cliente los entregue (§12 reparto).

**Funcionalidad preparada pero no implementada:**

- Páginas de detalle `/servicios/[slug].astro` (README tiene la guía; `getServiceBySlug()` ya existe).
- Blog con contenido.
- Dark mode (tokens listos, falta toggle).

**Deploy/infra (todo pendiente):**

- Dominio real → `SITE.url` + `robots.txt` + sitemap.
- Hosting estático (Netlify/Vercel/Cloudflare/Nginx — el README lo deja listo: `npm run build` → servir `dist/`).
- **Inicializar repositorio git** (hoy no hay control de versiones).
- Auditoría Lighthouse/axe y prueba real en dispositivos.

> **Prioridades sugeridas** (recomendación, no requisito): (1) git init para no perder avances; (2) bug `aria-current`; (3) datos reales de contacto/WhatsApp cuando el cliente los entregue; (4) fotografías; (5) deploy.

---

## 20. ⚠️ Reglas para futuras IAs

1. **No reconstruir la arquitectura.** Es Astro estático deliberado: sin backend, sin DB, sin CMS, sin React/Vue. No "mejorar" migrando de framework.
2. **No inventar contenido comercial.** Todo `(PLACEHOLDER)` se mantiene hasta que el cliente entregue datos reales: teléfono, WhatsApp, email, dominio, cifras, años de experiencia, clientes, testimonios, certificaciones.
3. **No eliminar los placeholders sin datos reales.** El diseño está construido alrededor de ellos (slots, copy explícito).
4. **No duplicar fuentes de datos.** `site.ts` y `services.ts` son únicos. No copiar arrays de servicios a componentes.
5. **No agregar imágenes externas/stock aleatorias.** Solo assets propios en `src/assets/` (DESIGN §8.3).
6. **Respetar `DESIGN.md`** como fuente de verdad de diseño (paleta, tipografía, radios, sombras, motion, reglas antieslopt). No regenerarlo ni contradecirlo sin motivo.
7. **Mantener el sistema de servicios**: los 5 slugs reales, hash `#slug`, **un solo servicio abierto a la vez**, pre-paint `is:inline` y gate `.selector-ready`. No convertir los scripts inline en scripts procesados (rompe el orden pre-paint) y no mover los estilos del panel fuera de `ServiceCard` (scoping de Astro).
8. **Mantener el Navbar de estado único**: sin scroll listeners, sin swap de estado/CTA; el HTML/CSS debe pintar bien desde el primer paint. Si se necesita sticky, agregarse con cuidado (revisar `scroll-mt-24` de los artículos).
9. **No romper el fallback sin JS**: `reveal-ready` y `selector-ready` son gates; sin ellos el contenido debe quedar **visible**, nunca oculto.
10. **Respetar `prefers-reduced-motion`** en cualquier animación nueva (CSS + gates JS en `animation.ts`).
11. **Mantener el logo real** (`logo-lignum-symbol.png` vía `SITE.logo`) y `favicon.png`; no reintroducir SVGs placeholder.
12. **Validar antes de declarar terminado**: `npm run format:check && npm run lint && npm run check && npm run build` (todos deben quedar en verde).
13. **No agregar librerías de animación/UI nuevas** sin necesidad (GSAP ya está y es lazy; el resto es CSS).
14. **Un H1 por página**, heading jerárquico, `aria-*` del selector de servicios intactos.
15. **Cuidado con `astro/no-unused-css-selector`** (`--max-warnings=0` hace fallar lint): al editar estilos escopados, verifica que los selectores apliquen a nodos del mismo componente.

---

## 21. Historial de cambios importantes

1. **Rediseño visual completo** siguiendo `DESIGN.md` (ruta B+E: conservar arquitectura, cambio visual profundo) — tokens Tailwind v4, tipografías self-hosted, componentes UI alineados.
2. **Navbar refactorizado a estado único** — eliminada la lógica de scroll con estados (hero transparente/contenido sólido, swap de `data-state` y de CTA); ahora un solo aspecto: fondo 88% + blur + hairline, CTA siempre `bg-forest-800`. Funciona sin JS.
3. **Integración del logo real** — generación de `logo-lignum-symbol.png` (262×261, fondo transparente) desde `iconlignum.jpg`; eliminación de los SVG placeholder (`public/logo.svg`, `public/favicon.svg` ya no existen); `SITE.logo` conectado a Navbar, Footer y JSON-LD.
4. **Favicon real** — `public/favicon.png` (96×96) enlazado desde `MainLayout` (`type="image/png"`).
5. **Branding "Lignum"** — `SITE.name`/`brandLabel` unificados en títulos (`| Lignum`), OG, copyright, Schema y aria-labels.
6. **Sistema de servicios: selector editorial con hash** — `ServiceCard`/`ServiceGrid` reescritos: filas-botón + panel foto/texto, deep linking `#slug` con pre-paint, `history.replaceState` sin recarga, único servicio expandido, animación CSS `grid-rows`, campos `image`/`imageAlt` preparados en `services.ts`.
7. **Validaciones continuas en verde** — prettier, eslint (`--max-warnings=0`), `astro check` 0/0/0, `astro build` 7 páginas, smoke de rutas en dev server.

---

## 22. 🚀 Cómo continuar

### Leer primero (en este orden)

1. **Este archivo** (`PROJECT_STATUS.md`).
2. `AGENTS.md` / `CLAUDE.md` — comandos del dev server en background.
3. `DESIGN.md` — fuente de verdad de diseño (§11.2 reglas críticas de implementación).
4. `README.md` — estructura, comandos, guías de "cómo agregar…".

### Archivos más importantes

| Para tocar…                    | Archivo                                                           |
| ------------------------------ | ----------------------------------------------------------------- |
| Datos de la empresa            | `src/data/site.ts`                                                |
| Catálogo de servicios          | `src/data/services.ts`                                            |
| Selector/acordeón de servicios | `src/components/services/ServiceGrid.astro` + `ServiceCard.astro` |
| Navbar                         | `src/components/layout/Navbar.astro`                              |
| Head SEO/JSON-LD               | `src/layouts/MainLayout.astro` + `src/utils/seo.ts`               |
| Tokens/colores/tipografía      | `src/styles/global.css`                                           |
| WhatsApp                       | `src/utils/whatsapp.ts`                                           |
| Reveals/animaciones            | `src/utils/animation.ts`                                          |

### Qué NO modificar sin entenderlo

- Los dos `<script is:inline>` de `ServiceGrid` (orden pre-paint crítico) y el gate `.selector-ready`.
- El bloque `<style>` de `ServiceCard` (scoping Astro) y los `id`/`aria-*` del selector.
- El Navbar de estado único (§7 y regla 8 de §20).
- Los gates `reveal-ready` de `MainLayout` + `global.css`.
- `DESIGN.md` (no regenerarlo).

### Tareas típicas

**Agregar una foto de servicio**

```ts
// src/data/services.ts
import paisajismoFoto from '@/assets/images/paisajismo.jpg';
// ...en el servicio:
image: paisajismoFoto,
imageAlt: 'Descripción real de la foto (obligatoria)',
```

`ServiceCard` la renderiza solo. Verificar luego: `npm run check && npm run build`.

**Modificar un servicio** — editar la entrada en `SERVICES` (`services.ts`). Slug define el ancla `#slug` y el `id` del `<article>`: si se cambia un slug, actualizar referencias (home/footer usan `service.slug` automáticamente; revisar enlaces manuales).

**Modificar el Navbar** — todo en `Navbar.astro` (estilos en su `<style>`, menú en su `<script>`). Mantener: estado visual sin JS, CTA `primary`, alturas `h-16/lg:h-[72px]`. Si se arregla `aria-current`, normalizar slashes en la comparación y verificar en build que las 6 subpáginas lo emitan.

**Agregar contenido real** — reemplazar textos `(PLACEHOLDER)` respetando la extensión aproximada del copy (el layout está equilibrado para eso); datos → solo `site.ts`. No inventar datos si el cliente no los entrega.

**Validar cambios**

```bash
npm run format      # formatea
npm run lint        # eslint, falla con cualquier warning
npm run check       # astro check (tipos)
npm run build       # build estático
# smoke manual: astro dev --background → http://localhost:4321
```

**Preparado para contenido futuro (no hay que construir esto desde cero):** slots de fotos (`.image-slot`, `Service.image`, `GalleryItem.src`), dark-mode tokens (`.dark`), export `getServiceBySlug()` + `MAIN_SERVICES`, página `/blog` (stub), campos `image`/`imageAlt` y `status` en servicios, JSON-LD builders en `seo.ts`.
