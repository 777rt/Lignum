# PROJECT_AUDIT_2026.md — Auditoría actualizada de Lignum

> Fecha: 2026-11-20.
> Alcance: repositorio completo en `C:/Users/Cristian Garrido/Desktop/Lignum`, excluyendo `.git`, `node_modules`, `dist` y `.astro`.
> Método: lectura directa de fuentes, configuración, documentación y estado Git; build de producción ejecutado para validar el impacto real.
> Esta auditoría **no modificó código**. Únicamente crea este documento. Las correcciones posteriores (Fase 3) se registran al final.
> Fuente visual de verdad: `DESIGN.md`. No se propone rediseño.

---

## 0. Estado Git y respaldo (Fase 0)

- Raíz Git verificada: `C:/Users/Cristian Garrido/Desktop/Lignum`.
- Rama: `main`, sin cambios locales respecto de `origin/main` en el historial (último commit `e77dda3 demo`, 2026-10-08).
- 32 renombres staged de fotografías: **presentes y coherentes** con el trabajo anterior.
- 12 archivos modificados sin stage: `AboutPreview.astro`, `FeaturedWork.astro`, `Hero.astro`, `ServicesPreview.astro`, `Testimonials.astro`, `Footer.astro`, `services.ts`, `MainLayout.astro`, `index.astro`, `nosotros.astro`, `trabajos.astro`, `seo.ts`.
- `docs/` aparece como no trackeado; contiene `IMAGE_AUDIT.md`. No existía `PROJECT_AUDIT_2026.md` ni `CLIENT_DATA_REQUIRED.md`.
- No se encontraron conflictos ni cambios inesperados durante el mes más allá del estado ya descrito.
- Respaldo externo creado y verificado: `C:/Users/Cristian Garrido/Desktop/Lignum_BACKUP_2026-11-20`.
  - 32/32 renombres presentes.
  - `docs/IMAGE_AUDIT.md` presente.
  - Snapshots guardados: `git-status.txt`, `git-diff.txt`, `git-diff-cached-M.txt`, `git-ls-files-s.txt`.
  - Excluidos correctamente: `.git`, `node_modules`, `dist`, `.astro`.
- No se ejecutaron `reset --hard`, `clean`, `restore`, `stash`, `add -A`, commits ni cambios de rama.

---

## 1. Hallazgos P0 — bloquean publicación

### P0-1. `MainLayout.astro` está corrupto y el HTML publicado queda vacío

- Archivo: `src/layouts/MainLayout.astro`.
- Longitud: 4039 bytes; **los 4039 bytes son `0x00`**. Git lo detecta como binario (`git diff --numstat` muestra `- -`).
- El mismo archivo corrupto ya estaba en el respaldo externo; **no fue producido por esta sesión**.
- Consecuencia verificada: `npm run build` termina correctamente, pero genera 7 páginas de exactamente 4054 bytes cada una, con 4039 bytes NUL. `dist/index.html`, `dist/404.html` y todos los HTML contendrían solo `DOCTYPE` más NUL: **sin `<head>`, sin `<title>`, sin metadatos, sin navegación, sin contenido, sin JSON-LD**.
- La versión correcta existe en `HEAD` y puede recuperarse de forma segura sin `git restore` (por ejemplo, reconstruyendo el archivo desde `git show HEAD:src/layouts/MainLayout.astro` y reaplicando únicamente los cambios intencionados del trabajo anterior). **Requiere decisión/explicititud antes de editar** porque el working tree tiene modificaciones previas en ese mismo archivo.
- Referencias: `src/pages/index.astro:2` y las otras seis páginas importan el layout.

### P0-2. Datos comerciales ficticios llegan a la conversión y a JSON-LD

- WhatsApp `56900000000` (`src/data/site.ts:86`) se usa en enlaces `wa.me` del botón flotante, navbar, footer, CTA final, contacto y formulario (`WhatsAppButton.astro:5,9`; `Navbar.astro:9,132`; `Footer.astro:9,94`; `FinalCTA.astro:8,33`; `contacto.astro:18,31,65`; `QuoteForm.astro:121,199-203`).
- Teléfono `+56 9 0000 0000`, email `contacto@tudominio.cl`, Instagram `@tu-usuario-instagram`, horarios y zonas son provisionales (`src/data/site.ts:85-100`).
- JSON-LD emite `telephone`, `email`, `addressLocality`, `areaServed` y `openingHoursSpecification` derivados de esos datos (`src/utils/seo.ts:57-64, 102-138`).
- Dominio local por defecto `https://www.tudominio.cl` (`src/data/site.ts:77`) afecta canonical, Open Graph, sitemap y robots. En CI se sobrescribe con `SITE_URL=https://777rt.github.io` (`.github/workflows/deploy.yml:22`), por lo que el sitemap de producción apunta a GitHub Pages, no al dominio definitivo.
- Bloqueante: publicar significaría enviar cotizaciones a un número inexistente. No se debe corregir inventando valores; ver `CLIENT_DATA_REQUIRED.md`.

### P0-3. Títulos y metadatos provisionales

- Cinco páginas pasan títulos con `(PLACEHOLDER)` a `MainLayout`: `/servicios` (`servicios/index.astro:26`), `/trabajos` (`trabajos.astro:82`), `/nosotros` (`nosotros.astro:22`), `/contacto` (`contacto.astro:48`) y `/blog` (`blog/index.astro:15`). `buildPageTitle` (`seo.ts:26-28`) solo concatena; no filtra marcadores.
- `/servicios` también pasa una meta description con `(PLACEHOLDER)` (`servicios/index.astro:27`). `buildMetaDescription` sí la filtra (`seo.ts:38-41`), pero el título no.
- El título por defecto de `SITE.description` también contiene `(PLACEHOLDER)` (`site.ts:81`), por lo que páginas sin `description` explícita podrían emitirlo si el filtro no se aplica en todas las rutas del layout.

---

## 2. Hallazgos P1 — funcionamiento o conversión

### P1-1. SEO local con información no verificada

- `buildOrganizationSchema` y `buildLocalBusinessSchema` usan razón social pendiente, teléfono, email, horarios y zonas no confirmados (`seo.ts:50-65, 102-139`; `site.ts:79,85-100`). No hay coordenadas ni precios inventados: eso ya está corregido y debe preservarse.
- Existe contradicción entre cobertura: `services.ts:91` afirma “todo Chile” para tala, mientras `site.ts:94-100` limita las zonas a comunas de Santiago.

### P1-2. Páginas interiores todavía son borradores visibles

- `(PLACEHOLDER)` visible en `/nosotros` (5 apariciones), `/trabajos` (3), `/contacto` (3), `/servicios` (4), `/blog` (3), `/404` (1), `QuoteForm.astro:20`, `Gallery.astro:60` y `VideoGallery.astro:32`.
- `/blog` es un stub con `image-slot` y texto “Próximamente” (`blog/index.astro:22-41`). Está en la navegación (`site.ts:107`) y en el sitemap.
- La home ya no muestra `(PLACEHOLDER)` en sus fuentes directas; las correcciones de Fase 1/2B sobre H1, FeaturedWork, testimonios y Footer se conservan.

### P1-3. Enlaces de Instagram no llevan al perfil real

- `contacto.astro:43` y `Footer.astro:114` apuntan a `https://instagram.com` genérico. Deben quedar deshabilitados o pendientes hasta recibir el perfil confirmado.
- No hay enlaces internos rotos: las 6 rutas de navegación existen y los anclas `#slug` coinciden con los ids de `ServiceCard.astro:45`.

### P1-4. Vídeo pesado pendiente de optimización

- `src/assets/videos/tala-de-arboles/poda-tronco-ladera.mp4` = **20,93 MB** (medido en disco; ~21,9 MB según auditoría previa por diferencia de unidades). `poda-palmera.mp4` = 3,52 MB.
- FFmpeg no estaba disponible en la sesión anterior; no se reintentó en esta auditoría. El comportamiento actual de `VideoGallery.astro` (`muted`, `loop`, `playsinline`, `preload="none"`, IntersectionObserver, controles solo con reduced-motion) debe preservarse.

---

## 3. Hallazgos P2 — rendimiento, SEO y accesibilidad

### P2-1. Base path `/Lignum`

- `astro.config.ts:14` mantiene `base: process.env.BASE_PATH ?? '/Lignum'`; el workflow usa `BASE_PATH=/Lignum` (`.github/workflows/deploy.yml:24`). `withBase` (`src/utils/links.ts`) y `robots.txt.ts:11` son coherentes.
- Riesgo pendiente: `src/styles/global.css:9,17,25,33` usa `url('/fonts/...')` absoluto. Con `base=/Lignum`, las fuentes podrían resolverse en la raíz del dominio en lugar de `/Lignum/fonts/...`. Debe verificarse en el HTML/CSS generado una vez reparado el layout.

### P2-2. Open Graph / Twitter incompletos

- `SITE.ogImage` está vacío (`site.ts:121`). `MainLayout` (versión HEAD) conditionalmente omite `og:image` y `twitter:image`, y usa `summary` en lugar de `summary_large_image`. Es correcto no inventar imagen, pero hay que pedirla al cliente.

### P2-3. Sitemap y robots

- La integración `@astrojs/sitemap` está activa (`astro.config.ts:3,15`) y el build generó `sitemap-index.xml` y `sitemap-0.xml`. Contienen URLs de GitHub Pages por el `SITE_URL` local/CI; son válidas solo mientras no exista dominio propio.
- `robots.txt.ts` genera `Allow: /` y `Sitemap:` consistente con `withBase`. No hay `noindex` global; la página 404 sí lo pide en su fuente (`404.astro:7`), pero no puede verificarse en el HTML corrupto actual.

### P2-4. Accesibilidad

- `Navbar.astro` tiene `aria-expanded`, `aria-controls` y cierre con Escape (`:98-100,155-194`), pero no devuelve el foco al botón al cerrar y no implementa trap de foco. Los enlaces móviles no exponen `aria-current` (`:112-121` vs `:77`).
- `VideoGallery.astro:41-52` no ofrece control manual de reproducción si el autoplay se bloquea; solo añade `controls` con `prefers-reduced-motion` (`:80-86`). No hay subtítulos (`<track>`).
- `QuoteForm.astro` usa `novalidate` (`:14`) y errores con `hidden` (`:38,73`); el JS inserta texto y `aria-invalid` sin `role="alert"`/`aria-live` (`:128-145`). Sí enfoca el primer error (`:179-184`).
- `contacto.astro:90` oculta las etiquetas de canal en móvil; el nombre accesible queda reducido al valor.
- `WhatsAppButton.astro:13` es flotante `fixed bottom-5 right-5` sin `safe-area-inset-bottom`.
- `Gallery.astro:70-76` no declara `width`/`height`, mitigado por contenedores `aspect-*`.
- Textos dentro de `aria-hidden="true"` en slots visuales (`Gallery.astro:55-57`, `blog/index.astro:37-41`, `ServiceCard.astro:94-99`).
- Los `alt` presentes y los iconos decorativos con `aria-hidden` están correctos en el código fuente revisado.

### P2-5. Calidad de datos e imágenes

- `IMAGE_AUDIT.md` sigue siendo válido para tala sin foto, `ogImage` vacío, blog stub y vídeo pesado, pero **está desactualizado** en `FeaturedWork`: `:78` y `:110` afirman que tiene 3 slots sin imagen y menciona riego automático; el código actual usa 3 fotografías reales y captions sin riego (`FeaturedWork.astro:2-4,18-37`).
- No hay fotografía confirmada para tala de árboles; `ServiceCard.astro:93-99` mantiene el slot de respaldo, que es la decisión correcta hasta recibir material.
- No hay material de instalación de riego; ya no se menciona en la home.

---

## 4. Hallazgos P3 — mejoras opcionales

- P3-1: Recodificar `poda-tronco-ladera.mp4` a H.264 CRF ~26–28, ≤1280 px, `+faststart`, sin audio; objetivo ≤8 MB. Noinstalar FFmpeg sin autorización.
- P3-2: Alinear `poda-palmera.mp4` a <2 MB si se considera necesario.
- P3-3: Declarar anchos de imagen y calidad (~75–80) en `astro.config.ts` solo con justificación y smoke test; no hacerlo en esta fase.
- P3-4: Revisar en dispositivo real la reproducción móvil de vídeos y el botón flotante con `safe-area`.
- P3-5: Añadir `aria-current` en navegación y foco al cerrar el menú móvil.

---

## 5. Validaciones ejecutadas

| Validación                                                        | Resultado                                                                                            |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `git rev-parse --show-toplevel`                                   | `C:/Users/Cristian Garrido/Desktop/Lignum`                                                           |
| `git status`, `git branch --show-current`, `git log --oneline -5` | 32 renames staged + 12 modifications unstaged + `docs/` untracked; rama `main`; 2 commits            |
| `git diff --stat`, `git diff --cached --stat -M`                  | 12 archivos modificados; 32 renames sin cambios de contenido                                         |
| Inspección de NUL en fuentes                                      | Solo `src/layouts/MainLayout.astro`: 4039/4039 bytes NUL                                             |
| `npm run build`                                                   | Éxito de Astro, 7 páginas generadas, pero HTML inválido por NUL                                      |
| Revisión de enlaces internos                                      | Sin enlaces rotos; `/blog` es stub                                                                   |
| Revisión de rutas base `/Lignum`                                  | Coherente en config, workflow, links y robots; fuentes CSS reescritas a `/Lignum/fonts/` en el build |
| Tamaños de vídeo                                                  | 20,93 MB y 3,52 MB medidos en disco                                                                  |
| Respaldo externo                                                  | Verificado: 32/32 renombres, docs y snapshots; exclusiones correctas                                 |

---

## 6. Resolución de Fase 3 (posterior a la auditoría)

Con autorización explícita del usuario:

- `src/layouts/MainLayout.astro` se reconstruyó desde `HEAD` y se conservó en el respaldo una copia del archivo corrupto (`MainLayout.astro.corrupt-evidence`) y de la versión `HEAD` (`MainLayout.astro.from-HEAD`).
- Se añadió filtrado de metadatos: `buildMetaDescription` se aplica a `description`, `og:description` y `twitter:description`; `estaPendiente(title)` evita títulos con `(PLACEHOLDER)`. No se inventó texto comercial.
- Se quitó `(PLACEHOLDER)` de los `title` de `/servicios`, `/trabajos`, `/nosotros`, `/contacto` y `/blog`, conservando los títulos reales ya presentes.
- Verificación posterior: `npm run build` genera 7 HTML válidos (17–39 KB, 0 bytes NUL), con `<title>` limpio, canonical con `/Lignum/`, 0 `(PLACEHOLDER)` en `<head>` y 0 descripción en las páginas cuyo texto es provisional. Las fuentes CSS se emiten como `/Lignum/fonts/...`.
- `npm run check`: 0 errores, 0 warnings. `npm run lint`: sin errores. `npm run format:check`: conforme tras formatear los 3 documentos nuevos.

## 7. Conclusión

El proyecto **sigue sin estar listo para publicar** por los datos comerciales ficticios (P0-2) y los textos provisionales visibles en páginas interiores (P1-2). El bloqueo técnico del layout quedó resuelto y verificado. No se debe publicar hasta que la empresa confirme los datos de `CLIENT_DATA_REQUIRED.md`. La arquitectura, el diseño y el trabajo anterior se conservaron; no se hizo commit ni deploy.
