import { test, expect } from '@playwright/test';

// test.describe.configure({ mode: 'serial' });
// test.describe.configure({ mode: 'parallel' });

// syntex
// npx playwright test tests/parallelTesting.spec.ts --project=chromium --reporter=list

test.describe('Parallel Testing', () => {
  test('Test 1', async () => {
    console.log('Running Test 1');
    expect(1 + 1).toBe(2);
  });

  test('Test 2', async () => {
    console.log('Running Test 2');
    expect(2 * 2).toBe(4);
  });

  test('Test 3', async () => {
    console.log('Running Test 3');
    expect(3 - 1).toBe(2);
  });

  test('Test 4', async () => {
    console.log('Running Test 4');
    expect(4 / 2).toBe(2);
  });

  test('Test 5', async () => {
    console.log('Running Test 5');
    expect(5 % 2).toBe(1);
  });
});
