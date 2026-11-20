import { defineConfig, devices } from '@playwright/test';

const BASE_PATH = '/Lignum';
const PREVIEW_PORT = 4331;
const PREVIEW_HOST = '127.0.0.1';
const baseURL = `http://${PREVIEW_HOST}:${PREVIEW_PORT}${BASE_PATH}`;

export default defineConfig({
  testDir: './tests',
  testIgnore: 'tests/example.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL,
    reducedMotion: 'reduce',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: `npm run preview -- --host ${PREVIEW_HOST} --port ${PREVIEW_PORT}`,
    url: `${baseURL}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
