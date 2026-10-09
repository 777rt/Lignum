// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/data/site';

// https://astro.build/config
export default defineConfig({
  // Dominio del sitio (SITE.url; en CI se inyecta con SITE_URL).
  site: SITE.url,
  // Ruta base del despliegue: GitHub Pages sirve el repo en /Lignum/.
  // Cambiar a '/' (o eliminar) cuando el sitio viva en un dominio propio en la raíz.
  base: process.env.BASE_PATH ?? '/Lignum',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
