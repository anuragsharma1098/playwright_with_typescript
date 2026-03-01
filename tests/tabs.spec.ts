import { test, expect, chromium } from '@playwright/test';

test('handle tabs', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Open a new page (tab) in the browser context
  const parentPage = await context.newPage();

  await parentPage.goto('https://testautomationpractice.blogspot.com/');

  // context.waitForEvent('page');
  // parentPage.locator("button:has-text('New Tab')").click();

  const [childPage] = await Promise.all([
    context.waitForEvent('page'),
    parentPage.locator("button:has-text('New Tab')").click(),
  ]);

  const pages = context.pages();
  console.log('Total Pages: ', pages.length);

  for (const page of pages) {
    console.log('Page Title: ', await page.title());
  }

  console.log('Parent Page URL: ', parentPage.url());
  console.log('Parent Page Title: ', await parentPage.title());
  console.log('Child Page URL: ', childPage.url());
  console.log('Child Page Title: ', await childPage.title());
});
