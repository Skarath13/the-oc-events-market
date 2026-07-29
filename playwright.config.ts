import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  ...(process.env.CI ? { workers: 2 } : {}),
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: 'https://127.0.0.1:4377',
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    colorScheme: 'light',
    contextOptions: {
      reducedMotion: 'reduce',
    },
  },
  webServer: {
    command:
      'PUBLIC_SITE_URL=https://theoceventsmarket.com PUBLIC_SITE_INDEXABLE=true CLOUDFLARE_ENV=test pnpm build && pnpm exec wrangler dev --env test --ip 127.0.0.1 --port 4377 --local-protocol https',
    url: 'https://127.0.0.1:4377',
    ignoreHTTPSErrors: true,
    reuseExistingServer: false,
    timeout: 180_000,
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'chromium-mobile',
      use: {
        ...devices['Pixel 7'],
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: 'chrome-desktop',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'firefox-desktop',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'webkit-desktop',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'webkit-mobile',
      use: {
        ...devices['iPhone 13'],
        viewport: { width: 390, height: 844 },
      },
    },
    ...(process.env.EDGE_EXECUTABLE_PATH
      ? [
          {
            name: 'edge-desktop',
            use: {
              ...devices['Desktop Chrome'],
              launchOptions: {
                executablePath: process.env.EDGE_EXECUTABLE_PATH,
              },
              viewport: { width: 1440, height: 900 },
            },
          },
        ]
      : []),
  ],
});
