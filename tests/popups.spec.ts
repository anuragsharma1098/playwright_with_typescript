import { test, expect, Page } from '@playwright/test';

test('handle popups', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://testautomationpractice.blogspot.com/');

  await Promise.all([page.waitForEvent('popup'), 
    await page.locator('#PopUp').click()]);

  const allPopupwindows = context.pages();
  console.log('allPopupwindows.length:', allPopupwindows.length);

  // Parent Page URL
  console.log('allPopupwindows[0].url():', await allPopupwindows[0].url());
  // PopUp Page URL
  console.log('allPopupwindows[1].url():', await allPopupwindows[1].url());
});
