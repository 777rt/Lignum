import type { APIRoute } from 'astro';

import { SITE } from '@/data/site';
import { withBase } from '@/utils/links';

/**
 * robots.txt generado en build para que el sitemap coincida siempre con
 * SITE.url y el base path activos (GitHub Pages vs. dominio propio).
 */
export const GET: APIRoute = () => {
  const sitemap = new URL(withBase('/sitemap-index.xml'), SITE.url).toString();

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
