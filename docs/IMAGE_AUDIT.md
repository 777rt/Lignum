# IMAGE_AUDIT.md — Auditoría visual de activos (Fase 2A)

> **Alcance:** documento de solo lectura. No se modificó código, configuración, estilos ni activos.
> **Fecha de inspección:** 2026-10-20.
> **Método:** inspección visual directa de cada fotografía y póster con herramienta de lectura de imágenes; vídeos revisados por metadatos de archivo y por los fotogramas de sus pósters + documentación previa en `PROJECT_STATUS.md` §12 (`ffprobe` no está disponible en este entorno, por lo que duraciones/codecs de vídeo no se re-verificaron en esta ronda).
> **Estado del repositorio al auditar:** los activos ya usan nombres descriptivos (p. ej. `mantencion-cesped-cortacesped-piscina.jpeg`); no existe ningún archivo `WhatsApp Image…` en el árbol de trabajo.

---

## 1. Inventario de activos

### 1.1 Fotografías — `src/assets/images/` (32 JPEG + 2 pósters)

Dimensiones verificadas con `System.Drawing`; peso en disco verificado con el sistema de archivos.

| Archivo actual                                 | Dim.      | Peso   | Contenido visual identificado (inspección directa)                                                           | Uso actual                                      | Recomendación                                                                    |
| ---------------------------------------------- | --------- | ------ | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- | -------------------------------------------------------------------------------- |
| `jardin-residencial-piscina-montanas.jpeg`     | 1600×1200 | 563 KB | Jardín con césped recién cortado (líneas), pileta, casa moderna y montañas nevadas a contraluz               | Hero (home)                                     | **Mantener.** Mejor encuadre editorial del set; apto portada                     |
| `poda-palmera-arbolista-altura.jpeg`           | 900×1600  | 388 KB | Arborista trepando una palmera con arnés, cuerda y motosierra al cinto, junto a una casa                     | AboutPreview (home)                             | **Mantener.** Transmite equipo y seguridad                                       |
| `poda-palmera-motosierra-tronco.jpeg`          | 1200×1600 | 622 KB | Primer plano del podador en el tronco de la palmera con motosierra elevada, sujeto con cuerdas               | Tarjeta `podas`                                 | **Mantener.** Representa poda en altura sin ambigüedad                           |
| `mantencion-cesped-cortacesped-piscina.jpeg`   | 1600×1200 | 534 KB | Cortacésped autopropulsado sobre césped cortado junto a pileta y terraza                                     | Tarjeta `mantencion-de-áreas-verdes-y-jardines` | **Mantener.** Representa mantención de forma inequívoca                          |
| `mantencion-area-verde-lineas-corte.jpeg`      | 1600×900  | 566 KB | Área verde amplia recién cortada con líneas, cama de arbustos, árbol y muro                                  | Galería `/trabajos` (21/9)                      | **Mantener.** Buena para franja ancha                                            |
| `desmalezado-desbrozadora-cesped.jpeg`         | 720×1280  | 219 KB | Trabajador operando desbrozadora sobre césped alto; cortacésped y soplador en primer plano                   | Tarjeta `Desmalezado`                           | **Mantener** (única vertical del servicio). Ver duda D4 sobre resolución         |
| `paisajismo-sendero-piedras.jpeg`              | 1280×720  | 293 KB | Sendero de piedras redondas entre plantaciones de arbustos y gramíneas junto a una vivienda de ladrillo      | Tarjeta `paisajismo`                            | **Mantener.** Composición con intención de diseño                                |
| `instalacion-cesped-rollos-trabajador.jpeg`    | 1280×960  | 350 KB | Trabajador instalando rollos de césped sobre suelo preparado, junto a terraza y cerco                        | Galería `/trabajos` (16/10)                     | **Mantener.** Proceso real reconocible                                           |
| `instalacion-cesped-rollos-vivienda.jpeg`      | 960×1280  | 359 KB | Trabajador de rodillas acomodando rollos; rollos en fila y vivienda blanca al fondo                          | Galería `/trabajos` (3/4)                       | **Mantener.**                                                                    |
| `instalacion-cesped-rollos-patio.jpeg`         | 1280×960  | 367 KB | Toma amplia de la instalación de césped: trabajador de pie con rollos y casa con terraza                     | `/nosotros` (banda 21/9)                        | **Mantener.** Buen contenido "trabajo en curso"                                  |
| `resultado-instalacion-cesped.jpeg`            | 1280×960  | 283 KB | Césped recién instalado junto a muro blanco, cerco metálico y piscina                                        | Galería `/trabajos` (21/9)                      | **Mantener.** Resultado final                                                    |
| `mantencion-cesped-pov-corte-perro.jpeg`       | 1200×1600 | 576 KB | Vista en primera persona empujando cortacésped; perro tendido sobre el césped cortado, casa blanca y piscina | Sin uso                                         | **Candidata a `/trabajos` o FeaturedWork** (proceso de corte, ritmo vertical)    |
| `jardin-cesped-cortado-perros.jpeg`            | 1200×1600 | 668 KB | Jardín residencial con césped cortado y dos perros de pelaje claro                                           | Galería `/trabajos` (3/4)                       | **Mantener.** Resultado de mantención (confirmar uso comercial de perros, D3)    |
| `jardineria-limpieza-cantera-estrelicias.jpeg` | 1280×960  | 338 KB | Cantera de estrelichias con tierra nueva, arbustos recién podados y soplador de hojas                        | Galería `/trabajos` (16/10)                     | **Mantener.** Jardinería/limpieza reconocible                                    |
| `jardineria-cantera-limpia-clivo.jpeg`         | 960×1280  | 370 KB | Cantera limpiada con clivos y verbena; suelo despejado de malezas                                            | Sin uso                                         | Reserva jardinería (variante vertical)                                           |
| `paisajismo-sendero-piedras-vertical.jpeg`     | 720×1280  | 274 KB | Mismo sendero de piedras en vertical, con riego por goteo visible al margen                                  | Sin uso                                         | Reserva paisajismo; baja resolución (720 px de ancho)                            |
| `preparacion-terreno-suelo-preparado.jpeg`     | 1280×720  | 221 KB | Patio completamente rastrillado a tierra, pala, bolsa de sustrato; cerco de piscina                          | Sin uso                                         | Reserva: preparación de suelo (posible antes/después con instalación de césped)  |
| `preparacion-terreno-area-amplia.jpeg`         | 1280×720  | 240 KB | Área grande igualmente preparada a tierra, con árboles existentes y piscina                                  | Sin uso                                         | Reserva: preparación de suelo                                                    |
| `desmalezado-malezas-desbrozadora.jpeg`        | 960×1280  | 327 KB | Maleza alta con desbrozadora y cortacésped dejados sobre el pasto                                            | Sin uso                                         | Reserva "antes con maquinaria" para desmalezado                                  |
| `desmalezado-malezas-caseta.jpeg`              | 960×1280  | 320 KB | Maleza junto a caseta verde y escalera; desbrozadora al margen                                               | Sin uso                                         | Reserva antes/después                                                            |
| `desmalezado-malezas-altas-muro.jpeg`          | 960×1280  | 374 KB | Maleza alta esparse contra muro blanco, con arbusto plateado                                                 | Sin uso                                         | Reserva antes/después                                                            |
| `desmalezado-residuos-retirados.jpeg`          | 1280×960  | 385 KB | Pilas de maleza retirada apiladas contra muro tras la limpieza                                               | Sin uso                                         | Reserva: resultado de desmalezado (residuos listos para retiro)                  |
| `limpieza-camino-placas-residuos.jpeg`         | 960×1280  | 366 KB | Camino de placas con escoba y bolsas verdes de residuos vegetales; portón de madera                          | Sin uso                                         | Reserva: limpieza/retiro de residuos                                             |
| `patio-posterior-arboles-cesped.jpeg`          | 720×1280  | 215 KB | Patio trasero con frutales, arbusto seco y gato; estado regular                                              | Sin uso                                         | Descartar de la web (calidad/composición débiles); conservar en reposo           |
| `patio-malezas-manguera-enredada.jpeg`         | 720×1280  | 310 KB | Rincón con manguera enredada y maleza; estado "antes" poco atractivo                                         | Sin uso                                         | Descartar de la web                                                              |
| `patio-citrico-cesped-arbustos.jpeg`           | 1280×960  | 364 KB | Patio con limonero, arbustos y césped irregular; carrete de madera                                           | Sin uso                                         | Descartar de la web (tozo, sin trabajo demostrable)                              |
| `patio-citrico-cesped-contraluz.jpeg`          | 1280×960  | 386 KB | Mismo patio con contraluz fuerte y flare                                                                     | Sin uso                                         | Descartar (duplicado pobre del anterior, flare)                                  |
| `patio-lateral-cesped-seco.jpeg`               | 960×1280  | 342 KB | Pasillo lateral con césped seco, manguera y macetero                                                         | Sin uso                                         | Descartar de la web                                                              |
| `cesped-desparejo-neumaticos.jpeg`             | 1280×960  | 340 KB | Césped desparejo con montón de neumáticos                                                                    | Sin uso                                         | Descartar (neumáticos restan calidad de marca)                                   |
| `cesped-desparejo-rastrillo.jpeg`              | 1280×960  | 370 KB | Céspeari desparejo con rastrillo y neumáticos                                                                | Sin uso                                         | Descartar                                                                        |
| `malezas-flores-moradas-muro.jpeg`             | 960×1280  | 381 KB | Maleza con flores moradas contra muro                                                                        | Sin uso                                         | Descartar (sin trabajo en curso ni resultado)                                    |
| `video-poda-palmera-poster.jpg`                | 832×464   | 85 KB  | Fotograma POV: motosierra sobre tronco de palmera, trabajador abajo                                          | Póster vídeo `/trabajos`                        | **Mantener.** Resolución suficiente para `aspect-video`                          |
| `video-poda-tronco-ladera-poster.jpg`          | 960×540   | 80 KB  | Fotograma: tronco de palmera derribado en ladera con podador cortándolo; vista de ciudad                     | Póster vídeo `/trabajos`                        | **Mantener** como póster. Ver duda D1 si se evalúa para tarjeta de tala (960 px) |

### 1.2 Vídeos — `src/assets/videos/`

| Archivo                  | Peso        | Duración (documentada, no re-verificada)   | Contenido                                                                                              | Uso actual                 |
| ------------------------ | ----------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------ | -------------------------- |
| `poda-palmera.mp4`       | 3,7 MB      | ~19 s (`PROJECT_STATUS.md`)                | POV del podador en lo alto: motosierra sobre el tronco de la palmera; re-codificada sin pista de audio | `/trabajos` — VideoGallery |
| `poda-tronco-ladera.mp4` | **21,9 MB** | no documentada con exactitud para la copia | Corte con motosierra de un tronco de palmera derribado en una ladera con vista de ciudad; sin audio    | `/trabajos` — VideoGallery |

### 1.3 Otros — `src/assets/icons/`, `public/`

| Archivo                    | Dim./peso      | Uso                                       |
| -------------------------- | -------------- | ----------------------------------------- |
| `logo-lignum-symbol.png`   | 262×261 / —    | Navbar, Footer, JSON-LD (vía `SITE.logo`) |
| `iconlignum.jpg`           | 597×597 / —    | Original de marca, sin uso en UI          |
| `public/favicon.png`       | 96×96 / 7,7 KB | Favicon                                   |
| `public/fonts/*.woff2` (4) | — / 23–43 KB   | Tipografías self-hosted                   |

No hay imágenes en `public/` además de favicon.

---

## 2. Estado de integración (mapa sección → recurso)

| Sección / servicio                               | Recurso actual                                                                    | Estado                                                                                                       |
| ------------------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Hero (home)                                      | `jardin-residencial-piscina-montanas.jpeg`                                        | Integrado (archivo ajeno a esta terminal: `Hero.astro`)                                                      |
| AboutPreview (home)                              | `poda-palmera-arbolista-altura.jpeg`                                              | Integrado (archivo ajeno: `AboutPreview.astro`)                                                              |
| FeaturedWork (home)                              | — (3 items sin `src`, copy PLACEHOLDER, uno menciona "riego automático")          | **Placeholder** (`FeaturedWork.astro`; consumido por `index.astro`, ajeno)                                   |
| Servicios: mantención de áreas verdes y jardines | `mantencion-cesped-cortacesped-piscina.jpeg`                                      | Integrado en `src/data/services.ts`                                                                          |
| Servicios: Desmalezado                           | `desmalezado-desbrozadora-cesped.jpeg`                                            | Integrado                                                                                                    |
| Servicios: Paisajismo                            | `paisajismo-sendero-piedras.jpeg`                                                 | Integrado                                                                                                    |
| Servicios: Podas                                 | `poda-palmera-motosierra-tronco.jpeg`                                             | Integrado                                                                                                    |
| Servicios: **Tala de árboles**                   | **Sin imagen** (renderiza `image-slot` de respaldo en `ServiceCard.astro`)        | **Pendiente — ver §4**                                                                                       |
| `/trabajos` fotos                                | 6 imágenes (instalación ×2, área verde, jardinería, jardín con perros, resultado) | Integrado en `src/pages/trabajos.astro`                                                                      |
| `/trabajos` vídeos                               | 2 MP4 + 2 pósters                                                                 | Integrado; autoplay silencioso + loop + `preload="none"` + IntersectionObserver (comportamiento a preservar) |
| `/nosotros`                                      | `instalacion-cesped-rollos-patio.jpeg` (banda 21/9)                               | Integrado en `src/pages/nosotros.astro`                                                                      |
| `/blog`                                          | `image-slot` placeholder                                                          | Placeholder aceptado (página stub)                                                                           |
| `SITE.ogImage`                                   | `''` → no se emite `og:image`                                                     | **Placeholder** (`src/data/site.ts`)                                                                         |

---

## 3. Prioridad: sustitución de placeholders y candidatas a Tala de árboles

### 3.1 Placeholder crítico — servicio `Tala-de-árboles`

**No existe en el repositorio ninguna fotografía que muestre tala, derribo, troncos talados ni extracción de un árbol.** Se inspeccionaron las 32 fotos una a una; todo el material de palmeras corresponde a **poda en altura** (árbol en pie) o a la instalación/jardinería de patios.

Candidatas evaluadas (y por qué no se auto-asignan):

| Candidata                                       | Por qué queda descartada como asignación automática                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `video-poda-tronco-ladera-poster.jpg` (960×540) | Muestra un tronco **derribado** en ladera siendo cortado: es la única evidencia "tipo tala" del set. Pero (a) es fotograma de vídeo de baja resolución, (b) el vídeo ya se muestra en `/trabajos` como poda/corte, (c) asignarla a la tarjeta de tala excede la certeza visual (podría tratarse de una poda con derribo controlado). **Requiere confirmación humana (D1).** |
| `poda-palmera-motosierra-tronco.jpeg`           | Árbol en pie; es poda, no tala. Ya está correctamente en la tarjeta `podas`.                                                                                                                                                                                                                                                                                                |
| Cualquier foto de jardín/cesped                 | No hay relación demostrable con tala. No asignar.                                                                                                                                                                                                                                                                                                                           |

**Recomendación:** solicitar al cliente 1–2 fotografías propias de tala real (tronco en el suelo, tala con motosierra desde el suelo, retirada de restos). Hasta entonces, mantener el `image-slot` de respaldo ya implementado en `ServiceCard.astro` (cumple DESIGN §8.3: layout resiliente sin imagen).

### 3.2 Otros placeholders

- **FeaturedWork (home):** 3 slots sin foto; un caption menciona instalación de riego y **no hay ninguna foto ni vídeo de riego automático** en el repositorio. Alternativas: (a) reasignar los 3 captions a servicios con foto real (mantención, instalación de césped, jardinería) usando `mantencion-cesped-pov-corte-perro.jpeg`, `resultado-instalacion-cesped.jpeg` y `jardineria-limpieza-cantera-estrelicias.jpeg` (o variantes), o (b) dejar el placeholder hasta material profesional. No inventar riego.
- **`SITE.ogImage`:** candidatos naturales (recorte 1200×630): `jardin-residencial-piscina-montanas.jpeg` o `mantencion-area-verde-lineas-corte.jpeg`. Hoy no se genera ningún `og:image`.

---

## 4. Duplicados, baja calidad y peso

- **Duplicados:** 0 duplicados byte a byte. Existen pares del mismo escenario (p. ej. `patio-citrico-cesped-arbustos` / `…-contraluz`; `preparacion-terreno-*` ×2; `desmalezado-malezas-*` ×3) que funcionan como "antes/después" o tomas gemelas; solo el segundo patio cítrico es redundante por flare.
- **Peso fotográfico:** todos los JPEG están entre 215 KB y 668 KB (adecuado; Astro re-codifica en el build a WebP/AVIF). Ningún archivo "demasiado pesado" para fotos.
- **Peso de vídeo:** `poda-tronco-ladera.mp4` = **21,9 MB** es el activo crítico (≈6× el otro vídeo). `poda-palmera.mp4` = 3,7 MB es aceptable.
- **Baja resolución relativa:** `desmalezado-desbrozadora-cesped.jpeg` y `paisajismo-sendero-piedras-vertical.jpeg` (720 px de ancho) y los pósters (832/960 px) — suficientes para su uso actual en tarjeta/póster, pero no para bandas a pantalla completa.

---

## 5. Recomendaciones de optimización (compatibles con Astro, sin tocar config en esta fase)

1. **Pipeline existente ya es correcto:** todas las fotos se importan como módulos (`@/assets/images/…`) y se renderizan con `<img src={img.src} width height loading decoding>`; Astro emite variantes con hash en `/_astro/`. No migrar a rutas públicas.
2. **`loading`/prioridad:** ya adecuado (hero `eager` + `fetchpriority="high"`; resto `lazy`). Preservar.
3. **Anchos de servicio:** si se ajusta `astro.config.ts` en fase de implementación, declarar `image.experimentalResponsiveWidths` o `service.config.widths` acorde a los slots reales (tarjeta 16/10 ~700 px útiles, galería ~800 px, hero ~1600 px) para limitar el número de variantes generadas.
4. **Calidad:** valorar `image.quality` ~75–80 para balance visual/peso; no bajar de 70 (fotografía natural, textura de follaje — DESIGN §8.1).
5. **Pósters de vídeo:** se sirven ya optimizados (≤85 KB); no tocar.
6. **No pre-comprimir fuentes JPEG** por debajo de su resolución actual: se conservan como máster.
7. **Alt texts:** los `imageAlt` actuales describen el contenido real verificado; mantener esa regla en incorporaciones futuras (DESIGN §8.3 "Alt obligatorio").

---

## 6. Vídeos: reproducción móvil y compresión

**Comportamiento actual a preservar** (`VideoGallery.astro`): `<video muted loop playsinline preload="none" poster>` sin `controls`, sin pista de audio, arranque/pausa por IntersectionObserver; con `prefers-reduced-motion` no autoreproduce y habilita controles. Esto ya es compatible con iOS/Android (autoproducción solo con `muted` + `playsinline`).

Recomendaciones P3:

| Vídeo                              | Acción propuesta                                                                                                                                                                     | Archivos implicados                                                                                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `poda-tronco-ladera.mp4` (21,9 MB) | Re-codificar H.264 (CRF ~26–28, preset slow), escala máx. 1280 px de ancho, `+faststart`, sin audio (verificar 0 streams). Objetivo ≤ 8 MB sin pérdida perceptible en `aspect-video` | `src/assets/videos/poda-tronco-ladera.mp4` (sustitución del archivo en fase de implementación), `src/pages/trabajos.astro` (sin cambio de ruta si se reemplaza in place) |
| `poda-palmera.mp4` (3,7 MB)        | Opcional: alinear a 24–30 fps y máx. 720–832 px si se desea < 2 MB                                                                                                                   | ídem                                                                                                                                                                     |
| Ambos                              | Mantener pósters; verificar tras recodificar que sigan siendo fotogramas representativos (regenerar póster si cambia el primer fotograma útil)                                       | `video-poda-*-poster.jpg`                                                                                                                                                |

---

## 7. Dudas que requieren confirmación humana

- **D1 (tala):** ¿Existe material propio de tala/derribo no entregado aún? ¿Se autoriza usar un fotograma de `poda-tronco-ladera` como foto del servicio de tala pese a la baja resolución y al solapamiento con la galería?
- **D2 (riego):** ¿Hay fotos/videos de instalación de riego automático? FeaturedWork menciona ese servicio sin material.
- **D3 (perros):** ¿Es aceptable comercialmente mostrar mascotas de clientes (`jardin-cesped-cortado-perros`, `mantencion-cesped-pov-corte-perro`)?
- **D4 (vertical de desmalezado):** la única foto del servicio tiene 720 px de ancho; ¿se acepta en la tarjeta 16/10 (recorte `object-cover`) o se prefiere esperar material de mayor resolución?
- **D5 (cursores humanos/rostros):** las fotos de instalación de césped muestran trabajadores parcialmente identificables; ¿hay autorización de imagen?
- **D6 (duración exacta):** duración del MP4 `poda-tronco-ladera.mp4` no re-verificada (`ffprobe` ausente); confirmar antes de calcular tiempos de precarga o stories.

---

## 8. Plan de implementación priorizado (para fase posterior)

> Ninguna tarea de este plan se ejecutó. Dependencias marcadas entre paréntesis.

### P0 — Errores visuales / activos incorrectos

1. **Servicio de tala sin foto pertinente** → esperar/confirmar material del cliente (D1); no reasignar fotos de otros servicios. _Archivos futuros:_ `src/data/services.ts`. _(Bloqueada por D1.)_
2. **Auditar tras la otra terminal** que Hero/`index`/AboutPreview no hayan introducido imágenes discordantes. _Archivos ajenos:_ `Hero.astro`, `index.astro`, `AboutPreview.astro`. _(Depende de que la primera terminal finalice.)_

### P1 — Reemplazar placeholders con fotografías reales

3. **FeaturedWork (home):** asignar 3 fotos reales con captions honestos (mantención, instalación de césped, jardinería) o retirar la mención a riego. _Archivos:_ `src/components/home/FeaturedWork.astro`; verificar impacto en `src/pages/index.astro` (ajeno, coordinar). _(Depende de P0-2 / otra terminal.)_
4. **`SITE.ogImage`:** apuntar a una imagen propia (ver §3.2). _Archivos:_ `src/data/site.ts`, verificación en `src/utils/seo.ts`/`MainLayout.astro` (sin cambios esperados).
5. **Página `/blog`:** solo si se implementa el stub con contenido; hoy el `image-slot` es correcto.

### P2 — Optimización de imágenes

6. Ajustar anchos/calidad del servicio de imágenes de Astro (§5.3–5.4). _Archivo:_ `astro.config.ts` (+ smoke de build).
7. Verificar tamaños LCP en el hero tras cualquier cambio (mantener `fetchpriority="high"`).

### P3 — Vídeos y extras

8. Recodificar `poda-tronco-ladera.mp4` (§6). _Archivo:_ `src/assets/videos/poda-tronco-ladera.mp4`.
9. Evaluar recorte de la rama de `mantencion-cesped-pov-corte-perro` si se integra en galería 16/10 (object-position).
10. Revisar en dispositivo real la reproducción móvil de ambos vídeos (autoplay solo con `muted`+`playsinline`, ya implementado).

---

## 9. Nota de cobertura de inspección

- **Fotografías inspeccionadas visualmente: 32/32** (+ 2 pósters de vídeo).
- **Vídeos "inspeccionados": 0/2 en reproducción** (sin `ffprobe` ni reproductor en este entorno). El contenido se afirmó a partir de sus pósters fotograma y de la documentación verificada en `PROJECT_STATUS.md` §12; no se afirma haber reproducido los MP4 en esta auditoría.
- Ningún archivo de código fuente, configuración o activo fue modificado por esta auditoría. El único archivo nuevo es `docs/IMAGE_AUDIT.md`.
