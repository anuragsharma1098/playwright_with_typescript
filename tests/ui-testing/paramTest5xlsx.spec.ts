import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import * as XLSX from 'xlsx';

//Prerequisite:
// Install the xlsx package using npm:
// npm install xlsx

// Parse Excel data
const excelPath = './test-data/credentials.xlsx';
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const loginData:any = XLSX.utils.sheet_to_json(worksheet);
// const loginData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

test.describe('Login Tests', async () => {
  for (const { email, password, validity } of loginData) {
    test(`Login test for "${email}" - "${validity}"`, async ({ page }) => {
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
  }
});
