import { test, expect, Locator } from '@playwright/test';

test("Multi Select DropDown Component", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    // select options from the drop down
    // using visible text
    await page.locator('#colors').selectOption(['Red', 'Blue', 'Green']);

    // using value attribute
    await page.locator('#colors').selectOption(['red', 'green', 'white']);

    // using label
    await page.locator('#colors').selectOption([{ label: 'White' }, { label: 'Blue' }]);

    // using index
    await page.locator('#colors').selectOption([{ index: 0 }, { index: 2 }]);

    // check the number of options in the drop down
    const options: Locator = page.locator('#colors option');
    const optionCount = await options.count();
    console.log("Total number of options in the drop down: " + optionCount);
    expect(optionCount).toBe(7);

    // check the option contains expected text
    const optionText = (await options.allTextContents()).map(text => text.trim());
    console.log("Options in the drop down: " + optionText);
    expect(optionText).toContain('Red');

    // printing options from the dropdown
    for (const opt of optionText) {
        console.log(opt);
    }


});