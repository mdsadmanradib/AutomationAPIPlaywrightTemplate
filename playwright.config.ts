import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from ".env" file.
dotenv.config();

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './tests',

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: 'html',

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    // The `BASE_URL` is set in the `.env` file.
    baseURL: process.env.BASE_URL,

    // --- FIX for 404 HTML errors ---
    // Add the 'Accept' header to all requests to ensure we get JSON.
    extraHTTPHeaders: {
      Accept: 'application/json',
    },

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',

    // --- PROXY SETTINGS ---
    // If you are on a corporate network, you may need to uncomment this.
    // 1. UNCOMMENT THE BLOCK BELOW
    // 2. FILL IN THE DETAILS FROM YOUR IT TEAM
    /*
    proxy: {
      server: 'http://your-proxy-server-address:PORT',
      username: 'YOUR-PROXY-USERNAME',
      password: 'YOUR-PROXY-PASSWORD',
    },
    */
  },

  // Configure projects for different environments or browsers
  projects: [
    {
      name: 'api',
      // We only need 'chromium' for API tests, but it doesn't really matter.
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'ui',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.e2e\.ts/, // Separate UI tests
    },

    /* Test against other browsers.
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],
});