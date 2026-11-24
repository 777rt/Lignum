# PROJECT_STATUS.md: Lignum

> Documento de contexto vigente.
> Estado revisado el 2026-11-23 después de cargar el contacto real, pulir accesibilidad y actualizar documentación.
> La fuente de verdad es el código, la configuración, los assets y las validaciones registradas al cierre.

---

## 1. Resumen

| Campo              | Valor vigente                                                                                |
| ------------------ | -------------------------------------------------------------------------------------------- |
| Proyecto           | Lignum, sitio estático para Construcción y Mantenciones de Espacios Verdes Limitada          |
| Naturaleza         | Marketing corporativo SSG, sin backend, CMS, base de datos ni islas de frameworks            |
| Rutas              | 12 rutas HTML más `src/pages/robots.txt.ts`                                                  |
| Fichas de servicio | 5 rutas dinámicas en `/servicios/[slug]` con fotos propias y galerías                        |
| Conversión         | Formulario a WhatsApp, WhatsApp flotante, CTA en Navbar, Footer, FinalCTA, contacto y fichas |
| Dominio            | `https://www.tudominio.cl`, provisional hasta comprar el `.cl`                               |
| Base path          | `/Lignum`, provisional hasta decidir publicación en raíz o subcarpeta                        |
| Hero               | Diseño y capas de ondas aprobados, no modificar                                              |
| Repositorio        | Git local, con CI de Playwright y workflow de deploy a GitHub Pages                          |

---

## 2. Datos de contacto confirmados

| Dato                       | Valor                                   | Fuente                                           |
| -------------------------- | --------------------------------------- | ------------------------------------------------ |
| Teléfono visible           | `+56 9 9582 0797`                       | `src/data/site.ts`                               |
| `tel:`                     | `tel:+56995820797`                      | Derivado de `SITE.phone`                         |
| WhatsApp visible y enlaces | `56995820797`                           | `SITE.whatsappNumber` y `generateWhatsAppLink()` |
| Email                      | `lignum.ltda@gmail.com`                 | `src/data/site.ts`                               |
| Instagram                  | `https://www.instagram.com/lignum_ltda` | `src/data/site.ts`                               |
| Cobertura                  | Región Metropolitana y sus alrededores  | `src/data/site.ts`                               |
| Horario                    | Lunes a Domingo, 08:00 a 19:00          | `src/data/site.ts`                               |

No quedan restos de números provisionales en `src/` ni en `tests/`. Las pruebas validan los enlaces `wa.me` y `tel:` en todas las rutas.

---

## 3. Stack y comandos

| Tecnología        | Uso                                       |
| ----------------- | ----------------------------------------- |
| Astro 7.3.6       | SSG y routing                             |
| TypeScript strict | Tipado de `.ts` y `.astro`                |
| Tailwind CSS v4   | Tokens y utilidades                       |
| GSAP              | Reveals ligeros, carga diferida           |
| Lucide            | Iconos SVG                                |
| ESLint y Prettier | Calidad y formato                         |
| Playwright        | Pruebas E2E en Chromium, Firefox y WebKit |

Comandos principales:

```bash
npm run dev
npm run format
npm run format:check
npm run lint
npm run check
npm run build
npm test -- --reporter=line
```

Con `BASE_PATH=/Lignum`, el servidor local responde en `http://localhost:4321/Lignum/`.

---

## 4. Estructura vigente

```text
src/
├── assets/
│   ├── fonts/              # Satoshi, Geist, Geist Mono
│   ├── icons/              # logo-lignum-symbol.png
│   ├── images/             # 34 imágenes web por catálogo
│   │   ├── general/
│   │   ├── desmalezado/
│   │   ├── mantencion-de-areas-verdes-y-jardines/
│   │   ├── paisajismo/
│   │   ├── podas/
│   │   └── tala-de-arboles/
│   └── videos/             # 2 MP4 por catálogo
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── ui/                 # Button, Container, SectionTitle, WhatsAppButton
│   ├── home/               # Hero, ServicesPreview, FeaturedWork, AboutPreview,
│   │                       # Testimonials, FinalCTA
│   ├── services/           # ServiceCard.astro, ServiceGrid.astro
│   ├── gallery/            # Gallery.astro, VideoGallery.astro
│   └── quote/              # QuoteForm.astro
├── data/
│   ├── site.ts             # Configuración central de la empresa
│   └── services.ts         # Catálogo, fotos, galerías e inclusiones
├── layouts/MainLayout.astro
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
├── styles/global.css
└── utils/
    ├── animation.ts
    ├── links.ts
    ├── seo.ts
    └── whatsapp.ts

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

No existen componentes `ServiceCard.tsx` ni `Gallery.tsx`. El sistema activo está en `.astro`. `Gallery.astro` usa contenedores `aspect-*` y la rama con imágenes locales usa `<Image>` con `widths` y `sizes`. La rama con `src` como texto no está en uso.

---

## 5. Rutas y servicios

Rutas HTML: `/`, `/servicios`, cinco fichas, `/trabajos`, `/nosotros`, `/contacto`, `/blog` y `/404`. El blog sigue siendo un placeholder editorial y no figura en la navegación.

Slugs activos:

- `mantencion-de-areas-verdes-y-jardines`
- `desmalezado`
- `paisajismo`
- `podas`
- `tala-de-arboles`

Las fichas usan `getStaticPaths()`, foto principal prioritaria, galería diferida y sin captions literales. Los enlaces internos pasan por `withBase` desde `src/utils/links.ts`, que es idempotente.

---

## 6. Decisiones visuales y de accesibilidad

- Hero y Footer: cuatro franjas SVG verdes orgánicas con `aria-hidden="true"` y `pointer-events-none`. El Hero está aprobado y no se modifica.
- Footer: enlace de Instagram con icono SVG, `aria-label="Instagram de Lignum"`, `target="_blank"` y `rel="noopener noreferrer"`.
- Footer: textos secundarios subidos a `text-white/80` y `text-white/75` para mejorar contraste sobre las ondas.
- FinalCTA: teléfono y texto principal con mayor contraste y foco visible.
- WhatsAppButton: posición con `env(safe-area-inset-bottom)` y foco visible.
- QuoteForm: región `role="status"` con `aria-live="polite"` para errores y confirmación de envío.
- Navbar: enlaces de WhatsApp y teléfono del panel móvil con foco visible.
- GSAP: solo reveals diferidos; sin Motion, hydration, parallax, marquee ni sticky-stack.

---

## 7. SEO

- Canonical, OG y Twitter derivados de `buildCanonicalURL()`.
- `og:image` apunta a `/Lignum/og-image.jpg`.
- JSON-LD usa `buildCanonicalURL('/')` y `buildAssetURL()` para `logo` e `image`, por lo que respeta el base path.
- Se omite `addressLocality` porque no hay dirección física confirmada. Se declaran `addressRegion: Región Metropolitana`, `addressCountry: CL` y `areaServed` desde `SITE.coverage`.
- `robots.txt` se genera en `src/pages/robots.txt.ts`. No existe `public/robots.txt`.
- Sitemap generado por `@astrojs/sitemap`.

---

## 8. Validación y pruebas

`tests/lignum.spec.ts` cubre 12 rutas con 6 pruebas por ruta más una prueba específica de enlaces de fichas: 73 pruebas por navegador. Playwright ejecuta tres proyectos: chromium, firefox y webkit.

La suite verifica:

- Carga HTTP, título, OG y contenido principal.
- Enlaces internos y externos con base path.
- Enlaces `wa.me/56995820797` y `tel:+56995820797`, sin números provisionales.
- Imágenes y videos con recursos disponibles.
- Responsive en 390, 768 y 1440 píxeles, menú móvil y foco.
- Accesibilidad básica, icono de Instagram y región activa del formulario.

Resultado de la validación final de esta tarea: ver el registro entregado al usuario al cierre de la sesión.

---

## 9. Pendientes

### Cliente

1. Comprar el dominio `.cl` definitivo.
2. Decidir si el sitio se publica en raíz con `base: '/'` o conserva `/Lignum`.
3. Aportar testimonios verificados cuando existan. No publicar citas sin autorización.

### Interno, no bloqueante

- `/blog` sigue siendo un placeholder editorial.
- Algunas fotos propias y el símbolo original quedan como referencia sin uso en la UI.
- Documentos históricos conservan snapshots antiguos con aviso de vigencia.

---

## 10. Documentos históricos

- `docs/PROJECT_AUDIT_2026.md`: auditoría de 2026-11-20. Sirve como registro histórico, con aviso de estado vigente.
- `docs/LIGHTHOUSE_AUDIT.md`: medición de Lighthouse de 2026-11-23 sobre `1f18442`. Es un snapshot, no el estado actual.
- `docs/IMAGE_AUDIT.md`: inspección visual de 2026-10-20. Conserva observaciones antiguas con aviso de vigencia.
- `docs/AUTOMATION_PLAN.md`: plan de validaciones actualizado a la suite Playwright existente.
- `docs/CLIENT_DATA_REQUIRED.md`: lista vigente de datos pendientes del cliente.
