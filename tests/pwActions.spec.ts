import { test, expect, Locator } from '@playwright/test';

test('Text Input Action', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const textBox: Locator = page.locator('input[placeholder="Enter Name"]');
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();
    const maxLength: string | null = await textBox.getAttribute('maxlength');
    expect(maxLength).toBe('15');
    await textBox.fill('Name Name');
    console.log('Input value of the text box: ', await textBox.inputValue());
    expect(await textBox.inputValue()).toBe('Name Name');
    await page.waitForTimeout(2000);

    const maleRadio: Locator = page.locator("//input[@id='male']");
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    await maleRadio.check();
    expect(await maleRadio.isChecked()).toBeTruthy();
    await page.waitForTimeout(2000);

    const sunday = page.getByLabel('Sunday');
    await expect(sunday).toBeVisible();
    await expect(sunday).toBeEnabled();
    await sunday.check();
    expect(await sunday.isChecked()).toBeTruthy();
    await page.waitForTimeout(2000);

    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes: Locator[] = days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);
    // for (const day of days) {
    //     const dayLocator = page.getByLabel(day);
    //     await expect(dayLocator).toBeVisible();
    //     await expect(dayLocator).toBeEnabled();
    //     await dayLocator.check();
    //     expect(await dayLocator.isChecked()).toBeTruthy();
    //     await page.waitForTimeout(1000);
    // }
    for (const checkbox of checkboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    // uncheck monday tuesday friday
    const uncheckDays: string[] = ['Monday', 'Tuesday', 'Friday'];
    // for (const day of uncheckDays) {
    //     const dayLocator = page.getByLabel(day);
    //     await expect(dayLocator).toBeVisible();
    //     await expect(dayLocator).toBeEnabled();
    //     await dayLocator.uncheck();
    //     expect(await dayLocator.isChecked()).toBeFalsy();
    //     await page.waitForTimeout(1000);
    // }
    for (const day of uncheckDays) {
        await checkboxes[days.indexOf(day)].uncheck();
        await expect(checkboxes[days.indexOf(day)]).not.toBeChecked();
    }

    for (const checkbox of checkboxes) {

        // only if checked
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }
        // only if unchecked
        // if (!(await checkbox.isChecked())) {
        else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

    // randomly select checkboxes
    const indexesToCheck: number[] = [0, 2, 4]; // Sunday, Tuesday, Thursday
    for (const index of indexesToCheck) {
        await checkboxes[index].check();
        await expect(checkboxes[index]).toBeChecked();
    }

    // select checkbox based on label
    const labelToSelect: string = 'Friday';
    const labelLocator: Locator = page.getByLabel(labelToSelect);
    await labelLocator.check();
    expect(await labelLocator.isChecked()).toBeTruthy();
});