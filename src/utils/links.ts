/**
 * Helpers de rutas internas.
 *
 * El sitio puede servirse bajo un base path (p. ej. GitHub Pages en /Lignum/),
 * por lo que los enlaces lógicos ("/servicios") deben prefijarse con
 * import.meta.env.BASE_URL antes de renderizarse.
 */

const BASE = import.meta.env.BASE_URL;

function normalizedBase(): string {
  if (BASE === '/' || BASE === '') return '';
  return BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
}

/** Prefija una ruta interna con el base path. Externas, mailto:, tel: y anclas pasan tal cual. */
export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;

  const base = normalizedBase();
  if (base === '') return path;
  if (path === base || path.startsWith(`${base}/`)) return path;

  return path === '/' ? `${base}/` : `${base}${path}`;
}

/** Quita el base path de una ruta para compararla con las rutas lógicas. */
export function stripBase(pathname: string): string {
  const base = normalizedBase();
  if (base === '') return pathname;
  if (pathname === base) return '/';
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length) || '/';
  return pathname;
}

/** Normaliza una ruta para compararla: sin barra final salvo la raíz. */
export function normalizePath(path: string): string {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

/** true si la ruta actual (Astro.url.pathname) corresponde a la ruta lógica dada. */
export function isCurrentPath(pathname: string, logicalPath: string): boolean {
  return normalizePath(stripBase(pathname)) === normalizePath(logicalPath);
}
