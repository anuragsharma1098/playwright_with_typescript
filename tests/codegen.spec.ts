/**
 * CMD: npx playwright codegen
# Basic usage
npx playwright codegen <url>

# Common options:
npx playwright codegen --help                    # Show all options

# Output & Target
npx playwright codegen --output <file>           # Save generated code to file
npx playwright codegen --lang javascript|python|csharp|java  # Specify language

# Browser & Device
npx playwright codegen --browser chromium|firefox|webkit  # Specific browser
npx playwright codegen --device "<device name>"  # Emulate specific device (iPhone 13, Pixel 5, etc.)

# Viewport & Viewport
npx playwright codegen --viewport-size=1920,1080 # Custom viewport dimensions

# Authentication
npx playwright codegen --load-storage <file>    # Load cookies/storage before recording
npx playwright codegen --save-storage <file>    # Save cookies/storage after recording

# Behavior
npx playwright codegen --target page|library   # Generate for page object or library format
npx playwright codegen --no-wait-for-load      # Don't wait for page load
npx playwright codegen --color-scheme dark|light # Emulate color scheme

# Network
npx playwright codegen --proxy <proxy-url>      # Use proxy server
npx playwright codegen --offline                # Simulate offline mode
npx playwright codegen --network-throttling <profile>  # Throttle network

# Geolocation & Permissions
npx playwright codegen --geolocation <coordinates> # Set location
npx playwright codegen --permissions <permission>  # Grant permissions (camera, microphone, etc.)

# Examples:
npx playwright codegen https://demoblaze.com --output tests/new-test.spec.ts
npx playwright codegen --device "iPhone 13" https://example.com
npx playwright codegen --browser firefox https://example.com --output test.spec.ts
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
