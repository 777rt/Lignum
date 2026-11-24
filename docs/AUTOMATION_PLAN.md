# AUTOMATION_PLAN.md: automatización vigente de Lignum

> Estado vigente: 2026-11-23.
> Este archivo describe la automatización real del repositorio. Los documentos históricos conservan planes antiguos solo como registro.
> El Hero está aprobado y no debe modificarse.

## Objetivo

Mantener el sitio estático de Lignum libre de enlaces rotos, placeholders de contacto, regresiones visuales y fallos de accesibilidad antes de cada deploy.

## Fuente de verdad

| Dato o decisión                                           | Archivo                 |
| --------------------------------------------------------- | ----------------------- |
| Teléfono, WhatsApp, email, Instagram, cobertura y horario | `src/data/site.ts`      |
| Enlaces y mensajes de WhatsApp                            | `src/utils/whatsapp.ts` |
| Catálogo, fotos y galerías                                | `src/data/services.ts`  |
| Base path y sitemap                                       | `astro.config.ts`       |
| Canonical, OG y JSON-LD                                   | `src/utils/seo.ts`      |
| Estilo visual aprobado                                    | `DESIGN.md`             |
| Estado general                                            | `PROJECT_STATUS.md`     |
| Validación E2E                                            | `tests/lignum.spec.ts`  |

La automatización no debe inventar dominios, testimonios, cifras ni precios. El número confirmado es `+56 9 9582 0797`, con dígitos `56995820797`.

## Etapa 0: chequeo local rápido

Ejecutar antes de cualquier commit:

```bash
npm run format:check
npm run lint
npm run check
npm run build
npm test -- --reporter=line
```

`npm test` usa `playwright.config.ts`, que define tres proyectos: `chromium`, `firefox` y `webkit`. El `webServer` ejecuta `npm run preview -- --host 127.0.0.1 --port 4331` sobre `dist/`.

## Etapa 1: compilación

`npm run build` valida que:

- Todas las rutas estáticas y `robots.txt.ts` compilen con `BASE_PATH=/Lignum`.
- Las cinco fichas de `/servicios/[slug]` generen sus páginas desde `getStaticPaths()`.
- Las imágenes de `src/assets/` se optimicen sin errores.
- `withBase()` mantenga los enlaces internos dentro de `/Lignum`.
- El sitemap y los JSON-LD usen URLs base-aware.

## Etapa 2: suite Playwright

`tests/lignum.spec.ts` ejecuta 73 pruebas por navegador: 6 comprobaciones para cada una de las 12 rutas más una prueba específica de enlaces de fichas.

Cobertura por ruta:

1. Carga HTTP, título y metadatos Open Graph.
2. Render del contenido principal.
3. Enlaces internos y externos con base path.
4. Enlaces `wa.me/56995820797` y `tel:+56995820797`, sin números provisionales.
5. Imágenes y videos disponibles, con atributos de accesibilidad y atributos de media.
6. Responsive en 390, 768 y 1440 píxeles, menú móvil y foco visible.
7. Accesibilidad básica, icono de Instagram en Footer y región activa en `QuoteForm`.

La plantilla residual `tests/example.spec.ts` fue eliminada y se quitó su `testIgnore` de `playwright.config.ts`.

## Etapa 3: CI

| Workflow               | Archivo                            | Función                                                                                                                                                      |
| ---------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Playwright Tests       | `.github/workflows/playwright.yml` | Instala dependencias, instala los tres navegadores, compila y ejecuta `npm test` en push y PR a `main` o `master`. Sube `playwright-report/` como artefacto. |
| Deploy to GitHub Pages | `.github/workflows/deploy.yml`     | Compila con `SITE_URL=https://777rt.github.io` y `BASE_PATH=/Lignum`, luego publica `dist/`.                                                                 |

El deploy sigue siendo provisional hasta comprar el dominio `.cl` y decidir si `base` será `'/'` o `'/Lignum'`. Cuando eso ocurra, actualizar `src/data/site.ts`, `astro.config.ts` y `.github/workflows/deploy.yml` en conjunto.

## Etapa 4: checklist antes de publicar

- Sin formatos de prueba con bloques de ceros ni números provisionales en `src/` ni `tests/`.
- Sin `placeholder` de contacto en el HTML compilado.
- Todos los `wa.me` usan `56995820797` y llevan texto.
- Todos los `tel:` usan `+56995820797`.
- El Footer expone `Instagram de Lignum` como enlace accesible.
- `QuoteForm` expone un mensaje con `role="status"` y `aria-live="polite"`.
- El botón flotante de WhatsApp respeta `env(safe-area-inset-bottom)`.
- El Hero conserva sus ondas verdes aprobadas y sus capas sin cambios.
- `npm run format:check`, `npm run lint`, `npm run check`, `npm run build` y `npm test -- --reporter=line` pasan.
- El dominio y la base path finales están decididos.

## Mantenimiento

Después de cambiar contacto, catálogo, rutas, imágenes o decisiones de base path:

1. Actualizar la fuente de verdad correspondiente.
2. Actualizar `README.md`, `CLAUDE.md`, `PROJECT_STATUS.md` y este archivo.
3. Revisar `docs/CLIENT_DATA_REQUIRED.md` si el cambio depende del cliente.
4. Ejecutar la Etapa 0.
5. Hacer commit local con mensaje descriptivo. No hacer push ni deploy sin autorización explícita.
