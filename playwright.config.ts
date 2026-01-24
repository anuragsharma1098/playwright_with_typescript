/**
 * Playwright Test Configuration
 * 
 * Configuration file for Playwright testing framework.
 * Defines test settings, browser configurations, and reporting options.
 * 
 * Reference: https://playwright.dev/docs/test-configuration
 */

/**
 * Playwright Test Configuration
 * 
 * Configuration file for Playwright testing framework.
 * Defines test settings, browser configurations, and reporting options.
 * 
 * Reference: https://playwright.dev/docs/test-configuration
 */

import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * Optional: Uncomment to use dotenv for environment configuration
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Main Playwright Configuration
 * See https://playwright.dev/docs/test-configuration for complete options.
 */
export default defineConfig({
  // Directory where test files are located
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only - helps with flaky tests in CI environments */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI to avoid resource constraints. */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use - generates HTML test report */
  reporter: 'html',
  
  /* Shared settings for all the test projects below. */
  /* See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test - useful for debugging */
    /* See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Custom attribute to be used in page.getByTestId(testId). */
    /* Default is 'data-testid', but can be customized here */
    testIdAttribute: 'data-pw',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Uncomment to test on Firefox
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // Uncomment to test on Safari (webkit)
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
