import { test, expect, Locator } from '@playwright/test';

test("Verify Sorted DropDown", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const options: Locator = page.locator('#animals option');
    console.log(await options.allTextContents());
    const optionText: string[] = (await options.allTextContents()).map(text => text.trim());
    console.log("Options in the drop down: " + optionText);

    const originalList: string[] = optionText;
    console.log("Original list: " + originalList);
    const sortedList: string[] = [...originalList].sort();
    console.log("Sorted list: " + sortedList);

    expect(originalList).toEqual(sortedList);
});