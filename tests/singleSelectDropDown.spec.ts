import { test, expect, Locator } from '@playwright/test';

test("Single Select DropDown Component", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    // select option from the drop down(4 ways)

    // await page.locator('#country').selectOption('Australia'); // visible text
    // await page.locator('#country').selectOption({ label: 'Australia' }); // visible text
    // await page.locator('#country').selectOption({ value: 'Australia' }); // value attribute
    // await page.locator('#country').selectOption({ index: 3 }); // index position


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