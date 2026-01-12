import { test, expect, Locator } from '@playwright/test';

test('Text Input Action', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const textBox: Locator = page.locator('input[placeholder="Enter Name"]');
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();
    await textBox.fill('Name Name');




});