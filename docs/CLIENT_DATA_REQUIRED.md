# CLIENT_DATA_REQUIRED.md — Datos pendientes de confirmación humana

> Estado: **2 datos bloqueantes**. El resto de la información ya fue confirmada o cargada desde los assets del repositorio; no se inventaron cifras, testimonios ni coberturas adicionales.
> Cuando la empresa confirme un dato, actualizar la fuente única indicada y volver a ejecutar `npm run check`, `npm run build` y `npm test -- --project=chromium --reporter=line`.

| #   | Dato requerido                  | Estado actual                                                                                                                            | Fuente a actualizar                                                             | Por qué bloquea                                                 |
| --- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 1   | Teléfono y WhatsApp definitivos | `+56 9 0000 0000` / `56900000000`, marcados como provisionales en `src/data/site.ts`                                                     | `src/data/site.ts`                                                              | Enlaces `tel:` y `wa.me`, JSON-LD y todas las CTA de cotización |
| 2   | Dominio definitivo `.cl`        | `https://www.tudominio.cl` en `src/data/site.ts`; `https://777rt.github.io` en CI; `BASE_PATH: /Lignum` en `astro.config.ts` y workflows | `src/data/site.ts`, `.github/workflows/deploy.yml`, `astro.config.ts` si aplica | Canonical, OG, sitemap, robots y URL pública final              |

## Datos ya cargados

- Marca `Lignum` y razón social `Construcción y Mantenciones de Espacios Verdes Limitada`.
- Correo `lignum.ltda@gmail.com` y perfil `https://www.instagram.com/lignum_ltda`.
- Cobertura `Región Metropolitana y sus alrededores` y horario `Lunes a Domingo 08:00 - 19:00`.
- Cinco servicios activos con slugs, descripciones, inclusiones, fotos y fichas en `/servicios/{slug}`.
- `public/og-image.jpg` generado desde foto propia del repositorio.
- Testimonios: array vacío a propósito; no se publican citas sin autorización.

## Nota

Mientras los dos datos anteriores sigan provisionales, el sitio puede revisarse localmente pero **no debe publicarse**.
