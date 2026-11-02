import { defineConfig, devices } from '@playwright/test';

// Not Astro's default 4321, so a dev server from another project can't shadow the test server.
const PORT = 4400;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    // Trailing slash matters: relative paths in tests resolve under the GitHub Pages base.
    baseURL: `http://localhost:${PORT}/legends-of-spain/`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // E2E runs against a production build that includes drafts, so template pages are testable.
    command: `npx astro build && npx astro preview --port ${PORT}`,
    url: `http://localhost:${PORT}/legends-of-spain/`,
    env: { PUBLIC_SHOW_DRAFTS: 'true' },
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
