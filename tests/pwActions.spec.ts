import { test, expect, Locator } from '@playwright/test';

test('Text Input Action', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const textBox: Locator = page.locator('name');
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();
    await textBox.fill('Name Name');




});