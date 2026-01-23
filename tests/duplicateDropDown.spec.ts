/**
 * Test suite for detecting duplicate dropdown options
 * Tests the ability to identify and report duplicate values in form dropdowns
 */

import { test, Locator } from '@playwright/test';

/**
 * Test: Duplicate DropDown
 * 
 * Description:
 * Verifies that duplicate options in a dropdown are correctly identified and logged.
 * Uses a Set data structure to track unique values and find duplicates.
 * 
 * Test Steps:
 * 1. Navigate to test automation practice website
 * 2. Locate dropdown with potential duplicate options
 * 3. Extract all option text values
 * 4. Use Set to identify duplicates
 * 5. Log results showing duplicates or confirmation of no duplicates
 */
test("Duplicate DropDown", async ({ page }) => {
    // Navigate to test automation practice website
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Select the colors dropdown which contains duplicate options
    // Note: #animals option would be used for dropdowns without duplicates
    const options: Locator = page.locator('#colors option'); // having duplicates

    // Extract all option text and trim whitespace
    const optionsText: string[] = (await options.allTextContents()).map(text => text.trim());

    // Use a Set to track unique values and identify duplicates
    const myset = new Set<string>();
    const duplicates: string[] = [];

    // Iterate through options to find duplicates
    for (const text of optionsText) {
        if (myset.has(text)) {
            // This option text already exists - it's a duplicate
            duplicates.push(text);
        } else {
            // Add this option text to the set as a unique value
            myset.add(text);
        }
    }
    
    // Log results - show duplicates if found, or confirm none found
    if (duplicates.length > 0) {
        console.log('Duplicate options found:', duplicates);
    } else {
        console.log('No duplicate options found.');
    }
});