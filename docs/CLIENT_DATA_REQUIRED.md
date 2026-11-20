# CLIENT_DATA_REQUIRED.md — Datos pendientes de confirmación humana

> Estado: **bloqueante**. Ninguno de estos valores debe inventarse ni sustituirse por ejemplos que puedan publicarse accidentalmente.
> Los valores actuales en `src/data/site.ts` y `src/data/services.ts` son provisionales y están marcados como `PLACEHOLDER`.
> Cuando la empresa confirme un dato, actualizar la fuente única correspondiente y volver a ejecutar las validaciones.

| #   | Dato requerido                       | Estado actual                                                                                                              | Fuente a actualizar                                                             | Por qué bloquea                                  |
| --- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------ |
| 1   | Nombre legal o razón social          | `Razón Social o Persona Natural (PLACEHOLDER)` (`site.ts:79`)                                                              | `src/data/site.ts`                                                              | Schema.org `Organization` / `LocalBusiness`      |
| 2   | Nombre comercial                     | `Lignum` (`site.ts:78`)                                                                                                    | `src/data/site.ts`                                                              | Confirmar que es la marca definitiva             |
| 3   | Dominio definitivo                   | `https://www.tudominio.cl` local; `https://777rt.github.io` en CI (`site.ts:77`, `deploy.yml:22`)                          | `src/data/site.ts`, `.github/workflows/deploy.yml`, `astro.config.ts` si aplica | Canonical, OG, sitemap, robots                   |
| 4   | Teléfono                             | `+56 9 0000 0000` (`site.ts:85`)                                                                                           | `src/data/site.ts`                                                              | Enlaces `tel:`, JSON-LD y contacto               |
| 5   | WhatsApp                             | `56900000000` (`site.ts:86`)                                                                                               | `src/data/site.ts`                                                              | Ruta principal de cotización (`wa.me`)           |
| 6   | Correo electrónico                   | `contacto@tudominio.cl` (`site.ts:88`)                                                                                     | `src/data/site.ts`                                                              | Enlaces `mailto:`, JSON-LD y contacto            |
| 7   | Instagram                            | `@tu-usuario-instagram`; enlace genérico a `https://instagram.com` (`site.ts:87`, `contacto.astro:43`, `Footer.astro:114`) | `src/data/site.ts`, componentes de contacto/footer                              | Perfil real de la empresa                        |
| 8   | Horarios reales                      | `08:00-18:00`, `09:00-13:00`, `Cerrado` (`site.ts:89-93`)                                                                  | `src/data/site.ts`                                                              | Texto visible y `openingHoursSpecification`      |
| 9   | Zonas de cobertura                   | Comunas de Santiago sin confirmar (`site.ts:94-100`)                                                                       | `src/data/site.ts`, `services.ts:91`                                            | `areaServed`, formulario y promesas de cobertura |
| 10  | Servicios efectivamente ofrecidos    | 5 servicios;cada uno con `status: 'placeholder'` (`services.ts:39-96`)                                                     | `src/data/services.ts`                                                          | Catálogo, CTA y claims como “todo Chile”         |
| 11  | Descripción comercial                | Texto con `(PLACEHOLDER)` (`site.ts:81`)                                                                                   | `src/data/site.ts`                                                              | `meta description`, OG, footer                   |
| 12  | Eslogan                              | `Jardinería profesional en Santiago (PLACEHOLDER)` (`site.ts:82`)                                                          | `src/data/site.ts`                                                              | Footer y posicionamiento de marca                |
| 13  | Fotografía autorizada para tala      | No existe en el repositorio; ver `IMAGE_AUDIT.md:94-106`                                                                   | `src/data/services.ts` + nuevo asset                                            | Tarjeta de tala usa slot de respaldo             |
| 14  | Material de instalación de riego     | No existe en el repositorio; ver `IMAGE_AUDIT.md:150-157` (D2)                                                             | Solo si se decide ofrecer el servicio                                           | Evita anunciar un servicio sin evidencia         |
| 15  | Testimonios autorizados              | Array vacío (`Testimonials.astro:24,27`)                                                                                   | `src/components/home/Testimonials.astro`                                        | No publicar testimonios ficticios                |
| 16  | Imagen para Open Graph               | `ogImage: ''` (`site.ts:121`)                                                                                              | `src/data/site.ts` + asset recortado ~1200×630                                  | `og:image` / `twitter:image`                     |
| 17  | Autorización de imágenes de personas | Sin confirmar; ver `IMAGE_AUDIT.md:154-156` (D3, D5)                                                                       | Revisión legal/comercial                                                        | Fotos con trabajadores y mascotas de clientes    |
| 18  | Duración y autoría de los vídeos     | No re-verificada en esta sesión (`IMAGE_AUDIT.md:157`)                                                                     | `src/pages/trabajos.astro`, assets                                              | Metadatos y decisión de compresión               |

## Decisión pendiente sobre el layout

`src/layouts/MainLayout.astro` está corrupto (4039 bytes NUL) y actualmente el build genera HTML vacío. La versión en `HEAD` es legible, pero el working tree tenía modificaciones previas en ese archivo. Se necesita confirmar la reconstrucción:

- conservar la versión de `HEAD` como base;
- reaplicar únicamente el cambio intencionado previo (si se identifica);
- añadir el filtro de metadatos pendientes.

Hasta entonces **no se debe publicar**.

## Nota

Este documento no modifica datos comerciales. Es una lista de entrada para que la empresa entregue información verificable.
