import { test, expect } from '@playwright/test';

test.describe('Parameter Tests', () => {
  test('should handle parameters correctly', async () => {
    // Example function to test
    function add(a: number, b: number): number {
      return a + b;
    }
    expect(add(2, 3)).toBe(5);
  });

  test('should handle optional parameters', async () => {
    // Example function with optional parameter
    function greet(name: string, greeting?: string): string {
      return `${greeting || 'Hello'}, ${name}!`;
    }
    expect(greet('Alice')).toBe('Hello, Alice!');
    expect(greet('Bob', 'Hi')).toBe('Hi, Bob!');
  });

  test('should handle default parameters', async () => {
    // Example function with default parameter
    function multiply(a: number, b: number = 2): number {
      return a * b;
    }
    expect(multiply(3)).toBe(6);
    expect(multiply(3, 4)).toBe(12);
  });
});

// using for-of loop
const searchItems: string[] = ['laptop', 'Gift Card', 'smartphone'];
for (const item of searchItems) {
  test(`${item} search test`, async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await page.locator('#small-searchterms').fill(item);
    await page.locator('input[value="Search"]').click();
    await expect(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true });
  });
}

// using forEach function
const searchItemsForEach: string[] = ['laptop', 'Gift Card', 'smartphone'];
searchItemsForEach.forEach((item) => {
  test(`${item} search tests`, async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await page.locator('#small-searchterms').fill(item);
    await page.locator('input[value="Search"]').click();
    await expect(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true });
  });
});

// describe
const searchItemsDescribe: string[] = ['laptop', 'Gift Card', 'smartphone'];
test.describe('Search Tests', () => {
  searchItemsDescribe.forEach((item) => {
    test(`${item} search test`, async ({ page }) => {
      await page.goto('https://demowebshop.tricentis.com/');
      await page.locator('#small-searchterms').fill(item);
      await page.locator('input[value="Search"]').click();
      await expect(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true });
    });
  });
});
