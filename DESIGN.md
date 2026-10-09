# DESIGN.md — Lignum

**Proyecto:** Lignum  
**Dirección de diseño:** Paisajismo chileno premium + naturaleza moderna + diseño editorial  
**Registro:** Estándar, elegante y profesional  
**Ruta:** B+E (Rediseño conservando arquitectura, cambio visual profundo)

## 1. Principios de diseño

### 1.1 Concepto central

Lignum transmite la calidad profesional del paisajismo chileno: orden, precisión, solidez y respeto por la naturaleza. Se busca una estética moderna y editorial que evite lo decorativo innecesario, priorizando legibilidad, claridad y jerarquía.

### 1.2 Principios rectores

- **Naturaleza con intención.** No decorativo por impulso. Cada elemento cumple una función.
- **Premium sin ostentación.** Sobriedad cuidada, acabados limpios y proporciones precisas.
- **Editorial.** Espaciado generoso, ritmo tipográfico controlado y composición asimétrica con equilibrio.
- **Técnico y profesional.** Transmite confianza para un servicio de jardinería, mantención y paisajismo en Santiago de Chile.
- **Cercanía sin informalidad.** Profesional, directo y humano.
- **Antieslopt.** Sin patrones genéricos de IA, plantillas o excesos.

## 2. Paleta cromática

La paleta se basa en verdes de paisaje chileno (esclerófilo, césped cuidado, árboles nativos) y neutros cálidos terrosos, con un único acento para mantener coherencia.

### 2.1 Colores base (Light Mode)

| Token                    | Hex       | Uso                                                            |
| ------------------------ | --------- | -------------------------------------------------------------- |
| `--color-background`     | `#F5F5F2` | Fondo principal. Neutro cálido suave, evita blanco puro.       |
| `--color-surface`        | `#FFFFFF` | Superficies, tarjetas y secciones con contraste.               |
| `--color-surface-subtle` | `#FAFAF7` | Secciones alternativas para romper monotonía sin cambiar tema. |
| `--color-surface-muted`  | `#F1F1EC` | Fondos secundarios, bloques, divisores sutiles.                |

### 2.2 Colores tierra y vegetación

| Token                | Hex       | Uso                                               |
| -------------------- | --------- | ------------------------------------------------- |
| `--color-forest-950` | `#0F1A12` | Texto principal, fondos oscuros.                  |
| `--color-forest-900` | `#162318` | Fondos hero oscuros, footers.                     |
| `--color-forest-800` | `#1F321F` | CTA primarios, énfasis.                           |
| `--color-forest-700` | `#274A26` | Hover/active de primarios, acentos estructurales. |
| `--color-forest-600` | `#2F5C2D` | Enlaces, acentos puntuales.                       |
| `--color-olive-500`  | `#7FA87C` | Acento único (soft). Usado con moderación.        |
| `--color-olive-300`  | `#C9DCC6` | Decorativos sutiles, fondos acentuados mínimos.   |
| `--color-sage-100`   | `#E7F0E5` | Superficies con tinte vegetal muy suave.          |

### 2.3 Neutros y tierra

| Token               | Hex       | Uso                                |
| ------------------- | --------- | ---------------------------------- |
| `--color-stone-900` | `#1A1916` | Texto principal.                   |
| `--color-stone-800` | `#242320` | Subtítulos, headings.              |
| `--color-stone-700` | `#3F3D37` | Cuerpo de texto secundario.        |
| `--color-stone-600` | `#6F6C60` | Texto auxiliar, metadatos.         |
| `--color-stone-500` | `#A5A096` | Placeholders, iconos desactivados. |
| `--color-stone-200` | `#EDE9DF` | Bordes sutiles, divisores.         |
| `--color-stone-100` | `#F3F1EB` | Fondos muy suaves.                 |
| `--color-stone-50`  | `#F9F8F3` | Superficies alternativas cálidas.  |

### 2.4 Estados y feedback

| Token             | Hex       | Uso                                             |
| ----------------- | --------- | ----------------------------------------------- |
| `--color-success` | `#3A7A3A` | Éxito, validaciones.                            |
| `--color-warning` | `#B87A1F` | Advertencias (uso muy puntual).                 |
| `--color-danger`  | `#B84C2F` | Errores.                                        |
| `--color-focus`   | `#7FA87C` | Focus ring visible (coincide con acento único). |

### 2.5 Dark Mode

Se define un esquema coherente con el mismo acento único. No se invierte aleatoriamente entre secciones.

| Token (Dark)                  | Hex       | Uso                   |
| ----------------------------- | --------- | --------------------- |
| `--color-background-dark`     | `#0B140D` | Fondo principal dark. |
| `--color-surface-dark`        | `#121B14` | Superficies.          |
| `--color-surface-subtle-dark` | `#0F1710` | Alternativas.         |
| `--color-surface-muted-dark`  | `#162318` | Bloques.              |
| `--color-text-primary-dark`   | `#F2F1EC` | Texto principal.      |
| `--color-text-secondary-dark` | `#D7D3C6` | Subtítulos/cuerpo.    |
| `--color-text-tertiary-dark`  | `#B9B29F` | Auxiliar/metadatos.   |
| `--color-border-dark`         | `#264A24` | Bordes sutiles.       |
| `--color-forest-700-dark`     | `#305F2E` | CTA/acentos.          |
| `--color-forest-800-dark`     | `#274A26` | Hover.                |

**Regla:** Un único acento (`--color-olive-500`). Máxima saturación controlada. Sin gradientes genéricos por defecto.

## 3. Tipografías

### 3.1 Selección

Se evita Inter/Roboto/Montserrat como predeterminado. Se eligen familias sans-serif con buena legibilidad, ritmo editorial y carácter profesional.

| Uso                                             | Familia      | Variable         | Fuente                                                                    |
| ----------------------------------------------- | ------------ | ---------------- | ------------------------------------------------------------------------- |
| Display (H1–H2)                                 | `Satoshi`    | `--font-display` | Variable font (self-host preferido vía `@font-face` o equivalente Astro). |
| Headings (H3–H6)                                | `Satoshi`    | `--font-heading` | Coherente con display. Usa variantes Medium/Semibold.                     |
| Body/UI (p, span, labels, botones, nav, footer) | `Geist`      | `--font-sans`    | Legibilidad excelente en UI, tracking neutro, escala estable.             |
| Mono (códigos, etiquetas técnicas puntuales)    | `Geist Mono` | `--font-mono`    | Solo uso puntual (no en UI comercial visible).                            |

**Justificación:** Satoshi aporta carácter editorial moderno sin caer en serif. Geist mantiene neutralidad y legibilidad para cuerpo/UI. No se utiliza serif por defecto (cumple regla 4.1).

### 3.2 Pesos

| Peso | Uso                          |
| ---- | ---------------------------- |
| 400  | Cuerpo (body).               |
| 500  | Labels, botones, navegación. |
| 600  | Subtítulos (H3–H6).          |
| 700  | Headings (H1–H2).            |

### 3.3 Tracking (letter-spacing)

| Escala | Aplicación |
|---|---|---|
| `-0.02em` | Display/H1. |
| `-0.015em` | H2. |
| `-0.01em` | H3–H6. |
| `0` | Body/UI. |
| `+0.05em` / `+0.08em` | Eyebrows (solo cuando se use **máx. 1 cada 3 secciones**). Ver 4.7 Eyebrow Restraint. |

### 3.4 Line-height

| Elemento                  | Line-height | Notas                                                                              |
| ------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| H1                        | `1.05`      | Evitar `leading-none` si hay descensores con italic. Usar `1.1` mínimo con italic. |
| H2                        | `1.08`      | Controlado.                                                                        |
| H3–H6                     | `1.10`      | Sólido.                                                                            |
| Body (p)                  | `1.70`      | Máx. legibilidad.                                                                  |
| UI (botones, labels, nav) | `1.20`      | Compacto y estable.                                                                |
| Small/captions            | `1.60`      | Legible.                                                                           |

## 4. Escala tipográfica, espaciado, grid y container

### 4.1 Escala tipográfica (fluid)

Basada en ritmo modular, con enfoque en **máx. 2 líneas para H1 en desktop** y subtexto ≤ 20 palabras / ≤ 4 líneas.

| Token         | Desktop (clamp sugerido) | Mobile     | Uso                                               |
| ------------- | ------------------------ | ---------- | ------------------------------------------------- |
| `--text-xs`   | `0.75rem` (12px)         | `0.75rem`  | Captions, metadatos.                              |
| `--text-sm`   | `0.875rem` (14px)        | `0.875rem` | Labels, texto auxiliar.                           |
| `--text-base` | `1rem` (16px)            | `0.95rem`  | Body base.                                        |
| `--text-lg`   | `1.125rem` (18px)        | `1.05rem`  | Lead/subtexto.                                    |
| `--text-xl`   | `1.25rem` (20px)         | `1.125rem` | H6.                                               |
| `--text-2xl`  | `1.5rem` (24px)          | `1.25rem`  | H5.                                               |
| `--text-3xl`  | `1.875rem` (30px)        | `1.5rem`   | H4.                                               |
| `--text-4xl`  | `2.25rem` (36px)         | `1.875rem` | H3.                                               |
| `--text-5xl`  | `3rem` (48px)            | `2.25rem`  | H2.                                               |
| `--text-6xl`  | `3.75rem` (60px)         | `2.75rem`  | H1 (hero sensible).                               |
| `--text-7xl`  | `4.5rem` (72px)          | `3.25rem`  | Solo H1 corto (3–5 palabras). Evitar por defecto. |

**Hero:** `text-4xl md:text-5xl lg:text-6xl` por defecto. `text-6xl md:text-7xl` únicamente con headline muy corto.

### 4.2 Espaciado (4pt/8pt rhythm)

| Token         | Valor (rem/px)    | Uso                                          |
| ------------- | ----------------- | -------------------------------------------- |
| `--space-0`   | `0`               | Reset.                                       |
| `--space-0.5` | `0.125rem` (2px)  | Micro-gaps.                                  |
| `--space-1`   | `0.25rem` (4px)   | Ajustes finos.                               |
| `--space-1.5` | `0.375rem` (6px)  | Íconos+texto.                                |
| `--space-2`   | `0.5rem` (8px)    | Base 8pt.                                    |
| `--space-2.5` | `0.625rem` (10px) | Internos UI.                                 |
| `--space-3`   | `0.75rem` (12px)  | Form controls.                               |
| `--space-3.5` | `0.875rem` (14px) | UI compacto.                                 |
| `--space-4`   | `1rem` (16px)     | Gap estándar.                                |
| `--space-5`   | `1.25rem` (20px)  | Secciones internas.                          |
| `--space-6`   | `1.5rem` (24px)   | Bloques.                                     |
| `--space-8`   | `2rem` (32px)     | Secciones pequeñas.                          |
| `--space-10`  | `2.5rem` (40px)   | Padding secciones.                           |
| `--space-12`  | `3rem` (48px)     | Espaciado entre bloques.                     |
| `--space-16`  | `4rem` (64px)     | Secciones (py-16).                           |
| `--space-20`  | `5rem` (80px)     | Secciones destacadas (py-20).                |
| `--space-24`  | `6rem` (96px)     | **Máx. top padding hero desktop: `pt-24`**.  |
| `--space-28`  | `7rem` (112px)    | Solo cuando justificado, evitar por defecto. |
| `--space-32`  | `8rem` (128px)    | Uso muy puntual (art-gallery density).       |

**Regla density:** Default `VISUAL_DENSITY 4` → `py-16 md:py-20`. `1–3` → `py-24 md:py-32`. Nunca forzar scroll en Hero.

### 4.3 Grid

| Token                 | Valor            | Uso                  |
| --------------------- | ---------------- | -------------------- |
| `--grid-cols-default` | `12`             | Grid base editorial. |
| `--grid-gap-xs`       | `0.75rem` (12px) | Micro.               |
| `--grid-gap-sm`       | `1rem` (16px)    | UI.                  |
| `--grid-gap-md`       | `1.5rem` (24px)  | Estándar.            |
| `--grid-gap-lg`       | `2rem` (32px)    | Secciones.           |
| `--grid-gap-xl`       | `3rem` (48px)    | Aire editorial.      |

**Principio:** Grid sobre flex-math complejo. Usar CSS Grid. Evitar `calc()` para anchos de columna.

### 4.4 Container

| Token                      | Valor           | Uso                                              |
| -------------------------- | --------------- | ------------------------------------------------ |
| `--container-max-width`    | `1400px`        | Contenedor principal (`max-w-[1400px] mx-auto`). |
| `--container-padding-x`    | `1rem` (16px)   | Mobile.                                          |
| `--container-padding-x-md` | `1.5rem` (24px) | Tablet.                                          |
| `--container-padding-x-lg` | `2rem` (32px)   | Desktop.                                         |

## 5. Border radius, sombras, bordes

### 5.1 Border Radius

Escala única y consistente (Shape Consistency Lock).

| Token           | Valor    | Uso                                                            |
| --------------- | -------- | -------------------------------------------------------------- |
| `--radius-none` | `0px`    | Elementos estructurales, minimalista.                          |
| `--radius-xs`   | `4px`    | Inputs, chips, badges pequeños.                                |
| `--radius-sm`   | `8px`    | Inputs, tags.                                                  |
| `--radius-md`   | `12px`   | Botones, tarjetas, superficies.                                |
| `--radius-lg`   | `16px`   | Cards, bloques destacados.                                     |
| `--radius-xl`   | `20px`   | Secciones con volumen ligero.                                  |
| `--radius-2xl`  | `24px`   | Hero/blocks muy puntuales.                                     |
| `--radius-pill` | `9999px` | Solo CTAs/badges cuando se justifica (no mezclar por defecto). |

**Default:** `--radius-md` (12px). Un solo radio por página. Si se usa pill en CTAs, aplicarlo consistentemente.

### 5.2 Sombras

Sombras mínimas, tintadas al tono de fondo (nunca negro puro). Solo cuando la elevación comunica jerarquía real.

| Token           | Valor                                                                            | Uso                                |
| --------------- | -------------------------------------------------------------------------------- | ---------------------------------- |
| `--shadow-none` | `none`                                                                           | Por defecto.                       |
| `--shadow-xs`   | `0 1px 2px -1px rgba(15, 26, 18, 0.08)`                                          | Inputs, focus sutil.               |
| `--shadow-sm`   | `0 1px 3px -1px rgba(15, 26, 18, 0.10), 0 1px 2px -2px rgba(15, 26, 18, 0.10)`   | Tarjetas cuando necesario.         |
| `--shadow-md`   | `0 4px 6px -1px rgba(15, 26, 18, 0.10), 0 2px 4px -2px rgba(15, 26, 18, 0.10)`   | Dropdowns/modales puntuales.       |
| `--shadow-lg`   | `0 10px 15px -3px rgba(15, 26, 18, 0.12), 0 4px 6px -4px rgba(15, 26, 18, 0.12)` | Solo overlays (uso muy reservado). |

Dark mode: tintado más suave hacia claro interno si aplica.

### 5.3 Bordes

| Token | Valor | Uso |
|---|---|
| `--border-width` | `1px` | Estándar. |
| `--border-subtle` | `1px solid color-mix(in srgb, var(--color-stone-200) 70%, transparent)` | Divisores. |
| `--border-strong` | `1px solid var(--color-stone-200)` | Inputs/botones outline. |

## 6. Botones, estados e interacciones

### 6.1 Variantes de botón

| Variante                        | Background                | Texto                     | Border                             | Hover                                                     | Active                                 | Focus                                    |
| ------------------------------- | ------------------------- | ------------------------- | ---------------------------------- | --------------------------------------------------------- | -------------------------------------- | ---------------------------------------- |
| **Primary**                     | `var(--color-forest-800)` | `#FFFFFF`                 | `none`                             | `var(--color-forest-700)`                                 | `scale-[0.995]` translateY(-1px) sutil | `ring 2px var(--color-focus)` offset 2px |
| **Secondary**                   | `var(--color-sage-100)`   | `var(--color-forest-900)` | `none`                             | `color-mix(in srgb, var(--color-sage-100) 92%, black 8%)` | `scale-[0.995]`                        | `ring 2px var(--color-focus)` offset 2px |
| **Outline**                     | `transparent`             | `var(--color-forest-900)` | `1px solid var(--color-stone-200)` | `var(--color-surface-subtle)`                             | `scale-[0.995]`                        | `ring 2px var(--color-focus)` offset 2px |
| **Ghost**                       | `transparent`             | `var(--color-forest-900)` | `none`                             | `var(--color-surface-muted)`                              | `scale-[0.995]`                        | `ring 2px var(--color-focus)` offset 2px |
| **Dark** (sobre fondos oscuros) | `#FFFFFF`                 | `var(--color-forest-900)` | `none`                             | `color-mix(in srgb, #FFF 92%, black 8%)`                  | `scale-[0.995]`                        | `ring 2px var(--color-focus)` offset 2px |
| **Destructive**                 | `var(--color-danger)`     | `#FFFFFF`                 | `none`                             | `color-mix(in srgb, var(--color-danger) 92%, black 8%)`   | `scale-[0.995]`                        | `ring 2px var(--color-focus)` offset 2px |

**Reglas:** Feedback táctil `-translate-y-[1px]` o `scale-[0.98]` en `:active`. CTA siempre legible (WCAG AA). **CTA no debe envolver texto en desktop**. Máx. 1–2 palabras preferido, 3 máx. Un solo CTA primario por intención por página.

### 6.2 Estados

| Estado          | Implementación                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Focus**       | Ring visible 2px con `--color-focus`, offset 2px. Siempre visible por teclado.                                          |
| **Hover**       | Transición sutil `cubic-bezier(0.16,1,0.3,1)` 150–200ms, solo `transform`, `background-color`, `color`, `border-color`. |
| **Active**      | Micro-scale/translate para feedback físico.                                                                             |
| **Disabled**    | `opacity-50`, `pointer-events-none`, cursor `not-allowed`.                                                              |
| **Loading**     | Skeleton que coincide con forma del elemento (no spinner circular genérico por defecto).                                |
| **Empty/Error** | Estados explícitos, inline para formularios, contexto claro.                                                            |

### 6.3 Transiciones base

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-medium: 300ms;
--duration-slow: 500ms;
```

Animar **solo transform y opacity**. Nunca top/left/width/height.

## 7. Componentes

| Componente        | Especificación                                                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Button**        | Usa variantes 6.1, `inline-flex`, `items-center`, `justify-center`, `gap-2`, `font-medium`, `tracking-normal`, `leading-tight`, `rounded-md` (coherente).  |
| **Container**     | `max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8`.                                                                                                             |
| **Section**       | Padding vertical `py-16 md:py-20` (density 4). Hero `min-h-[100dvh]` (nunca `h-screen`). Top padding hero máx. `pt-24`.                                    |
| **SectionTitle**  | H2 con `tracking-tight`, `leading-[1.08]`, `text-balance`. Subtexto opcional máx. 4 líneas, `max-w-[65ch]`.                                                |
| **Card**          | `bg-surface`, `rounded-lg`, `border border-subtle`, `p-6 md:p-8`. Sin sombra por defecto. Solo si eleva jerarquía.                                         |
| **Badge/Eyebrow** | **Máx. 1 cada 3 secciones.** `text-[11px] md:text-[10.5px] uppercase tracking-[0.18em] font-medium` (Geist/UI). Mono opcional solo si coherente con marca. |
| **Link**          | `text-forest-600 dark:text-olive-300`, `underline-offset-4 hover:underline`, focus visible.                                                                |
| **Input**         | Label arriba, helper abajo opcional, error debajo. `rounded-md`, border sutil, focus ring. Contraste WCAG AA.                                              |
| **List**          | Usar grid/cards si >5 ítems (evitar filas con hairline repetido).                                                                                          |

## 8. Dirección fotográfica y composición

### 8.1 Dirección fotográfica

- **Estilo:** Fotografía natural, editorial y luminosa (luz suave, natural chilena). Evitar sobreprocesado.
- **Tono:** Cálido neutro, colores fieles a paisaje (verde oliva, tierra, piedra).
- **Composición:** Espacio negativo generoso, líneas limpias, enfoque en estructura vegetal + orden paisajístico.
- **Perspectiva:** Baja/media, frontal o en tres cuartos. Evitar ángulos forzados.
- **Texturas:** Cortezas, grava, césped cuidado, muros de piedra, maceteros, follaje nativo (esclerófilo). Sutiles, nunca llamativas.
- **Mood:** Profesional, sereno, aspiracional sin artificio.

### 8.2 Principios de composición

- **Espacio negativo dominante.** Prioriza respiración.
- **Asimetría equilibrada.** Varía composición entre secciones (anti-bias centrado). Máx. 2 zigzag consecutivos (Split image+text).
- **Ritmo editorial.** Alternar familias de layout entre secciones (≥4 familias distintas en página con 8 secciones).
- **Un elemento focal claro.** Jerarquía única por bloque.
- **Bento:** Solo celdas con contenido real. Variar fondos (imagen, tinte suave, no blanco puro repetido). ≥2–3 celdas con variación visual.
- **Anti-repetición:** No 3 feature cards idénticas. No filas izquierda-derecha repetidas.

### 8.3 Estrategia de imágenes (desarrollo)

**Regla crítica:** No agregar imágenes externas aleatorias.

- **Estructura preparada.** Crear slots con `aria-hidden="true"`/placeholders deliberados fáciles de reemplazar (comentarios `<!-- TODO: imagen [uso], aspect-ratio -->`).
- **Priorizar assets existentes.** Usar `public/` o `src/assets/` solo si existen y sirven. Actualmente no hay imágenes reales → no inventar URLs.
- **Composiciones resilientes.** Layout debe funcionar y mantener jerarquía **sin imágenes**. Los bloques con imagen deben tener fallback sólido (fondo con tinte `--color-surface-subtle` o degradado muy sutil monocromático).
- **Aspect ratios definidos:** Hero 16:9/16:10, Servicios 4:5 o 16:9, Trabajos 4:3/16:9, Nosotros 1:1/16:9. Reservar espacio (`aspect-ratio`) para evitar CLS.
- **Alt obligatorio.** Siempre descriptivo, semántico (SEO + a11y). Nunca decorativo genérico.

## 9. Motion

Motion sutil, con propósito, respeta `prefers-reduced-motion`. GSAP + Motion (cuando corresponda).

### 9.1 Filosofía (Emil Kowalski)

Animar solo lo que comunica: jerarquía, narrativa, feedback o transición de estado. Nunca "porque se ve cool".

### 9.2 Dials (definidos por brief)

| Dial               | Valor | Justificación                                                      |
| ------------------ | ----- | ------------------------------------------------------------------ |
| `DESIGN_VARIANCE`  | `8`   | Moderno/editorial con asimetrías controladas (paisajismo premium). |
| `MOTION_INTENSITY` | `6`   | Moderado, sutil y con propósito.                                   |
| `VISUAL_DENSITY`   | `4`   | Aireado, editorial (equilibra profesionalidad + legibilidad).      |

### 9.3 Curvas y duraciones

```ts
ease: [0.16, 1, 0.3, 1]  // expo-out (UI)
spring: { stiffness: 100, damping: 20 }  // microfísica puntual
durations: 150ms (fast), 200–250ms (base), 300–400ms (medium), 500ms (slow)
```

### 9.4 Tipos de animación (permitidos)

| Tipo                   | Dónde                    | Técnica                                          | Notas                                                               |
| ---------------------- | ------------------------ | ------------------------------------------------ | ------------------------------------------------------------------- |
| **Entrance/fade-up**   | Hero, secciones, títulos | Motion `whileInView` + `initial y:24, opacity:0` | Stagger ligero (delay 0.06s máx.), `once: true`, `amount 0.25–0.3`. |
| **Reveal**             | Features, cards, grids   | Motion RevealStagger                             | Solo si aporta jerarquía. Evitar sobre-stagger.                     |
| **Scroll-reveal**      | Scroll natural           | Motion/GSAP con `once`                           | No bloquear lectura.                                                |
| **Hover**              | Botones, links, cards    | CSS `transition` (transform/bg)                  | Micro-feedback.                                                     |
| **Microinteractions**  | CTAs, íconos             | `scale-[0.995]` active                           | Táctil.                                                             |
| **Parallax muy sutil** | Hero/imagen puntual      | GSAP ScrollTrigger scrub 0.5–0.8                 | **Máx. 1 instancia**. Solo si justificado.                          |
| **Marquee**            | Única sección            | GSAP pin/loop sutil                              | **Máx. 1 por página**. Solo si aporta contenido.                    |
| **Sticky-stack**       | Caso muy puntual         | GSAP ScrollTrigger (`start: "top top"`)          | Solo cuando narrativa lo exige. No por defecto.                     |

### 9.5 Reglas Motion

- **Solo transform/opacity.** Prohibido animar layout (top/left/width/height).
- **Respeta `prefers-reduced-motion`.** Todo debe colapsar a estático/instantáneo. Usar `useReducedMotion()` (Motion) + gate GSAP con check.
- **Motivado.** Debe comunicar jerarquía/narrativa/feedback/transición. Si no se puede articular → eliminar.
- **Máx. 1 marquee por página.** Máx. 1 parallax sutil. Eyebrows ≤1 cada 3 secciones.
- **Evitar loops infinitos innecesarios.** Solo cuando aporte valor real.
- **GSAP:** Usar `ScrollTrigger` con `start: "top top"` para pin, `invalidateOnRefresh: true`, cleanups en `revert()`/`return`.
- **Performance:** `will-change: transform` solo en elementos que animan activamente. Grain/ruido solo en pseudo-elemento `fixed inset-0 pointer-events-none`.

## 10. Responsive, Accesibilidad, SEO

### 10.1 Responsive

| Breakpoint     | Uso                                                |
| -------------- | -------------------------------------------------- |
| `sm` (640px)   | Mobile base.                                       |
| `md` (768px)   | Tablet. Layouts asimétricos colapsan a 1-col aquí. |
| `lg` (1024px)  | Desktop. Nav debe caber en 1 línea.                |
| `xl` (1280px)  | Desktop grande.                                    |
| `2xl` (1536px) | Máx. respiración.                                  |

**Reglas:** `min-h-[100dvh]` (no h-screen). Nav 64–72px, máx. 80px. Hero fit viewport inicial. Mobile-first. Asimetrías < md → single-column.

### 10.2 Accesibilidad (WCAG AA mínimo, objetivo AA+)

- **Contraste:** Texto cuerpo ≥ 4.5:1, títulos ≥ 3:1 (grandes), CTAs ≥ 4.5:1. Formularios/helper/error con contraste correcto.
- **Focus visible:** Obligatorio en todos elementos interactivos (ring 2px offset 2px).
- **Teclado:** Navegación completa por teclado, orden lógico, skip links recomendado.
- **Semántica HTML:** `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, headings jerárquicos H1→H2→H3 (un único H1 por página).
- **Imágenes:** `alt` descriptivo obligatorio. Decorative → evitar o `alt=""` justificado.
- **ARIA:** Solo cuando necesario, no redundante.
- **Reduced motion:** Cumplido 9.5.
- **Formularios:** Label arriba, error debajo, helper opcional. No placeholder como label.
- **Targets táctiles:** Mín. 44x44px en mobile (botones/links).

### 10.3 SEO

- **Title + Meta description** únicos por página (SEO utils existentes).
- **Open Graph/Twitter** configurables (MainLayout existente).
- **H1 único.** Estructura H2/H3 lógica.
- **Alt imágenes.** Descriptivo.
- **JSON-LD**: mantener estructura existente si aplica (no inventar datos).
- **Semántico + performance.** Evitar keyword stuffing.

## 11. Aplicación práctica (implementación)

### 11.1 Orden de implementación

1. **Tokens CSS (Tailwind v4)** → `src/styles/global.css` (`@theme` inline). Definir light/dark tokens.
2. **Base + tipografías** → `@layer base` (font-face/self-host si procede, `font-smooth`, antialiasing).
3. **Componentes UI** → `Button.astro`, `Container.astro`, `SectionTitle.astro`, `WhatsAppButton.astro`. Alinear a tokens.
4. **Layout** → `MainLayout.astro`, `Navbar.astro`, `Footer.astro`. Mantener estructura, mejorar presentación.
5. **Home** → Hero (prioritario), ServicesPreview, FeaturedWork, AboutPreview, Testimonials, FinalCTA. CTA: **"Solicitar cotización"** (o variante mejor si justificada por composición/conversión, sin inventar datos).
6. **Páginas restantes** → `/servicios`, `/nosotros`, `/trabajos`, `/contacto`, `/blog`, `/404`. Coherencia total.
7. **Motion** → `src/utils/animation.ts` (GSAP + reduced motion). Añadir reveals puntuales con propósito.
8. **Revisión + polish** → Segunda pasada (impeccable/review-animations/improve-animations).
9. **Verificación** → `astro check`, `astro build`, `prettier --check`, lint. Desktop+mobile.

### 11.2 Reglas de implementación (críticas)

- **Conservar arquitectura.** No reconstruir desde cero. Reutilizar componentes útiles.
- **No inventar datos.** PLACEHOLDERs se mantienen sin rellenar con info falsa (teléfono, WhatsApp, email, dirección, zonas, clientes, testimonios, años, estadísticas, certificaciones).
- **Diseñar alrededor de PLACEHOLDERs.** Componentes flexibles, slots preparados, composición no depende de datos inventados.
- **Sin imágenes externas aleatorias.** Estructura preparada + fallbacks sólidos.
- **Un sistema por proyecto.** Coherencia total entre páginas.
- **Zigzag ≤ 2 consecutivos.** Variar familias layout. Eyebrows ≤1 cada 3 secciones.
- **Hero:** fit viewport, pt-24 máx., ≤2 líneas H1, subtexto ≤20 palabras/≤4 líneas, CTAs visibles sin scroll. Sin elementos extra (trust strip/logo wall dentro). Logo wall va **debajo** del Hero.

### 11.3 Notas anti-"look de IA"

- Cero guiones largos (em-dash/en-dash) en UI visible.
- Evitar gradientes genéricos, 3 tarjetas idénticas, glassmorphism por defecto, purple glow.
- Paleta rotada (evitar familia beige+brass por defecto).
- Serif no por defecto. Énfasis con italic/bold misma familia.
- Sin eyebrow en todas las secciones. Sin split-header por defecto.

## 12. Entregable

Este DESIGN.md es la fuente de verdad para la implementación. Debe aplicarse íntegramente, sin desviarse, respetando todas las reglas anteriores.
