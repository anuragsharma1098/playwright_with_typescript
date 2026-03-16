import { test, expect } from '@playwright/test';

const loginTestData: string[][] = [
  ['laura.taylor1234@example.com', 'test123', 'valid'],
  ['invaliduser@example.com', 'test321', 'invalid'],
  ['valid@example.com', 'testxyz', 'invalid'],
  ['', '', 'invalid'],
];

test('Login Test', async ({ page }) => {
  await page.goto('https://www.demowebshop.tricentis.com/login');

  //fill login form
  await page.locator('#Email').fill(email);
  await page.locator('#Password').fill(password);
  await page.locator('input[value="Log in"]').click();

  if (validity.toLowerCase() === 'valid') {
    const logoutLink = page.locator('a:[href="/logout"]');
    await expect(logoutLink).toBeVisible({ timeout: 5000 });
  } else {
    const errorMessage = page.locator('.validation-summary-errors');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });

    await expect(page).toHaveURL('https://www.demowebshop.tricentis.com/login');
  }
});
