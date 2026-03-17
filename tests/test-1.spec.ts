import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/login');
  await page.getByRole('textbox', { name: 'Email:' }).click();
});