/**
 * Screenshots Test Suite
 *
 * Comprehensive tests for capturing page screenshots in Playwright
 *
 * Screenshot Concepts:
 * - page.screenshot(): Captures a screenshot of the current viewport or full page
 * - Options:
 *   - path: string - File path to save the screenshot (PNG format)
 *   - fullPage: boolean - Captures entire page scrollable area (default: false)
 *   - clip: Object - Crops screenshot to specific coordinates
 *   - omitBackground: boolean - Transparent background for PNG
 * - Buffer Return: When called without path option, returns screenshot as buffer
 * - Use Cases:
 *   - Visual regression testing
 *   - Test result documentation
 *   - Debugging test failures with visual context
 *   - Creating test reports with screenshots
 *
 * Screenshot Patterns:
 * - Use timestamps to avoid file naming conflicts
 * - Save partial viewport screenshots for focused testing
 * - Save full page screenshots for complete page context
 * - Assert screenshot buffers for validation
 */

import { test, expect } from '@playwright/test';

/**
 * Test: should take a screenshot of the page
 *
 * Description:
 *   Demonstrates multiple screenshot capture techniques including viewport-only
 *   screenshots, full page screenshots, and screenshot buffer assertions.
 *   Saves screenshots to timestamped files for visual verification.
 *
 * Steps:
 *   1. Navigate to https://www.google.com
 *   2. Generate a unique timestamp for screenshot file naming
 *   3. Capture viewport screenshot and save to screenshots/google-{timestamp}.png
 *   4. Navigate to https://www.testrail.com/
 *   5. Capture full page screenshot and save to screenshots/google-full-{timestamp}.png
 *   6. Capture screenshot as buffer (without saving) and assert it exists
 *
 * Expected Behavior:
 *   - Viewport screenshot is captured and saved successfully
 *   - Full page screenshot captures entire scrollable content and saves successfully
 *   - Screenshot buffer is returned and is not empty (truthy)
 *   - All screenshot files are created in screenshots/ directory
 */
test('should take a screenshot of the page', async ({ page }) => {
  await page.goto('https://www.google.com');
  const timestamp = Date.now();
  // page screenshot
  await page.screenshot({ path: `screenshots/google-${timestamp}.png` });
  // full page screenshot
  await page.goto('https://www.testrail.com/');
  await page.screenshot({ path: `screenshots/google-full-${timestamp}.png`, fullPage: true });
  const screenshot = await page.screenshot();
  expect(screenshot).toBeTruthy();
});
