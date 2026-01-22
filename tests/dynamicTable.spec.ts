/**
 * Test suite for dynamic table verification
 * Tests interaction with dynamically rendered table content
 */

import { test, expect, Locator } from '@playwright/test';
import { text } from 'node:stream/consumers';

/**
 * Test: Verify Chrome CPU load in dynamic table
 * 
 * Description: 
 * This test navigates to a practice page containing a dynamic table and verifies that the CPU load
 * value for the Chrome process in the table matches the CPU load value displayed at the top of the page.
 * 
 * Test Steps:
 * 1. Navigate to the dynamic table practice page
 * 2. Locate and verify the table is visible
 * 3. Extract all rows from the table and verify row count is 4
 * 4. Iterate through rows to find the Chrome process entry
 * 5. Extract the CPU load percentage from the Chrome row
 * 6. Compare Chrome CPU load from table with the value displayed at top of page
 * 7. Assert both values match
 */
test("verify chrome cpu load in dynamic table", async ({ page }) => {
    // Navigate to the dynamic table practice page
    await page.goto("https://practice.expandtesting.com/dynamic-table");

    // Locate the table body and verify it's visible
    const table: Locator = page.locator("table.table tbody");
    await expect(table).toBeVisible();

    // Extract all rows from the table
    const rowsAll: Locator[] = await table.locator("tr").all();
    console.log('Number of rows in the table:', rowsAll.length);
    
    // Verify table contains exactly 4 rows
    expect(rowsAll).toHaveLength(4);

    // Initialize variable to store Chrome's CPU load value
    let cpuLoad = '';
    
    // Iterate through each row to find the Chrome process
    for (const row of rowsAll) {
        // Get the process name from the first column (td index 0)
        const processName = await row.locator("td").nth(0).innerText();
        
        // Check if this row contains the Chrome process
        if (processName.trim() === "Chrome") {
            // Extract the CPU load (column containing "%") from the Chrome row
            // Alternative approach (commented out): row.locator("td:has-text(\"%\")").innerText();
            cpuLoad = await row.locator("td", ({ hasText: "%" })).innerText();
            console.log(`Verified Chrome CPU Load: ${cpuLoad.trim()}`);
            break; // Exit loop after finding Chrome row
        }
    }
    
    // Get the CPU load value displayed in the top section of the page
    let cpuLoadValue = await page.locator("#chrome-cpu").innerText();
    console.log(`CPU Load value from the top section: ${cpuLoadValue}`);
    
    // Extract the actual CPU value from the text (format: "CPU: X%")
    // Split by ": " and take the second element to get just the percentage value
    const cpuLoadValueExtracted = cpuLoadValue.split(": ")[1];
    
    // Assert that the CPU load from the table matches the displayed CPU load value
    expect(cpuLoad.trim()).toBe(cpuLoadValueExtracted.trim());
});