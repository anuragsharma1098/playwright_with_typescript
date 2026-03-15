/**
 * Hooks Test Suite
 *
 * Comprehensive tests demonstrating Playwright test lifecycle hooks
 *
 * Hook Concepts:
 * - test.beforeAll(): Runs once before all tests in the suite
 *   - Used for expensive setup (database connections, server initialization)
 *   - Executed once per test file
 *   - Variables defined here are shared across all tests
 *
 * - test.afterAll(): Runs once after all tests in the suite
 *   - Used for cleanup (closing connections, clearing resources)
 *   - Executed once at the end of all tests
 *   - Guaranteed to run even if tests fail
 *
 * - test.beforeEach(): Runs before each individual test
 *   - Used for per-test setup (navigate to URL, login, prepare data)
 *   - Executed before every single test
 *   - Best for resetting test state
 *
 * - test.afterEach(): Runs after each individual test
 *   - Used for per-test cleanup (logout, clear cache, take screenshots on failure)
 *   - Executed after every single test
 *   - Useful for capturing test failure context
 *
 * Hook Execution Order:
 * 1. beforeAll (once at start)
 * 2. beforeEach (before first test)
 * 3. Test 1 execution
 * 4. afterEach (after first test)
 * 5. beforeEach (before second test)
 * 6. Test 2 execution
 * 7. afterEach (after second test)
 * 8. afterAll (once at end)
 *
 * Best Practices:
 * - Keep beforeAll/afterAll for expensive operations
 * - Use beforeEach/afterEach for per-test setup/cleanup
 * - Avoid test interdependencies
 * - Always clean up resources in afterAll/afterEach
 */

import { test, expect, Page } from '@playwright/test';

// Shared page variable across all tests
let page: Page;

/**
 * Hook: beforeAll
 *
 * Description:
 *   Runs once before all tests in this suite. Creates a new browser page
 *   and navigates to the Tricentis website. This page is shared and reused
 *   across all tests in the suite for performance efficiency.
 *
 * Setup:
 *   - Create a new page from browser context
 *   - Navigate to https://www.tricentis.com/
 *   - Log confirmation message
 */
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('https://www.tricentis.com/');
  console.log('Before all tests: Navigated to Tricentis homepage');
});

/**
 * Hook: afterAll
 *
 * Description:
 *   Runs once after all tests in this suite complete. Closes the shared page
 *   and cleans up resources. This ensures browser resources are properly released.
 *
 * Cleanup:
 *   - Close the shared page
 *   - Log confirmation message
 */
test.afterAll(async () => {
  await page.close();
  console.log('After all tests: Closed Tricentis page');
});

/**
 * Hook: beforeEach
 *
 * Description:
 *   Runs before each individual test. Logs the start of test execution
 *   for tracking and debugging purposes.
 *
 * Setup:
 *   - Log test start message
 */
test.beforeEach(async () => {
  console.log('Before each test: Test started');
});

/**
 * Hook: afterEach
 *
 * Description:
 *   Runs after each individual test completes. Logs the completion of test execution
 *   for tracking and debugging purposes.
 *
 * Cleanup:
 *   - Log test completion message
 */
test.afterEach(async () => {
  console.log('After each test: Test completed');
});

/**
 * Test: should have the correct title
 *
 * Description:
 *   Verifies that the Tricentis webpage has the expected page title.
 *   Uses the shared page object created in beforeAll hook.
 *
 * Expected Behavior:
 *   - Page title matches "AI-powered automated testing software tools | Tricentis"
 */
test('should have the correct title', async () => {
  console.log('Running test: should have the correct title');
  await expect(page).toHaveTitle('AI-powered automated testing software tools | Tricentis');
});

/**
 * Test: should have the correct URL
 *
 * Description:
 *   Verifies that the current page URL is the correct Tricentis homepage.
 *   Uses the shared page object created in beforeAll hook.
 *
 * Expected Behavior:
 *   - Page URL matches https://www.tricentis.com/
 */
test('should have the correct URL', async () => {
  console.log('Running test: should have the correct URL');
  await expect(page).toHaveURL('https://www.tricentis.com/');
});
