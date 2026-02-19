import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Allow tests within a single file to run in parallel */
  fullyParallel: true,
  /* Prevents "test.only" from being committed to Trunk */
  forbidOnly: !!process.env.CI,
  /* Retry twice on Jenkins to filter out "flaky" tests */
  retries: process.env.CI ? 2 : 0,

  /* OPTIMIZATION: On an e2-medium, 2 workers is the sweet spot. 
     More than 2 will likely cause OOM (Out of Memory) errors.
  */
  workers: process.env.CI ? 2 : undefined,

  /* Reporter configuration for Jenkins + Allure */
  reporter: [
    ['list'],
    ['html', { open: 'never' }], // 'never' prevents hanging in Docker
    ['allure-playwright', {
      outputFolder: 'allure-results',
      cleanupOutdatedStats: true
    }]
  ],

  use: {
    /* SDET TIP: 'on' records everything, which is great for study, 
       but if you run out of disk space again, change this to 'retain-on-failure'.
    */
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
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
});