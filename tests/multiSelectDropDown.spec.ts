/**
 * Test suite for multi-select dropdown components
 * Demonstrates various methods of selecting multiple options from a dropdown
 */

import { test, expect, Locator } from '@playwright/test';

/**
 * Test: Multi Select DropDown Component
 * 
 * Description:
 * Tests selecting multiple options from a dropdown using different selection methods:
 * - Visible text labels
 * - Value attributes
 * - Label matching
 * - Index positions
 * 
 * Also validates dropdown properties and verifies selected options.
 */
test("Multi Select DropDown Component", async ({ page }) => {
    // Navigate to test automation practice website
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Select multiple options using visible text
    await page.locator('#colors').selectOption(['Red', 'Blue', 'Green']);

    // Select options using value attribute
    await page.locator('#colors').selectOption(['red', 'green', 'white']);

    // Select options using label object notation
    await page.locator('#colors').selectOption([{ label: 'White' }, { label: 'Blue' }]);

    // Select options using index position
    await page.locator('#colors').selectOption([{ index: 0 }, { index: 2 }]);

    // Get all dropdown options and count them
    const options: Locator = page.locator('#colors option');
    const optionCount = await options.count();
    console.log("Total number of options in the drop down: " + optionCount);
    expect(optionCount).toBe(7);

    // Extract all option text and verify expected values are present
    const optionText = (await options.allTextContents()).map(text => text.trim());
    console.log("Options in the drop down: " + optionText);
    expect(optionText).toContain('Red');

    // Print all available options from the dropdown
    for (const opt of optionText) {
        console.log(opt);
    }
});