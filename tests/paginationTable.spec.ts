/**
 * @fileoverview Pagination Table Test Suite
 * 
 * This test suite contains tests for interacting with paginated data tables
 * using the DataTables library. The tests demonstrate common pagination,
 * filtering, and search operations on dynamic web tables.
 * 
 * Test URL: https://datatables.net/examples/basic_init/zero_configuration.html
 */

import { test, expect, Locator } from "@playwright/test";

/**
 * Test: Pagination Table Test
 * 
 * This test demonstrates iterating through all pages of a paginated table.
 * It continuously clicks the "Next" button and logs the content of each row
 * until all pages have been processed.
 * 
 * Flow:
 * 1. Navigate to the DataTables example page
 * 2. Retrieve all rows from the current page and log their content
 * 3. Check if the "Next" button is enabled
 * 4. If enabled, click it and wait for the page to load
 * 5. Repeat until no more pages are available
 */
test("Pagination Table Test", async ({ page }) => {
  // Navigate to the DataTables example page
  await page.goto(
    "https://datatables.net/examples/basic_init/zero_configuration.html",
  );

  let hasMorePages = true;

  // Loop through all pages in the pagination
  while (hasMorePages) {
    // Get all table rows from the current page
    const rows = await page.locator("#example tbody tr").all();
    
    // Log each row's content
    for (const row of rows) {
      const rowText = await row.innerText();
      console.log(rowText);
    }
    
    // Locate the Next pagination button
    const nextButton = page.getByRole("link", { name: "Next" });
    
    // Check if the Next button is enabled and click it if available
    if (await nextButton.isEnabled()) {
      await nextButton.click();
      // Wait for the page to load after clicking Next
      await page.waitForTimeout(1000);
    } else {
      // No more pages available, exit the loop
      hasMorePages = false;
    }
  }
});


/**
 * Test: Filter the rows and check the results
 * 
 * This test demonstrates how to change the number of rows displayed per page
 * using the length dropdown selector. It sets the display to 25 rows and
 * verifies that exactly 25 rows are returned.
 * 
 * Flow:
 * 1. Navigate to the DataTables example page
 * 2. Locate and interact with the length dropdown selector
 * 3. Select "25" from the dropdown to display 25 rows per page
 * 4. Count and verify that exactly 25 rows are displayed
 */
test("filter the rows and check the results", async ({ page }) => {
  // Navigate to the DataTables example page
  await page.goto(
    "https://datatables.net/examples/basic_init/zero_configuration.html",
  );
  
  // Locate the dropdown for selecting number of rows to display
  const dropdown: Locator = page.locator("#dt-length-0");
  
  // Select the option to display 25 rows per page
  await dropdown.selectOption({ label: "25" });

  // Get all table rows after the dropdown selection
  const rows = await page.locator("#example tbody tr").all();
  
  // Assert that exactly 25 rows are displayed
  expect(rows.length).toBe(25);
});


/**
 * Test: Search for specific data
 * 
 * This test demonstrates the search/filter functionality of a DataTable.
 * It searches for a specific employee name ("Paul Byrd") in the table,
 * retrieves the matching row(s), and verifies that the search results
 * contain the searched text.
 * 
 * Flow:
 * 1. Navigate to the DataTables example page
 * 2. Locate the search input field
 * 3. Enter "Paul Byrd" as the search term
 * 4. Retrieve all matching rows that appear after the search
 * 5. If rows exist, verify each row contains the search term
 * 6. If no rows exist, log that no matching records were found
 */
test("search for specific data", async ({ page }) => {
  // Navigate to the DataTables example page
  await page.goto(
    "https://datatables.net/examples/basic_init/zero_configuration.html",
  );

  // Locate the search input field in the DataTable
  const searchBox: Locator = page.locator("#dt-search-0");
  
  // Enter the search term "Paul Byrd"
  await searchBox.fill("Paul Byrd");
  
  // Get all table rows that match the search criteria
  const rows = await page.locator("#example tbody tr").all();
  
  // Process the search results
  if (rows.length > 0) {
    // If rows are found, verify each row contains the search term
    for (const row of rows) {
      const rowText = await row.innerText();
      
      // Assert that the row contains the searched text
      expect(rowText).toContain("Paul Byrd");
      
      // Log the row content
      console.log(rowText);
    }
  } else {
    // If no rows are found, log the message
    console.log("No matching records found.");
  }
});
