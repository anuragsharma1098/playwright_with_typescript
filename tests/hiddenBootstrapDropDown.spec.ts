/**
 * Test suite for Bootstrap hidden dropdown interaction
 * Tests handling of Bootstrap dropdown components that render dynamically
 */

import { test, expect, Locator } from '@playwright/test';

/**
 * Test: bootstrap hidden dropdown
 * 
 * Description:
 * Tests interaction with a hidden Bootstrap dropdown on the OrangeHRM application.
 * Logs in to the system, navigates to PIM section, opens a dropdown, and selects an option.
 * Demonstrates handling of hidden elements that become visible upon interaction.
 * 
 * Test Steps:
 * 1. Navigate to OrangeHRM login page
 * 2. Enter username 'Admin' and password 'admin123'
 * 3. Click submit button to login
 * 4. Navigate to PIM section
 * 5. Click dropdown trigger to reveal hidden options
 * 6. Extract all dropdown options
 * 7. Find and click on 'Automaton Tester' option
 */
test('bootstrap hidden dropdown', async ({ page }) => {
    // Login steps
    // Navigate to OrangeHRM login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    // Enter credentials
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    
    // Submit login form
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(5000);

    // Click on PIM menu item
    await page.getByText('PIM').click();

    // Click on job TITLE dropdown trigger (form icon)
    await page.locator('form i').nth(2).click();
    await page.waitForTimeout(3000);

    // Capture all dropdown option elements
    // Bootstrap dropdown options are in a listbox with span elements
    const options = page.locator("div[role='listbox'] span");
    const optionCount = await options.count();
    console.log('Total options: ' + optionCount);

    // Print all dropdown options to console
    console.log('Dropdown options:');
    for (let i = 0; i < optionCount; i++) {
        const optionText = await options.nth(i).textContent();
        console.log(optionText);
    }

    // Find and click on 'Automaton Tester' option
    for (let i = 0; i < optionCount; i++) {
        const optionText = await options.nth(i).textContent();
        if (optionText?.trim() === 'Automaton Tester') {
            await options.nth(i).click();
            break; // Exit loop after clicking the option
        }
    }

    // Wait for action to complete
    await page.waitForTimeout(5000);
});