import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import { parse } from 'csv-parse/sync';

//Prerequisite:
// Install the csv-parse package using npm:
// npm install csv-parse

// Parse CSV data
const csvPath = './test-data/credentials_csv.csv';
const csvData = fs.readFileSync(csvPath, 'utf-8');
const loginData:any = parse(csvData, { columns: true, skip_empty_lines: true });

test.describe('Login Tests', async () => {
  for (const data of loginData) {
    test(`Login test for "${data.email}" - "${data.validity}"`, async ({ page }) => {
      await page.goto('https://demowebshop.tricentis.com/login');

      //fill login form
      await page.locator('#Email').fill(data.email);
      await page.locator('#Password').fill(data.password);
      await page.locator('input[value="Log in"]').click();

      if (data.validity.toLowerCase() === 'valid') {
        const logoutLink = page.locator('a[href="/logout"]');
        await expect(logoutLink).toBeVisible({ timeout: 5000 });
      } else {
        const errorMessage = page.locator('.validation-summary-errors');
        await expect(errorMessage).toBeVisible({ timeout: 5000 });

        await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
      }
    });
  }
});
