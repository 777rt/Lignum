# AUTOMATION_PLAN.md — Plan de validaciones (Fase 5)

> No se instalaron dependencias ni se modificaron scripts en esta fase.
> Todo lo propuesto usa lo ya presente en `package.json` o Node/Astro.
> Estado: **plan**. Ninguna comprobación de esta lista se ha integrado todavía en CI.

## 1. Inventario actual

Scripts existentes (`package.json:8-18`):

| Script                    | Comando                                     | Uso en el plan        |
| ------------------------- | ------------------------------------------- | --------------------- |
| `format` / `format:check` | `prettier --write .` / `prettier --check .` | Formato               |
| `lint` / `lint:fix`       | `eslint . --max-warnings=0`                 | Calidad               |
| `check`                   | `astro check`                               | Tipado `.astro` + TS  |
| `build`                   | `astro build`                               | Build estático        |
| `preview`                 | `astro preview`                             | Smoke test de `dist/` |

Dependencias disponibles: Astro 7, `@astrojs/check`, `@astrojs/sitemap`, ESLint 10 + `eslint-plugin-astro` + `typescript-eslint`, Prettier 3 + `prettier-plugin-astro`, Tailwind v4, GSAP y Lucide.
No hay Playwright, axe, Lighthouse ni framework de tests. Workflow actual: `.github/workflows/deploy.yml` (solo build + deploy).

## 2. Validaciones prioritarias

### P0-1. Integridad del layout y del HTML generado

- [ ] Verificar que `src/layouts/MainLayout.astro` no contenga bytes NUL y sea texto UTF-8 válido.
- [ ] Verificar que cada HTML de `dist/` tenga `<html lang>`, `<head>`, `<title>`, `<meta charset>`, `<meta name="viewport">` y contenido principal.
- [ ] Fallar el CI si algún HTML contiene el carácter NUL o si el tamaño es sospechosamente uniforme (~4 KB en todas las páginas).
- Justificación: es el fallo crítico detectado en esta sesión; `npm run build` solo no lo detecta.

### P0-2. Meta descriptions y placeholders

- [ ] Recorrer `dist/**/*.html` y fallar si aparece `(PLACEHOLDER)` en `<title>`, `meta[name=description]`, `meta[property^=og:]`, `meta[name^=twitter:]` o JSON-LD.
- [ ] Fallar si una página pública no tiene `<title>` no vacío.
- [ ] Advertir (no fallar inicialmente) si una página no tiene meta description; es preferible a publicar un borrador.
- [ ] Comprobar que `buildMetaDescription` sigue filtrando descripciones con marcador (`src/utils/seo.ts:38-41`).

### P1-1. Enlaces internos y base path

- [ ] Extraer `href` internos de `dist/**/*.html` y verificar que el archivo de destino existe en `dist/` (considerando `base: /Lignum`).
- [ ] Verificar que los `href` del inicio, navbar y footer empiecen por `/Lignum/` en producción local con `BASE_PATH=/Lignum`.
- [ ] Comprobar `dist/robots.txt` y `dist/sitemap-index.xml`: la URL del sitemap debe incluir `/Lignum/`.
- [ ] Verificar que no haya `/fonts/...` absolutos en CSS generado sin el prefijo `/Lignum/` (`src/styles/global.css:9,17,25,33`).

### P1-2. Imágenes y vídeos

- [ ] Verificar que todo `src`/`srcset` local de `dist` resuelva a un archivo existente.
- [ ] Verificar atributos `alt` en todas las imágenes decorativas y de contenido.
- [ ] Comprobar `width`/`height` o `aspect-*` contenedor para evitar CLS.
- [ ] Verificar que los pósters y MP4 referenciados por `VideoGallery` existan en `dist/_astro/`.
- [ ] Advertir si `poda-tronco-ladera.mp4` supera un umbral acordado (hoy 20,93 MB).

### P2-1. Calidad y tipos

- [ ] `npm run format:check`
- [ ] `npm run lint`
- [ ] `npm run check`
- [ ] `npm run build`
- Nota: `lint` usa `--max-warnings=0`; la regla `astro/no-unused-css-selector: warn` puede hacerlo fallar. No se cambiará la configuración sin justificación.

### P2-2. Accesibilidad básica (sin dependencias nuevas)

- [ ] Comprobar en HTML generado: un solo `<h1>` por página, orden de encabezados razonable, `lang`, `alt`, botones con nombre accesible, enlaces con texto no vacío.
- [ ] Verificar que el skip link apunte a un `id` existente (`#contenido`).
- [ ] Verificar que los elementos interactivos del menú móvil conserven `aria-expanded`/`aria-controls`.
- Nota: para auditoría completa (axe/Lighthouse) se requeriría nueva dependencia; no instalar sin autorización.

### P2-3. Navegación responsive y Playwright

- [ ] Si Playwright está disponible en el entorno de CI: recorrer las 6 rutas principales en viewport móvil (390×844) y escritorio (1280×800), comprobando que no haya errores de consola, que el menú móvil abra/cierre y que el CTA de WhatsApp tenga `href` válido.
- [ ] Si no está disponible: documentar el blockage y mantener la comprobación manual como alternativa temporal. **No instalar Playwright sin autorización.**

## 3. Propuesta de implementación (sin ejecutar aún)

Cuando se autorice, implementar como un script de Node puro en `scripts/audit.mjs` (sin dependencias nuevas) y un workflow separado `validate.yml` que ejecute:

```text
npm ci
npm run format:check
npm run lint
npm run check
npm run build
node scripts/audit.mjs
```

El script `audit.mjs` implementaría los puntos P0-1, P0-2, P1-1, P1-2 y P2-2. Las comprobaciones de formato/lint/check/build ya existen y no requieren cambios de `package.json`: se invocarían directamente.

## 4. Justificación de no cambios

- No se añaden dependencias: el entorno ya tiene Prettier, ESLint, Astro check y sitemap.
- No se modifica `package.json`: los scripts actuales son suficientes para invocar el nuevo script de Node.
- No se modifica `.github/workflows/deploy.yml`: se propone un workflow de validación independiente para no alterar el despliegue actual.
