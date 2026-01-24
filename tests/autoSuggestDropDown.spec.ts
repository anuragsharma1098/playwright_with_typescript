/**
 * Test suite for auto-suggest dropdown functionality
 * Tests handling of dynamically appearing suggestions in search inputs
 */

import { test, Locator } from '@playwright/test';

/**
 * Test: Auto-suggest drop-down functionality
 * 
 * Description:
 * Tests the auto-suggest feature on Flipkart's search input. Verifies that typing 'smart'
 * triggers suggestion options and can select 'smartphone' from the dropdown.
 * 
 * Test Steps:
 * 1. Navigate to Flipkart homepage
 * 2. Fill the search input with 'smart'
 * 3. Wait for suggestions to load dynamically
 * 4. Count total number of suggestions
 * 5. Print all suggested options to console
 * 6. Find and click 'smartphone' from the suggestions
 */
test('Auto-suggest drop-down functionality', async ({ page }) => {
    // Navigate to Flipkart homepage
    await page.goto('https://www.flipkart.com/');

    // Fill the search input with 'smart' and wait for suggestions to appear
    await page.locator('input[name="q"]').fill('smart');
    await page.waitForTimeout(8000); // wait for suggestions to load

    // Locate all suggestion items (li elements within ul)
    // Note: Do not emulate focused page in browser DevTools for accurate testing
    // Emulated focus may prevent suggestions from appearing
    // ctrl+shift+p -> Emulate focus -> Disable
    // after using disable, refresh the page and run the test again
    const suggestions: Locator = page.locator("ul>li");
    const suggestionCount = await suggestions.count();

    // Log total number of suggestions
    console.log('Total suggestions: ' + suggestionCount);

    // Print all suggested options to console for verification
    console.log('Suggested options:');
    for (let i = 0; i < suggestionCount; i++) {
        const suggestionText = await suggestions.nth(i).textContent();
        console.log(suggestionText);
    }

    // Iterate through suggestions to find and click on 'smartphone'
    for (let i = 0; i < suggestionCount; i++) {
        const suggestionText = await suggestions.nth(i).textContent();
        if (suggestionText?.trim() === 'smartphone') {
            await suggestions.nth(i).click();
            break; // Exit loop after selecting the option
        }
    }
});