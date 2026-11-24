import { expect, test, type Page, type Response } from '@playwright/test';

const BASE_PATH = '/Lignum';
const PLACEHOLDER_WHATSAPP = '56900000000';

const SERVICE_SLUGS = [
  'mantencion-de-areas-verdes-y-jardines',
  'desmalezado',
  'paisajismo',
  'podas',
  'tala-de-arboles',
] as const;

const ROUTES = [
  { path: '/', label: 'Inicio' },
  { path: '/servicios', label: 'Servicios' },
  ...SERVICE_SLUGS.map((slug) => ({
    path: `/servicios/${slug}`,
    label: `Servicio ${slug}`,
  })),
  { path: '/trabajos', label: 'Trabajos' },
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/blog', label: 'Blog' },
  { path: '/contacto', label: 'Contacto' },
  { path: '/404', label: '404' },
] as const;

const VIEWPORTS = [
  { label: 'móvil', width: 390, height: 844 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'escritorio', width: 1440, height: 900 },
] as const;

type Diagnostics = {
  pageErrors: string[];
  consoleErrors: string[];
  failedResources: string[];
};

function routeTarget(path: string): string {
  return `${BASE_PATH}${path === '/' ? '/' : path}`;
}

async function openRoute(
  page: Page,
  path: string
): Promise<{ response: Response | null; diagnostics: Diagnostics }> {
  const target = routeTarget(path);
  const diagnostics: Diagnostics = {
    pageErrors: [],
    consoleErrors: [],
    failedResources: [],
  };

  page.on('pageerror', (error) => diagnostics.pageErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') diagnostics.consoleErrors.push(message.text());
  });
  page.on('response', (response) => {
    const url = new URL(response.url());
    const isLocal = url.pathname === BASE_PATH || url.pathname.startsWith(`${BASE_PATH}/`);
    if (!isLocal || response.status() < 400) return;
    if (
      path === '/404' &&
      url.pathname === `${BASE_PATH}/404` &&
      response.request().isNavigationRequest()
    ) {
      return;
    }
    diagnostics.failedResources.push(`${response.status()} ${url.pathname}`);
  });

  const response = await page.goto(target, { waitUntil: 'load' });
  return { response, diagnostics };
}

async function scrollThroughPage(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const step = 600;
    const height = document.body.scrollHeight;
    for (let y = 0; y <= height; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    window.scrollTo(0, 0);
  });
}

function parseHref(href: string): URL | null {
  try {
    return new URL(href, `http://playwright.local${BASE_PATH}/`);
  } catch {
    return null;
  }
}

for (const route of ROUTES) {
  test.describe(route.label, () => {
    test('carga, título y contenido principal', async ({ page }) => {
      const { response, diagnostics } = await openRoute(page, route.path);

      expect(response).not.toBeNull();
      if (route.path === '/404') {
        expect([200, 404]).toContain(response?.status());
      } else {
        expect(response?.status()).toBe(200);
      }
      await expect(page).toHaveURL(
        new RegExp(`${BASE_PATH}${route.path === '/' ? '/?' : route.path}`)
      );

      const title = (await page.title()).trim();
      expect(title.length).toBeGreaterThan(0);
      expect(title).not.toContain('(PLACEHOLDER)');

      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage, 'og:image debe usar el base path').toContain(`${BASE_PATH}/og-image.jpg`);

      const mainText = (await page.locator('main#contenido').innerText()).trim();
      expect(mainText.length).toBeGreaterThan(20);
      expect((await page.content()).length).toBeGreaterThan(1000);

      expect(diagnostics.pageErrors).toEqual([]);
      expect(diagnostics.consoleErrors).toEqual([]);
      expect(diagnostics.failedResources).toEqual([]);
    });

    test('enlaces internos y externos', async ({ page, request, baseURL }) => {
      await openRoute(page, route.path);
      const hrefs = await page
        .locator('a[href]')
        .evaluateAll((elements) => elements.map((element) => element.getAttribute('href') ?? ''));

      const internal = new Set<string>();
      const invalidExternal: string[] = [];
      const invalidBase: string[] = [];

      for (const href of hrefs) {
        if (
          !href ||
          href.startsWith('#') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:')
        ) {
          continue;
        }
        const url = parseHref(href);
        if (!url) {
          invalidExternal.push(href);
          continue;
        }
        if (url.origin === 'http://playwright.local') {
          const respectsBase =
            url.pathname === BASE_PATH || url.pathname.startsWith(`${BASE_PATH}/`);
          if (!respectsBase) invalidBase.push(href);
          else internal.add(`${url.pathname}${url.search}`);
          continue;
        }
        if (url.protocol !== 'http:' && url.protocol !== 'https:') invalidExternal.push(href);
        else if (!url.hostname) invalidExternal.push(href);
      }

      expect(invalidBase, `Enlaces que no respetan ${BASE_PATH}`).toEqual([]);
      expect(invalidExternal, 'Enlaces con destino no válido').toEqual([]);
      expect(internal.size).toBeGreaterThan(0);

      const origin = baseURL ?? `http://127.0.0.1:4331${BASE_PATH}`;
      for (const href of internal) {
        const url = new URL(href, origin).toString();
        const response = await request.get(url);
        expect(response.ok(), `Destino interno roto: ${href}`).toBeTruthy();
      }
    });

    test('CTA de WhatsApp', async ({ page }) => {
      await openRoute(page, route.path);
      const hrefs = await page
        .locator('a[href]')
        .evaluateAll((elements) => elements.map((element) => element.getAttribute('href') ?? ''));
      const whatsappLinks = hrefs
        .map(parseHref)
        .filter((url): url is URL => url !== null && url.hostname === 'wa.me');

      expect(whatsappLinks.length).toBeGreaterThan(0);

      for (const url of new Set(whatsappLinks.map((link) => link.toString()))) {
        const parsed = new URL(url);
        expect(parsed.protocol).toBe('https:');
        expect(parsed.hostname).toBe('wa.me');
        expect(parsed.pathname).toMatch(/^\/\d{8,15}\/?$/);
        expect((parsed.searchParams.get('text') ?? '').trim().length).toBeGreaterThan(0);

        if (parsed.pathname.replace(/^\/|\/$/g, '') === PLACEHOLDER_WHATSAPP) {
          test.info().annotations.push({
            type: 'whatsapp-number-placeholder',
            description: `${route.path}: wa.me usa el número provisional ${PLACEHOLDER_WHATSAPP}; requiere número real antes de publicar.`,
          });
        }
      }
    });

    test('imágenes y vídeos', async ({ page, request, baseURL }) => {
      await openRoute(page, route.path);
      await scrollThroughPage(page);
      await page.waitForFunction(
        () =>
          Array.from(document.images).every((image) => {
            const style = getComputedStyle(image);
            const rect = image.getBoundingClientRect();
            const visible =
              style.display !== 'none' &&
              style.visibility !== 'hidden' &&
              rect.width > 0 &&
              rect.height > 0;
            return !visible || image.complete || image.naturalWidth > 0;
          }),
        null,
        { timeout: 20_000 }
      );

      const images = await page.locator('img').evaluateAll((elements) =>
        elements.map((element) => {
          const image = element as HTMLImageElement;
          const style = getComputedStyle(image);
          const rect = image.getBoundingClientRect();
          return {
            src: image.currentSrc || image.src,
            complete: image.complete,
            visible:
              style.display !== 'none' &&
              style.visibility !== 'hidden' &&
              rect.width > 0 &&
              rect.height > 0,
            naturalWidth: image.naturalWidth,
            width: image.getAttribute('width'),
            height: image.getAttribute('height'),
          };
        })
      );

      const brokenImages = images
        .filter((image) => image.visible && (!image.complete || image.naturalWidth === 0))
        .map((image) => image.src);
      expect(brokenImages, 'Imágenes que no cargan').toEqual([]);

      const origin = baseURL ?? `http://127.0.0.1:4331${BASE_PATH}`;
      const wrongBaseImages = images
        .filter((image) => {
          const url = new URL(image.src, origin);
          return url.pathname !== BASE_PATH && !url.pathname.startsWith(`${BASE_PATH}/`);
        })
        .map((image) => image.src);
      expect(wrongBaseImages, 'Imágenes locales fuera del base path').toEqual([]);

      const missingSize = images.filter((image) => !image.width || !image.height).length;
      if (missingSize > 0) {
        test.info().annotations.push({
          type: 'image-dimensions',
          description: `${route.path}: ${missingSize} imagen(es) sin atributos width/height.`,
        });
      }

      const videos = await page.locator('video').evaluateAll((elements) =>
        elements.map((element) => {
          const video = element as HTMLVideoElement;
          return {
            error: video.error?.message ?? null,
            poster: video.poster,
            sources: Array.from(video.querySelectorAll('source')).map((source) => source.src),
          };
        })
      );

      for (const video of videos) {
        expect(video.error, 'El vídeo reportó un error de carga').toBeNull();
        expect(video.sources.length).toBeGreaterThan(0);
        for (const source of video.sources) {
          const url = new URL(source, origin);
          expect(
            url.pathname.startsWith(`${BASE_PATH}/`),
            `Vídeo fuera de ${BASE_PATH}`
          ).toBeTruthy();
          const response = await request.head(url.toString());
          expect(response.ok(), `Recurso de vídeo no disponible: ${source}`).toBeTruthy();
        }
        if (video.poster) {
          const posterUrl = new URL(video.poster, origin);
          expect(posterUrl.pathname.startsWith(`${BASE_PATH}/`)).toBeTruthy();
          const response = await request.head(posterUrl.toString());
          expect(response.ok(), `Póster no disponible: ${video.poster}`).toBeTruthy();
        }
      }
    });

    test('responsive', async ({ page }) => {
      await openRoute(page, route.path);

      for (const viewport of VIEWPORTS) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });

        await expect(page.locator('main#contenido')).toBeVisible();
        const overflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        expect(
          overflow.scrollWidth,
          `Scroll horizontal inesperado en ${viewport.label} (${viewport.width}x${viewport.height})`
        ).toBeLessThanOrEqual(overflow.clientWidth + 1);

        await expect(page.locator('header[data-navbar] nav')).toBeVisible();
        if (viewport.width < 1024) {
          const burger = page.locator('[data-menu-button]');
          await expect(burger).toBeVisible();
          await burger.click();
          await expect(page.locator('#menu-movil')).toBeVisible();
          await expect(page.locator('#menu-movil [data-menu-link]').first()).toBeVisible();
          if (route.path !== '/404' && route.path !== '/blog') {
            await expect(page.locator('#menu-movil [aria-current="page"]')).toHaveCount(1);
          }
          await page.keyboard.press('Escape');
          await expect(page.locator('#menu-movil')).toBeHidden();
          await expect(burger).toBeFocused();
        } else {
          const navLinks = page.locator('[data-nav-link]');
          expect(await navLinks.count()).toBeGreaterThan(0);
          await expect(navLinks.first()).toBeVisible();
        }

        await expect(page.getByRole('link', { name: /whatsapp/i }).first()).toBeVisible();
      }
    });

    test('accesibilidad básica', async ({ page }) => {
      await openRoute(page, route.path);

      const lang = (await page.locator('html').getAttribute('lang'))?.trim();
      expect(lang).toBeTruthy();
      await expect(page.locator('h1')).toHaveCount(1);

      const imagesWithoutAlt = await page
        .locator('img')
        .evaluateAll((elements) =>
          elements
            .filter((element) => element.getAttribute('alt') === null)
            .map(
              (element) =>
                (element as HTMLImageElement).currentSrc || (element as HTMLImageElement).src
            )
        );
      expect(imagesWithoutAlt, 'Imágenes sin texto alternativo').toEqual([]);

      const unnamedControls = await page.locator('a, button').evaluateAll((elements) =>
        elements
          .filter((element) => {
            const control = element as HTMLElement;
            const text = (control.textContent ?? '').trim();
            return !text && !control.getAttribute('aria-label') && !control.getAttribute('title');
          })
          .map((element) => (element as HTMLElement).outerHTML.slice(0, 120))
      );
      expect(unnamedControls, 'Controles sin nombre accesible').toEqual([]);

      const headingLevels = await page
        .locator('h1,h2,h3,h4,h5,h6')
        .evaluateAll((elements) => elements.map((element) => Number(element.tagName.substring(1))));
      expect(headingLevels[0]).toBe(1);
      for (let index = 1; index < headingLevels.length; index += 1) {
        expect(headingLevels[index] - headingLevels[index - 1]).toBeLessThanOrEqual(1);
      }
    });
  });
}

test.describe('Fichas de servicio', () => {
  test('el índice y la home enlazan las cinco fichas', async ({ page }) => {
    for (const path of ['/servicios', '/']) {
      await openRoute(page, path);
      const hrefs = await page
        .locator('a[href]')
        .evaluateAll((elements) => elements.map((element) => element.getAttribute('href') ?? ''));

      for (const slug of SERVICE_SLUGS) {
        expect(hrefs, `${path} debe enlazar /servicios/${slug}`).toContain(
          `${BASE_PATH}/servicios/${slug}`
        );
      }
    }
  });
});
