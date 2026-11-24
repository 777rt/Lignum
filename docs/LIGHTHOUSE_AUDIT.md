# LIGHTHOUSE_AUDIT.md ? L?nea base Lighthouse (Fase 8)

> **Alcance:** auditor?a de solo medici?n y documentaci?n. No se modific? c?digo, configuraci?n, estilos, assets, tests ni dependencias del proyecto.
> **Fecha de ejecuci?n:** 2026-11-23 (ejecuci?n local secuencial).
> **Commit auditado:** `1f18442 perf(media): optimiza video poda-tronco-ladera, limpia fuentes y mejora a11y` (sobre `dist/` generado con `npm run build`).

**Estado vigente:** esta medición corresponde al commit `1f18442` y no al estado actual. Después se cargaron los datos reales de contacto, se ajustaron canonical y JSON-LD al base path y se actualizaron accesibilidad y pruebas. El Healthy de Lighthouse puede diferir. La validación vigente es la suite de Playwright en `tests/lignum.spec.ts` y los datos en `PROJECT_STATUS.md`.

## 1. Metodolog?a y entorno real

| Par?metro         | Valor                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| Herramienta       | Lighthouse **13.6.0** ejecutado v?a `npx --yes lighthouse@13.6.0`                                                     |
| Navegador         | Chromium de Playwright: `C:\Users\Cristian Garrido\AppData\Local\ms-playwright\chromium-1255\chrome-win64\chrome.exe` |
| Servidor          | `astro preview --host 127.0.0.1 --port 4331` servido desde `dist/` (build de producci?n)                              |
| Base path         | `/Lignum/`                                                                                                            |
| Modo de ejecuci?n | **Secuencial, 1 corrida a la vez** (sin paralelismo)                                                                  |
| Categor?as        | `performance, accessibility, best-practices, seo`                                                                     |
| Corridas          | 10 totales: 5 rutas ? 2 modos (mobile + desktop)                                                                      |
| Flags Chrome      | `--headless=new --no-sandbox`                                                                                         |
| Mobile            | `--form-factor=mobile --screenEmulation.mobile` (emulaci?n Lighthouse mobile por defecto)                             |
| Desktop           | `--preset=desktop`                                                                                                    |
| Salida cruda      | JSON fuera del repo: `C:\Users\CRISTI~1\AppData\Local\Temp\opencode\lighthouse\*.json`                                |

Rutas auditadas:

- Inicio (`/`) ? `http://127.0.0.1:4331/Lignum/`
- Servicios (`/servicios`) ? `http://127.0.0.1:4331/Lignum/servicios`
- Trabajos (`/trabajos`) ? `http://127.0.0.1:4331/Lignum/trabajos`
- Nosotros (`/nosotros`) ? `http://127.0.0.1:4331/Lignum/nosotros`
- Contacto (`/contacto`) ? `http://127.0.0.1:4331/Lignum/contacto`

> **Nota:** Las m?tricas son de **laboratorio local** (Lighthouse) y no representan datos de campo/CrUX. INP no se obtiene como m?trica de campo en esta corrida de laboratorio; Lighthouse report? `interaction-to-next-paint` como no aplicable (`n/a`) en los JSON.

## 2. Resultados por p?gina y modo

| P?gina                   |       Modo | Performance | Accessibility | Best Practices | SEO |
| ------------------------ | ---------: | ----------: | ------------: | -------------: | --: |
| Inicio (`/`)             |      M?vil |          60 |           100 |            100 | 100 |
| Inicio (`/`)             | Escritorio |          95 |           100 |            100 | 100 |
| Servicios (`/servicios`) |      M?vil |          75 |           100 |            100 |  92 |
| Servicios (`/servicios`) | Escritorio |          97 |           100 |            100 |  92 |
| Trabajos (`/trabajos`)   |      M?vil |          65 |           100 |            100 |  92 |
| Trabajos (`/trabajos`)   | Escritorio |          93 |           100 |            100 |  92 |
| Nosotros (`/nosotros`)   |      M?vil |          80 |           100 |            100 |  92 |
| Nosotros (`/nosotros`)   | Escritorio |         100 |           100 |            100 |  92 |
| Contacto (`/contacto`)   |      M?vil |          88 |           100 |            100 |  92 |
| Contacto (`/contacto`)   | Escritorio |          99 |           100 |            100 |  92 |

## 3. M?tricas de laboratorio detalladas

| P?gina                   |       Modo |    FCP |    LCP |   CLS |    TBT | Speed Index |     TTI | INP |
| ------------------------ | ---------: | -----: | -----: | ----: | -----: | ----------: | ------: | --: |
| Inicio (`/`)             |      M?vil | 797 ms | 9.12 s | 0.000 | 596 ms |      2.01 s |  9.53 s | n/a |
| Inicio (`/`)             | Escritorio | 305 ms | 1.55 s | 0.000 |   0 ms |      616 ms |  1.61 s | n/a |
| Servicios (`/servicios`) |      M?vil | 1.12 s | 7.46 s | 0.000 | 112 ms |      1.56 s |  7.72 s | n/a |
| Servicios (`/servicios`) | Escritorio | 243 ms | 1.32 s | 0.014 |  18 ms |      514 ms |  1.37 s | n/a |
| Trabajos (`/trabajos`)   |      M?vil | 782 ms | 9.95 s | 0.000 | 408 ms |      1.36 s | 10.28 s | n/a |
| Trabajos (`/trabajos`)   | Escritorio | 315 ms | 1.72 s | 0.000 |  49 ms |      794 ms |  1.78 s | n/a |
| Nosotros (`/nosotros`)   |      M?vil | 965 ms | 3.78 s | 0.000 | 385 ms |      1.26 s |  3.78 s | n/a |
| Nosotros (`/nosotros`)   | Escritorio | 263 ms | 782 ms | 0.000 |   0 ms |      532 ms |  782 ms | n/a |
| Contacto (`/contacto`)   |      M?vil | 775 ms | 2.06 s | 0.033 | 459 ms |      1.23 s |  2.06 s | n/a |
| Contacto (`/contacto`)   | Escritorio | 281 ms | 459 ms | 0.031 | 103 ms |      659 ms |  513 ms | n/a |

**Lectura r?pida:** Performance m?vil cae principalmente en Inicio (60), Trabajos (65) y Servicios (75) por LCP alto en emulaci?n m?vil con throttling. Accesibilidad y Best Practices salen en 100 en las 10 corridas. SEO es 100 solo en Inicio y 92 en el resto por falta de `meta description`.

## 4. Hallazgos cr?ticos e importantes

### Cr?ticos / alto impacto

1. **LCP m?vil elevado en p?ginas con imagen hero grande**: Inicio 9.12 s, Trabajos 9.95 s, Servicios 7.46 s, Nosotros 3.78 s, Contacto 2.06 s. En Inicio, el LCP detectado por insight es la imagen hero `jardin-residencial-piscina-montanas.*.jpeg` (descubrible en HTML, con `fetchpriority=high` y sin lazy-load; la demora principal est? en render delay/resource load bajo throttling m?vil).
2. **Peso de transferencia en Trabajos m?vil**: auditor?a `total-byte-weight` con score 0.5 y ?Total size was 2,832 KiB?. Los mayores contribuyentes de imagen en la entrega observada incluyen `jardin-cesped-cortado-perros.*.jpeg`, `mantencion-area-verde-lineas-corte.*.jpeg`, `instalacion-cesped-rollos-vivienda.*.jpeg` y p?sters de video. El video optimizado `poda-tronco-ladera` no apareci? como descarga forzada por `preload="none"`, pero su presencia/uso debe vigilarse en flujos reales.
3. **`meta-description` ausente en 4 rutas**: Servicios, Trabajos, Nosotros y Contacto obtienen SEO 92 por fallo `meta-description` (Inicio tiene meta description, score 1).

### Importantes / medios

4. **TBT m?vil no nulo** en Inicio (596 ms), Contacto (459 ms), Trabajos (408 ms), Nosotros (385 ms), Servicios (112 ms). En escritorio TBT es bajo/0 salvo Contacto (103 ms). Indica costo de JS/main-thread bajo emulaci?n m?vil.
5. **CLS generalmente bien controlado**, con valores peque?os en escritorio (Contacto 0.031, Servicios 0.014, resto ~0.000) y m?vil casi 0; no es el problema principal.
6. **Oportunidades de entrega de imagen** (`image-delivery-insight`): en Inicio m?vil se estimaron ~712 KiB de ahorro potencial (hero, foto AboutPreview y logo PNG); en Trabajos m?vil ~129 KiB (p?sters y logo). Son estimaciones de Lighthouse, no cambios aplicados.
7. **Logo PNG raster** (`logo-lignum-symbol.*.png`, ~43.5 KB) aparece con ahorro estimado alto por formato/tama?o; conviene evaluar SVG/optimizaci?n en una fase de implementaci?n.

## 5. Desglose de recursos que m?s pesan / impactan

| Recurso observado                                                                   | Contexto         | Observaci?n                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/_astro/jardin-residencial-piscina-montanas.*.jpeg`                                | Inicio m?vil LCP | Imagen hero LCP; Lighthouse estim? ~413 KiB de ahorro potencial en entrega responsive/formato seg?n insight.                                                                                                             |
| `/_astro/poda-palmera-arbolista-altura.*.jpeg`                                      | Inicio m?vil     | ~388 KB transferidos; ahorro estimado ~256 KiB.                                                                                                                                                                          |
| `/_astro/jardin-cesped-cortado-perros.*.jpeg`                                       | Trabajos m?vil   | Entre los mayores bytes transferidos.                                                                                                                                                                                    |
| `/_astro/mantencion-area-verde-lineas-corte.*.jpeg`                                 | Trabajos m?vil   | Entre los mayores bytes transferidos.                                                                                                                                                                                    |
| `/_astro/instalacion-cesped-rollos-vivienda.*.jpeg`                                 | Trabajos m?vil   | Entre los mayores bytes transferidos.                                                                                                                                                                                    |
| `/_astro/video-poda-palmera-poster.*.jpg` / `video-poda-tronco-ladera-poster.*.jpg` | Trabajos         | P?sters presentes; ahorro estimado moderado por delivery.                                                                                                                                                                |
| `/_astro/poda-tronco-ladera.*.mp4`                                                  | Trabajos / asset | **Optimizado en commit actual a 7,847,086 B (~7.48 MB)**, H.264 High, yuv420p, faststart, sin audio. Con `preload="none"` no debe descargarse en carga inicial; validar en campo/RUM que no impacte LCP o consumo m?vil. |
| `/_astro/logo-lignum-symbol.*.png`                                                  | Global           | ~43.5 KB; Lighthouse estim? ahorro fuerte por formato/tama?o.                                                                                                                                                            |
| JS/CSS                                                                              | Global           | No se observaron fallos de minificaci?n/compresi?n; main-thread m?vil es el costo relevante (TBT/mainthread-work-breakdown).                                                                                             |

## 6. Recomendaciones priorizadas (Impacto / Dificultad)

| Prioridad | Recomendaci?n                                                              | Impacto    | Dificultad | Detalle                                                                                                                                                        |
| --------- | -------------------------------------------------------------------------- | ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1        | Agregar `meta description` real en Servicios, Trabajos, Nosotros, Contacto | Medio      | Baja       | Corrige fallo SEO repetido (92?potencial 100) sin tocar contenido comercial inventado; usar copy existente/aprobado.                                           |
| P1        | Revisar estrategia LCP m?vil del hero                                      | Alto       | Media      | Mantener `fetchpriority`/discoverability; evaluar dimensiones/responsive widths, calidad, y variante m?vil m?s liviana del hero. No sacrificar calidad visual. |
| P1        | Optimizar peso de im?genes en Trabajos                                     | Alto       | Media      | Revisar `sizes`, widths generadas y compresi?n de fotos grandes; priorizar las que Lighthouse identific? como mayores bytes.                                   |
| P2        | Reemplazar logo PNG por SVG optimizado o PNG mejor dimensionado            | Medio      | Baja-Media | Reduce bytes y mejora delivery; validar nitidez en navbar/footer/favicon seg?n uso.                                                                            |
| P2        | Reducir costo JS en m?vil                                                  | Medio      | Media      | Auditar hidrataci?n/islands, GSAP y scripts; medir TBT/long tasks tras cambios.                                                                                |
| P2        | Definir pol?tica para video pesado                                         | Medio      | Media      | Mantener `preload="none"` y poster; considerar versi?n corta/lighter para m?vil o carga por interacci?n expl?cita si m?tricas de campo lo justifican.          |
| P3        | Validar SEO social                                                         | Bajo-Medio | Baja       | `og:image` sigue ausente/placeholder seg?n auditor?as previas; agregar cuando haya imagen aprobada 1200x630.                                                   |

## 7. Limitaciones del entorno

- **Laboratorio local, no campo:** No hay CrUX/RUM. Resultados sensibles a CPU/disco/antivirus/carga de la m?quina Windows.
- **Emulaci?n Lighthouse:** Mobile usa emulaci?n y throttling de Lighthouse; no sustituye pruebas en dispositivos reales.
- **Preview local:** Servido por `astro preview` en `127.0.0.1:4331`; no incluye CDN, TLS real, cabeceras de producci?n ni latencia geogr?fica real.
- **Datos PLACEHOLDER:** El sitio contiene datos comerciales/contacto placeholders; no se modificaron. Esto puede afectar percepci?n, pero la auditor?a t?cnica se ejecut? igual.
- **`og:image` ausente / testimonios vac?os / foto tala pendiente:** Limitaciones de contenido ya conocidas; no bloquean la medici?n, pero s? la calidad SEO/social y conversi?n.
- **Video optimizado:** `poda-tronco-ladera.mp4` baj? a ~7.48 MB, pero sigue siendo pesado para redes m?viles; se mitig? con `preload="none"`.
- **Variabilidad:** Una sola corrida por ruta/modo. Para decisiones finas, repetir 3-5 corridas y tomar mediana.

## 8. Evidencia

- JSON crudos: `C:\Users\CRISTI~1\AppData\Local\Temp\opencode\lighthouse\` (`home/servicios/trabajos/nosotros/contacto` ? `mobile/desktop`).
- Resumen extra?do: `C:\Users\CRISTI~1\AppData\Local\Temp\opencode\lighthouse\summary.json`.
- Hallazgos extra?dos: `C:\Users\CRISTI~1\AppData\Local\Temp\opencode\lighthouse\details.json`.
