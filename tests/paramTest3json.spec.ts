import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const jsonPath = './test-data/loginTestData.json';

const loginData: any = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// const loginTestData: [string, string, string][] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

for (const { email, password, validity } of loginData) {
  test.describe('Login Tests', async () => {
    test(`Login test for ${email} - ${validity}`, async ({ page }) => {
      await page.goto('https://demowebshop.tricentis.com/login');

      //fill login form
      await page.locator('#Email').fill(email);
      await page.locator('#Password').fill(password);
      await page.locator('input[value="Log in"]').click();

      if (validity.toLowerCase() === 'valid') {
        const logoutLink = page.locator('a[href="/logout"]');
        await expect(logoutLink).toBeVisible({ timeout: 5000 });
      } else {
        const errorMessage = page.locator('.validation-summary-errors');
        await expect(errorMessage).toBeVisible({ timeout: 5000 });

        await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
      }
    });
  });
}
