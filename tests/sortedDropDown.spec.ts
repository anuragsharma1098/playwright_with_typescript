/**
 * Test suite for dropdown option sorting verification
 * Verifies that dropdown options are presented in alphabetical order
 */

import { test, expect, Locator } from '@playwright/test';

/**
 * Test: Verify Sorted DropDown
 * 
 * Description:
 * Verifies that dropdown options are sorted alphabetically.
 * Extracts all options, creates a sorted copy, and compares the two lists
 * to ensure they match in order.
 * 
 * Test Steps:
 * 1. Navigate to test automation practice website
 * 2. Locate all options in the animals dropdown
 * 3. Extract option text and trim whitespace
 * 4. Create a sorted copy of the options
 * 5. Compare original list with sorted list
 * 6. Assert they are equal (options are sorted)
 */
test("Verify Sorted DropDown", async ({ page }) => {
    // Navigate to test automation practice website
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Locate all options in the animals dropdown
    const options: Locator = page.locator('#animals option');
    
    // Extract all option text and trim whitespace
    console.log(await options.allTextContents());
    const optionText: string[] = (await options.allTextContents()).map(text => text.trim());
    console.log("Options in the drop down: " + optionText);

    // Store the original list of options
    const originalList: string[] = optionText;
    console.log("Original list: " + originalList);
    
    // Create a new sorted copy of the options
    const sortedList: string[] = [...originalList].sort();
    // sonar issue fix
    //const sortedList: string[] = [...originalList].sort((a, b) => a.localeCompare(b));
    console.log("Sorted list: " + sortedList);

    // Assert that original list matches sorted list (options are sorted)
    expect(originalList).toEqual(sortedList);
});