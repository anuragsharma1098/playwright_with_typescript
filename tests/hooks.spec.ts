import { test, expect, Page } from '@playwright/test';
let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('https://www.tricentis.com/');
  console.log('Before all tests: Navigated to Tricentis homepage');
});
test.afterAll(async () => {
  await page.close();
  console.log('After all tests: Closed Tricentis page');
});

test.beforeEach(async () => {
  console.log('Before each test: Test started');
});

test.afterEach(async () => {
  console.log('After each test: Test completed');
});

test('should have the correct title', async () => {
  console.log('Running test: should have the correct title');
  await expect(page).toHaveTitle('AI-powered automated testing software tools | Tricentis');
});

test('should have the correct URL', async () => {
  console.log('Running test: should have the correct URL');
  await expect(page).toHaveURL('https://www.tricentis.com/');
});
