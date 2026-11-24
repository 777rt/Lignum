# CLIENT_DATA_REQUIRED.md: datos pendientes de confirmación humana

> Estado vigente: teléfono y WhatsApp ya confirmados y cargados. Quedan dos decisiones de publicación y una incorporación futura opcional.
> No se inventan dominios, testimonios, cifras ni precios.

## Resuelto

| Dato                | Valor cargado                                         | Fuente                                                                               |
| ------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Teléfono y WhatsApp | `+56 9 9582 0797`, dígitos `56995820797`              | `src/data/site.ts`                                                                   |
| Enlaces generados   | `wa.me/56995820797`, `tel:+56995820797`               | `src/utils/whatsapp.ts`, Navbar, Footer, FinalCTA, contacto, fichas y botón flotante |
| Datos comerciales   | Razón social, email, Instagram, cobertura y horario   | `src/data/site.ts`                                                                   |
| Contenido           | Cinco fichas de servicio con fotos propias y galerías | `src/data/services.ts`, `src/pages/servicios/[slug].astro`                           |

## Pendiente de cliente

| #   | Dato requerido           | Estado actual                                                        | Fuente a actualizar                                                             | Impacto                                                           |
| --- | ------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 1   | Dominio `.cl` definitivo | `https://www.tudominio.cl` en local; `https://777rt.github.io` en CI | `src/data/site.ts`, `.github/workflows/deploy.yml`, `astro.config.ts` si aplica | Canonical, OG, sitemap, robots y URL pública final                |
| 2   | Decisión de base path    | `BASE_PATH: /Lignum` provisional                                     | `astro.config.ts` y workflows                                                   | Determina `base: '/'` o mantener `base: '/Lignum'` tras la compra |
| 3   | Testimonios verificados  | Array vacío a propósito en `src/components/home/Testimonials.astro`  | `src/components/home/Testimonials.astro`                                        | Solo cuando el cliente entregue citas autorizadas                 |

## No bloqueante

- `/blog` es un placeholder editorial y no figura en la navegación.
- Algunas fotos propias y el símbolo original se conservan como referencia sin uso en la UI.

## Antes de publicar

Una vez confirmados dominio y base path:

```bash
npm run format:check
npm run lint
npm run check
npm run build
npm test -- --reporter=line
```

El sitio puede revisarse localmente con los datos actuales. La publicación queda sujeta a la compra del dominio y a la decisión de base path.
