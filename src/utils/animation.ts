/**
 * Animaciones.
 *
 * GSAP se carga de forma diferida (lazy) y SOLO cuando hay elementos que
 * realmente lo necesitan. Por defecto la página no carga ninguna librería de
 * animación: cada componente opta por usar `revealOnScroll` de forma explícita.
 */

let gsapCache: typeof import('gsap').default | undefined;

/** Carga GSAP una sola vez, bajo demanda. */
export async function loadGsap(): Promise<typeof import('gsap').default> {
  if (gsapCache) {
    return gsapCache;
  }
  const module = await import('gsap');
  gsapCache = module.default;
  return module.default;
}

export type RevealOptions = {
  /** Retraso en segundos antes de comenzar. */
  delay?: number;
  /** Desplazamiento vertical inicial en píxeles. */
  y?: number;
  /** Duración en segundos. */
  duration?: number;
};

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Anima suavemente un elemento al entrar a la ventana gráfica.
 * Usa GSAP cargado de forma diferida y respeta prefers-reduced-motion.
 * Devuelve una función para cancelar la observación.
 */
export function revealOnScroll(
  element: Element,
  { delay = 0, y = 24, duration = 0.5 }: RevealOptions = {}
): () => void {
  if (prefersReducedMotion() || !(element instanceof Element)) {
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        observer.disconnect();
        void loadGsap()
          .then((gsap) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0, y },
              { autoAlpha: 1, y: 0, duration, delay, ease: 'expo.out' }
            );
          })
          .catch(() => {
            // Si GSAP no carga, el contenido nunca debe quedar invisible.
            (element as HTMLElement).style.opacity = '1';
          });
      }
    },
    { threshold: 0.25 }
  );

  observer.observe(element);

  return () => {
    observer.disconnect();
  };
}

/**
 * Activa las animaciones de todos los elementos `[data-reveal]`
 * incluidos dentro de un contenedor. Devuelve una función que detiene todo.
 */
export function initReveal(container: HTMLElement | Document): () => void {
  const elements = Array.from(container.querySelectorAll<HTMLElement>('[data-reveal]'));
  const cleanups = elements.map((element) => {
    const delay = Number(element.dataset.revealDelay ?? 0);
    return revealOnScroll(element, { delay });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
