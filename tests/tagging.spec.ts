import { test, expect } from '@playwright/test';
import { before } from 'node:test';

// test1 - sanity test
// test2 - regression test
// test3 - smoke test

/*
 run all sanity tests: npx playwright test --grep @sanity
 run all regression tests: npx playwright test --grep @regression
  run all smoke tests: npx playwright test --grep @smoke

  run test with multiple tags: npx playwright test --grep @sanity --grep @regression
  run test with multiple tags: npx playwright test --grep @smoke --grep @regression

  npx playwright test --grep "(?=.*@sanity)(?=.*@regression)" - runs tests tagged with both sanity and regression
  npx playwright test --grep "(?=.*@smoke)(?=.*@regression)" - runs tests tagged with both smoke and regression

  run either sanity or regression tests: npx playwright test --grep "@sanity|@regression"
  run either smoke or regression tests: npx playwright test --grep "@smoke|@regression"
*/
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('Sanity test - runs normally', { tag: '@sanity' }, async ({ page }) => {
  const usernameInput = page.locator('[data-test="username"]');
  await expect(usernameInput).toBeVisible();
});

test('Regression test - this test is skipped', { tag: '@regression' }, async ({ page }) => {
  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');
  await usernameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
});

// test('Smoke test - known issue scenario', { tag: '@smoke' }, async ({ page }) => {
//   // This assertion will fail, which is expected with test.fail()
//   const usernameInput = page.locator('[data-test="nonexistent-element"]');
//   await expect(usernameInput).toBeVisible();
// });

// sanity and regression

test(
  'Sanity and Regression test - runs normally',
  { tag: ['@sanity', '@regression'] },
  async ({ page }) => {
    const usernameInput = page.locator('[data-test="username"]');
    await expect(usernameInput).toBeVisible();
  }
);

// smoke and regression
// test(
//   'Smoke and Regression test - known issue scenario',
//   { tag: ['@smoke', '@regression'] },
//   async ({ page }) => {
//     // This assertion will fail, which is expected with test.fail()
//     const usernameInput = page.locator('[data-test="nonexistent-element"]');
//     await expect(usernameInput).toBeVisible();
//   }
// );
