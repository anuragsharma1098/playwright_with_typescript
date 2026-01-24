/**
 * Test suite for single-select dropdown components
 * Demonstrates various methods of selecting options from a dropdown
 */

import { test, expect, Locator } from '@playwright/test';

/**
 * Test: Single Select DropDown Component
 * 
 * Description:
 * Tests selecting an option from a single-select dropdown using different methods.
 * Also validates dropdown properties and verifies available options.
 * 
 * Selection Methods:
 * 1. By visible text: selectOption('text')
 * 2. By label object: selectOption({ label: 'text' })
 * 3. By value attribute: selectOption({ value: 'attr' })
 * 4. By index position: selectOption({ index: n })
 */
test("Single Select DropDown Component", async ({ page }) => {
    // Navigate to test automation practice website
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Select option from dropdown using different approaches:
    // By visible text: await page.locator('#country').selectOption('Australia');
    // By label: await page.locator('#country').selectOption({ label: 'Australia' });
    // By value attribute: await page.locator('#country').selectOption({ value: 'Australia' });
    // By index position: await page.locator('#country').selectOption({ index: 3 });

    // Select 'India' by visible text
    await page.locator('#country').selectOption('India');
    await page.waitForTimeout(2000);

    // check number of options in the drop down
    const options: Locator = page.locator('#country option');
    const optionCount = await options.count();
    console.log("Total options in the drop down: " + optionCount);
    await expect(options).toHaveCount(10);

    // check an option is present in the drop down

    // method 1
    // const optionTextToCheck = 'India';
    // let isOptionPresent = false;
    // for (let i = 0; i < optionCount; i++) {
    //     const optionText = await options.nth(i).textContent();
    //     console.log("Option " + i + ": " + optionText);
    //     if (optionText?.trim() === optionTextToCheck) {
    //         isOptionPresent = true;
    //         break;
    //     }
    // }
    // expect(isOptionPresent).toBeTruthy();

    // method 2
    const optionsText: string[] = (await options.allTextContents()).map(text => text.trim());
    console.log("Options in the drop down: ", optionsText);
    expect(optionsText).toContain('Japan');

    // printing options from drop down
    
    // for (let i = 0; i < optionCount; i++) {
    //     const optionText = await options.nth(i).textContent();
    //     console.log("Option " + i + ": " + optionText);
    // }
    
    for (const opt of optionsText) {
        console.log(opt);
    }
});