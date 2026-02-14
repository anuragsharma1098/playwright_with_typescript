import { test, expect } from '@playwright/test';

test('Dialog test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  page.on('dialog', (dialog) => {
    console.log(dialog.message());
    expect(dialog.message()).toBe('I am an alert box!');
    console.log(dialog.type());
    expect(dialog.type()).toBe('alert');
    dialog.accept();
  });
  await page.locator('#alertBtn').click();
  await page.waitForTimeout(2000);
});

test('Confirmation Dialog test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  page.on('dialog', (dialog) => {
    console.log(dialog.message());
    expect(dialog.message()).toBe('Press a button!');
    console.log(dialog.type());
    expect(dialog.type()).toBe('confirm');
    // dialog.accept();
    dialog.dismiss();
  });
  await page.locator('#confirmBtn').click();
  const demoText = await page.locator('#demo').innerText();
  console.log(demoText);
  expect(page.locator('#demo')).toHaveText('You pressed Cancel!');
  await page.waitForTimeout(2000);
});

test('Prompt Dialog test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  page.on('dialog', (dialog) => {
    console.log(dialog.message());
    expect(dialog.message()).toBe('Please enter your name:');
    console.log(dialog.type());
    expect(dialog.type()).toBe('prompt');
    expect(dialog.defaultValue()).toContain('Harry Potter');
    dialog.accept('John Doe');
  });
  await page.locator('#promptBtn').click();
  const demoText = await page.locator('#demo').innerText();
  console.log(demoText);
  expect(page.locator('#demo')).toHaveText(demoText);
  await page.waitForTimeout(2000);
});
