/**
 * Annotations Test Suite
 *
 * Comprehensive tests demonstrating various test annotations in Playwright
 *
 * Annotations Concepts:
 * - test.only: Runs only this test, ignores other tests in the suite
 * - test.skip: Skips this test and logs it as skipped in reports
 * - test.fail: Marks test as expected to fail; pass becomes failure and vice versa
 * - test.fixme: Combination of skip and fail; test is not run and marked as fixme
 * - test.slow: Marks test as slow; triples the test timeout
 *
 * Use Cases:
 * - only: Focus on debugging a single test
 * - skip: Temporarily disable a test (broken feature, pending implementation)
 * - fail: Document known issues that need to be fixed
 * - fixme: Mark work in progress
 * - slow: Extend timeout for tests with expected delays
 *
 * Best Practices:
 * - Remove test.only() before committing code
 * - Document reason for skip/fail/fixme in comments
 * - Use slow() only when timeout is legitimately needed
 * - Review and fix skipped/failed tests regularly
 */

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  console.log('Before each test: Navigated to base URL');
});

test.afterEach(async () => {
  console.log('After each test: Test execution completed');
});

/**
 * Test: Normal test without annotations
 *
 * Description:
 *   A standard test that runs normally without any special annotations.
 *   This test should pass and execute like all other regular tests.
 *
 * Expected Behavior:
 *   - Test executes successfully
 *   - All assertions pass
 */
test('Normal test - runs normally', async ({ page }) => {
  const usernameInput = page.locator('[data-test="username"]');
  await expect(usernameInput).toBeVisible();
});

/**
 * Test: Skip annotation
 *
 * Description:
 *   This test is skipped and will not be executed. Use this annotation
 *   to temporarily disable a test (e.g., feature not implemented, test is flaky).
 *   Shows as "skipped" in test reports.
 *
 * Expected Behavior:
 *   - Test is not executed
 *   - Test appears as "skipped" in reports
 */
test.skip('Skip annotation - this test is skipped', async ({ page }) => {
  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');
  await usernameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
});

/**
 * Test: Fail annotation
 *
 * Description:
 *   This test is marked to fail. If the test passes, it reports as a failure.
 *   If the test fails, it reports as a success. Use this to document known bugs
 *   that are not yet fixed in the application.
 *
 * Expected Behavior:
 *   - If assertion fails, test passes (as expected failure)
 *   - If assertion passes, test fails (opposite of normal behavior)
 */
test.fail('Fail annotation - known issue scenario', async ({ page }) => {
  // This assertion will fail, which is expected with test.fail()
  const usernameInput = page.locator('[data-test="nonexistent-element"]');
  await expect(usernameInput).toBeVisible();
});

/**
 * Test: Slow annotation
 *
 * Description:
 *   This test is marked as slow, which triples the default test timeout
 *   (from 30 seconds to 90 seconds). Use this for tests that legitimately
 *   require longer execution time (file uploads, slow external APIs, etc).
 *
 * Expected Behavior:
 *   - Test has extended timeout duration
 *   - Test executes with triple the normal time limit
 */
test.slow('Slow annotation - extended timeout', async ({ page }) => {
  const usernameInput = page.locator('[data-test="username"]');
  await expect(usernameInput).toBeVisible();
  // Simulate some slow operation without actually waiting
  console.log('This test has a tripled timeout (90 seconds instead of 30)');
});

/**
 * Test: Fixme annotation
 *
 * Description:
 *   This test is marked as fixme (combination of skip and fail).
 *   The test is not executed and marked in reports as "fixme".
 *   Use this for incomplete features or work in progress.
 *
 * Expected Behavior:
 *   - Test is not executed
 *   - Test appears as "fixme" in reports
 */
test.fixme('Fixme annotation - work in progress feature', async ({ page }) => {
  // This feature is not yet implemented
  // TODO: Implement this test when feature is ready
  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');
  const cartIcon = page.locator('[data-test="shopping-cart-badge"]');
  
  await usernameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
  // Feature not yet implemented - test fixture incomplete
});

/**
 * Test: Multiple annotations - Slow + Fail
 *
 * Description:
 *   Demonstrates combining multiple annotations together.
 *   This test is both slow (extended timeout) and marked to fail (known issue).
 *   Both annotations apply their effects together.
 *
 * Expected Behavior:
 *   - Test has extended timeout (90 seconds)
 *   - If assertion fails, test reports as success (expected)
 */
test.slow('Multiple annotations - slow and known issue', async ({ page }) => {
  await test.fail();
  const usernameInput = page.locator('[data-test="username"]');
  await expect(usernameInput).toBeVisible();
});

/**
 * Test: Conditional skip annotation
 *
 * Description:
 *   Demonstrates conditional skipping based on environment or conditions.
 *   The test is skipped only when the condition evaluates to true.
 *
 * Expected Behavior:
 *   - If condition is true, test is skipped
 *   - If condition is false, test executes normally
 */
test('Conditional skip - based on environment', async ({ page, browserName }) => {
  // Skip this test only in Firefox browser
  test.skip(browserName === 'firefox', 'Skipping in Firefox browser');
  
  const usernameInput = page.locator('[data-test="username"]');
  await expect(usernameInput).toBeVisible();
});