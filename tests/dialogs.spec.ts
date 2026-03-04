/**
 * Dialog Handling Test Suite
 * 
 * Comprehensive tests for Playwright dialog handling
 * 
 * Dialog Types:
 * - Alert: Simple notification dialog
 * - Confirm: Dialog requiring user confirmation (accept/dismiss)
 * - Prompt: Dialog requesting user input
 * 
 * Dialog Handling:
 * - Use page.on('dialog') to listen for dialog events
 * - Inspect dialog type and message
 * - Use dialog.accept() to confirm or proceed
 * - Use dialog.dismiss() to cancel
 * - Use dialog.accept(text) to input text in prompt dialogs
 */

import { test, expect } from '@playwright/test';

/**
 * Test: Dialog test
 * 
 * Description: Verifies basic alert dialog handling and message validation
 */
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

/**
 * Test: Confirmation Dialog test
 * 
 * Description: Verifies confirm dialog handling with dismiss action and result validation
 */
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
/**
 * Test: Prompt Dialog test
 * 
 * Description: Verifies prompt dialog handling with user input and default value validation
 */
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
