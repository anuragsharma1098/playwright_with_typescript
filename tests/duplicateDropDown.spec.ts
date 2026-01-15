import { test, expect, Locator } from '@playwright/test';

test("Duplicate DropDown", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    // const options: Locator = page.locator('#animals option'); // not having duplicates
    const options: Locator = page.locator('#colors option'); // having duplicates

    const optionsText: string[] = (await options.allTextContents()).map(text => text.trim());

    const myset = new Set<string>();
    const duplicates: string[] = [];

    for (const text of optionsText) {
        if (myset.has(text)) {
            duplicates.push(text);
        } else {
            myset.add(text);
        }
    }
    if (duplicates.length > 0) {
        console.log('Duplicate options found:', duplicates);
    } else {
        console.log('No duplicate options found.');
    }
});