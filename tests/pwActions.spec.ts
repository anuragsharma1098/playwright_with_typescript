/**
 * Test suite for Playwright user interaction actions
 * Tests text input, radio buttons, and checkbox interactions
 */

import { test, expect, Locator } from '@playwright/test';

/**
 * Test: Text Input Action
 * 
 * Description:
 * Comprehensive test demonstrating various user interaction actions:
 * - Text input fill and validation
 * - Radio button selection
 * - Checkbox selection and deselection
 * - Conditional checkbox handling
 * - Batch checkbox operations
 * 
 * Test Steps:
 * 1. Navigate to test automation practice website
 * 2. Test text input with validation
 * 3. Test radio button selection
 * 4. Test individual checkbox selection
 * 5. Test batch checkbox operations (check all, uncheck specific)
 * 6. Test conditional checkbox logic
 * 7. Test random checkbox selection
 * 8. Test selection by label
 */
test('Text Input Action', async ({ page }) => {
    // Navigate to test automation practice website
    await page.goto('https://testautomationpractice.blogspot.com/');
    
    // Locate the text input field
    const textBox: Locator = page.locator('input[placeholder="Enter Name"]');
    
    // Verify text box visibility and enabled state
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();
    
    // Get and verify maxlength attribute
    const maxLength: string | null = await textBox.getAttribute('maxlength');
    expect(maxLength).toBe('15');
    
    // Fill the text box and verify the input value
    await textBox.fill('Name Name');
    console.log('Input value of the text box: ', await textBox.inputValue());
    expect(await textBox.inputValue()).toBe('Name Name');
    await page.waitForTimeout(2000);

    // Test radio button selection
    const maleRadio: Locator = page.locator("//input[@id='male']");
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    await maleRadio.check();
    expect(await maleRadio.isChecked()).toBeTruthy();
    await page.waitForTimeout(2000);

    // Test individual checkbox selection
    const sunday = page.getByLabel('Sunday');
    await expect(sunday).toBeVisible();
    await expect(sunday).toBeEnabled();
    await sunday.check();
    expect(await sunday.isChecked()).toBeTruthy();
    await page.waitForTimeout(2000);

    // Create array of all weekday checkboxes
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes: Locator[] = days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);
    
    // Check all checkboxes
    for (const checkbox of checkboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    // Uncheck specific days: Monday, Tuesday, Friday
    const uncheckDays: string[] = ['Monday', 'Tuesday', 'Friday'];
    for (const day of uncheckDays) {
        await checkboxes[days.indexOf(day)].uncheck();
        await expect(checkboxes[days.indexOf(day)]).not.toBeChecked();
    }

    // Toggle checkboxes based on current state (check if unchecked, uncheck if checked)
    for (const checkbox of checkboxes) {
        // If checkbox is currently checked, uncheck it
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }
        // If checkbox is unchecked, check it
        else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

    // Select specific checkboxes by index (Sunday, Tuesday, Thursday)
    const indexesToCheck: number[] = [0, 2, 4];
    for (const index of indexesToCheck) {
        await checkboxes[index].check();
        await expect(checkboxes[index]).toBeChecked();
    }

    // Select checkbox by label text
    const labelToSelect: string = 'Friday';
    const labelLocator: Locator = page.getByLabel(labelToSelect);
    await labelLocator.check();
    expect(await labelLocator.isChecked()).toBeTruthy();
});