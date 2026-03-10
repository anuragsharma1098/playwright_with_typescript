/**
 * CMD: npx playwright codegen
 * Codegen test suite
 * Tests generated using Playwright's codegen feature for recording user interactions
 */

import { test, expect } from '@playwright/test';

/**
 * Test: User login and shopping workflow
 *
 * Description: Records a complete user journey including login, 
 * product browsing, adding to cart, and logout
 */
test('test', async ({ page }) => {
  // Navigate to DemoBlaze e-commerce website
  await page.goto('https://demoblaze.com/');

  // Click on log in link
  await page.getByRole('link', { name: 'Log in' }).click();

  // Fill in username credentials
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('admin');

  // Fill in password credentials
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('admin');

  // Submit login form
  await page.getByRole('button', { name: 'Log in' }).click();

  // Navigate to Phones category
  await page.getByRole('link', { name: 'Phones' }).click();

  // Navigate to Laptops category
  await page.getByRole('link', { name: 'Laptops' }).click();

  // Click on Dell laptop product
  await page.getByText('2017 Dell 15.6 Inch$7007th').click();

  // Navigate to Dell product details page
  await page.getByRole('link', { name: 'Dell 15.6 Inch' }).click();

  // Handle browser dialog/popup
  page.once('dialog', (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  // Add product to shopping cart
  await page.getByRole('link', { name: 'Add to cart' }).click();

  // Navigate to shopping cart
  await page.getByRole('link', { name: 'Cart', exact: true }).click();

  // Remove item from cart
  await page.getByRole('link', { name: 'Delete' }).click();

  // Log out from user account
  await page.getByRole('link', { name: 'Log out' }).click();
});
