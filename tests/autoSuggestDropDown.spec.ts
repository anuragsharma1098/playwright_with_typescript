import { test, expect, Locator } from '@playwright/test';

test('Auto-suggest drop-down functionality', async ({ page }) => {
    await page.goto('https://www.flipkart.com/');

    await page.locator('input[name="q"]').fill('smart');
    await page.waitForTimeout(8000); // wait for suggestions to load

    // get all the suggested options -->ctrl+shipt+p on DOM --> emulate focused page 
    // do not emulate focused page
    const suggestions: Locator = page.locator("ul>li");
    const suggestionCount = await suggestions.count();

    console.log('Total suggestions: ' + suggestionCount);

    // printing all the suggested options
    console.log('Suggested options:');
    for (let i = 0; i < suggestionCount; i++) {
        const suggestionText = await suggestions.nth(i).textContent();
        console.log(suggestionText);
    }

    // select/click on a specific option from the suggestions
    for (let i = 0; i < suggestionCount; i++) {
        const suggestionText = await suggestions.nth(i).textContent();
        if (suggestionText?.trim() === 'smartphone') {
            await suggestions.nth(i).click();
            break;
        }
    }
});