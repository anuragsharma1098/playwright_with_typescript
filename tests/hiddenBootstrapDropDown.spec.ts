import { test, expect, Locator } from '@playwright/test';

test('bootstrap hidden dropdown', async ({ page }) => {

    //login steps
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(5000);

    // click on PIM
    await page.getByText('PIM').click();

    // click on job TITLE dropdown
    await page.locator('form i').nth(2).click();
    await page.waitForTimeout(3000);

    // capture all the options from dropdown
    const options = page.locator("div[role='listbox'] span");
    const optionCount = await options.count();
    console.log('Total options: ' + optionCount);

    // print all the options from dropdown
    console.log('Dropdown options:');
    for (let i = 0; i < optionCount; i++) {
        const optionText = await options.nth(i).textContent();
        console.log(optionText);
    }

    // select specific option from dropdown
    for (let i = 0; i < optionCount; i++) {
        const optionText = await options.nth(i).textContent();
        if (optionText?.trim() === 'Automaton Tester') {
            await options.nth(i).click();
            break;
        }
    }

    await page.waitForTimeout(5000);
    // await page.getByText('Automaton Tester', { exact: true }).click();
});