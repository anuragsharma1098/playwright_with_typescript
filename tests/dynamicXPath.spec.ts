import { test, expect, Locator } from "@playwright/test"

test('Dynamic WebElement Handling', async ({ page }) => {

    page.goto("https://testautomationpractice.blogspot.com/");
    for (let i = 1; i <= 5; i++) {
        let button: Locator = page.locator('//button[text()="STOP" or text()="START"]');
        // let button = await page.locator('//button[@name="start"]');
        // let button = await page.locator('//button[@name="start" or @name="stop"]');
        // let button = await page.locator('//button[contains(@name,"st")]');
        // let button = await page.locator('//button[starts-with(@name,"st")]');
        await button.click();
        await page.waitForTimeout(2000);

    }
});