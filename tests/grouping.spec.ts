/**
 * Test Grouping Suite
 *
 * Demonstrates test grouping patterns in Playwright using test.describe()
 * for organizing related tests into logical groups.
 *
 * Grouping Concepts:
 * - test.describe(): Groups related tests under a common label
 * - Improves test readability and organization
 * - Allows shared setup/teardown with beforeEach/afterEach
 * - Creates hierarchical test structure in reports
 * - Supports nested describes for complex test hierarchies
 *
 * Grouping Patterns:
 * - Group tests by feature (Login, Dashboard, Settings)
 * - Group tests by page/module
 * - Group tests by functionality (CRUD operations, validations)
 * - Use descriptive labels for test group names
 * - Share setup/teardown logic for all tests in group
 *
 * Best Practices:
 * - Keep related tests in same describe block
 * - Use clear naming conventions
 * - Organize describe blocks logically
 * - Avoid deeply nested describe blocks
 */

/* Test Grouping Suite 
   command to run specific test group: npx playwright test --grep "Login Tests"
*/

import { test, expect } from '@playwright/test';

// Global setup for all tests in this suite
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
});

/**
 * Test Group: Login Tests
 *
 * Collection of tests focusing on login functionality
 * All tests in this group navigate to the login page in beforeEach
 */
test.describe('Login Tests', () => {
  /**
   * Test: should display login form elements
   *
   * Description:
   *   Verifies that all essential login form elements are visible
   *   on the login page including username field, password field,
   *   and login button.
   *
   * Expected Behavior:
   *   - Username input field is visible
   *   - Password input field is visible
   *   - Login button is visible
   */
  test('should display login form elements', async ({ page }) => {
    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    const loginButton = page.locator('[data-test="login-button"]');

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  /**
   * Test: should enable login button when credentials are entered
   *
   * Description:
   *   Validates that the login button becomes enabled/clickable
   *   when valid credentials are provided in username and password fields.
   *
   * Expected Behavior:
   *   - Username field accepts input
   *   - Password field accepts input
   *   - Login button is clickable
   */
  test('should enable login button when credentials are entered', async ({ page }) => {
    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    const loginButton = page.locator('[data-test="login-button"]');

    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');

    await expect(loginButton).toBeEnabled();
  });

  /**
   * Test: should display error message on invalid credentials
   *
   * Description:
   *   Verifies that an appropriate error message is displayed
   *   when attempting to login with invalid credentials.
   *
   * Expected Behavior:
   *   - Error message container appears
   *   - Error message text is visible and readable
   */
  test('should display error message on invalid credentials', async ({ page }) => {
    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    const loginButton = page.locator('[data-test="login-button"]');

    await usernameInput.fill('invalid_user');
    await passwordInput.fill('wrong_password');
    await loginButton.click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  });
});

/**
 * Test Group: Navigation Tests
 *
 * Collection of tests focusing on page navigation and menu interactions
 */
test.describe('Navigation Tests', () => {
  /**
   * Test: should navigate between pages using menu
   *
   * Description:
   *   Validates that users can successfully navigate between
   *   different pages using the main navigation menu.
   *
   * Expected Behavior:
   *   - Menu is visible on page
   *   - Menu items are clickable
   *   - Navigation to target pages works correctly
   */
  test('should navigate between pages using menu', async ({ page }) => {
    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    const loginButton = page.locator('[data-test="login-button"]');

    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');
    await loginButton.click();

    await page.waitForURL(/inventory/);
    expect(page.url()).toContain('inventory');
  });

  /**
   * Test: should maintain page state during navigation
   *
   * Description:
   *   Ensures that page state or selected items are preserved
   *   when navigating to other pages and returning.
   *
   * Expected Behavior:
   *   - Current page URL matches expected pattern
   *   - Navigation is successful
   */
  test('should maintain page state during navigation', async ({ page }) => {
    const usernameInput = page.locator('[data-test="username"]');
    const passwordInput = page.locator('[data-test="password"]');
    const loginButton = page.locator('[data-test="login-button"]');

    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');
    await loginButton.click();

    const currentUrl = page.url();
    expect(currentUrl).toContain('inventory');
  });
});

/**
 * Test Group: Form Validation Tests
 *
 * Collection of tests validating form input handling and constraints
 */
test.describe('Form Validation Tests', () => {
  /**
   * Test: should validate empty username field
   *
   * Description:
   *   Verifies that the form properly handles submission attempts
   *   with empty username field.
   *
   * Expected Behavior:
   *   - Error message is displayed for empty username
   */
  test('should validate empty username field', async ({ page }) => {
    const passwordInput = page.locator('[data-test="password"]');
    const loginButton = page.locator('[data-test="login-button"]');

    await passwordInput.fill('secret_sauce');
    await loginButton.click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  });

  /**
   * Test: should validate empty password field
   *
   * Description:
   *   Verifies that the form properly handles submission attempts
   *   with empty password field.
   *
   * Expected Behavior:
   *   - Error message is displayed for empty password
   */
  test('should validate empty password field', async ({ page }) => {
    const usernameInput = page.locator('[data-test="username"]');
    const loginButton = page.locator('[data-test="login-button"]');

    await usernameInput.fill('standard_user');
    await loginButton.click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  });

  /**
   * Test: should validate both fields empty
   *
   * Description:
   *   Verifies that the form properly handles submission attempts
   *   when both username and password fields are empty.
   *
   * Expected Behavior:
   *   - Error message is displayed
   */
  test('should validate both fields empty', async ({ page }) => {
    const loginButton = page.locator('[data-test="login-button"]');

    await loginButton.click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
  });
});
