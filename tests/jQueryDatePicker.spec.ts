import { test, expect, Page } from "@playwright/test";

/**
 * Helper Function: Determine Navigation Direction
 *
 * PURPOSE:
 * Intelligently determines whether to navigate forward or backward in the
 * jQuery calendar based on the current month/year and target month/year.
 *
 * PARAMETERS:
 * @param currentYear - The year currently displayed in the calendar (e.g., "2026")
 * @param currentMonth - The month currently displayed (e.g., "February")
 * @param targetYear - The year we want to navigate to (e.g., "2026")
 * @param targetMonth - The month we want to navigate to (e.g., "May")
 * @param direction - Navigation mode:
 *   - "future": Always navigate forward (next month)
 *   - "past": Always navigate backward (previous month)
 *   - "auto": Intelligently determine based on date comparison
 *
 * RETURNS:
 * boolean - true to navigate forward (next month), false to navigate backward (previous month)
 *
 * LOGIC:
 * 1. If direction is "future", always return true (forward)
 * 2. If direction is "past", always return false (backward)
 * 3. For "auto" mode:
 *    - If current year < target year: navigate forward
 *    - If same year and current month < target month: navigate forward
 *    - Otherwise: navigate backward
 */
function shouldNavigateForward(
  currentYear: string,
  currentMonth: string,
  targetYear: string,
  targetMonth: string,
  direction: "future" | "past" | "auto"
): boolean {
  if (direction === "future") {
    return true;
  }
  if (direction === "past") {
    return false;
  }

  const currYear = Number.parseInt(currentYear || "0", 10);
  const currMonth = getMonthIndex(currentMonth || "");
  const tgtYear = Number.parseInt(targetYear, 10);
  const tgtMonth = getMonthIndex(targetMonth);

  if (currYear < tgtYear) {
    return true;
  }
  if (currYear === tgtYear && currMonth < tgtMonth) {
    return true;
  }
  return false;
}

/**
 * Core Function: Select Date from jQuery DatePicker
 *
 * PURPOSE:
 * Main function to select any date from a jQuery DatePicker calendar widget.
 * Handles navigation in both forward and backward directions with automatic
 * direction detection.
 *
 * PARAMETERS:
 * @param page - The Playwright page object
 * @param year - Target year as string (e.g., "2026")
 * @param month - Target month name (e.g., "February", "May", "December")
 * @param day - Target day as string (e.g., "4", "15", "25")
 * @param direction - Navigation strategy (default: "auto")
 *   - "future": Navigate forward only (next month buttons)
 *   - "past": Navigate backward only (previous month buttons)
 *   - "auto": Automatically determine best direction
 *
 * PROCESS FLOW:
 * 1. Click the datepicker input field to open the calendar
 * 2. Wait for calendar overlay to appear
 * 3. Check current month/year displayed in calendar
 * 4. If not at target month/year:
 *    a. Determine direction to navigate (forward or backward)
 *    b. Click appropriate navigation button
 *    c. Wait 100ms and repeat
 * 5. Once at correct month/year, click the target day in the calendar grid
 *
 * SAFETY FEATURES:
 * - Maximum 120 navigation attempts to prevent infinite loops
 * - 100ms delay between navigation clicks to allow UI to update
 * - Clear error message if date cannot be found
 *
 * RETURNS:
 * Promise<void> - Resolves when date is successfully selected
 *
 * THROWS:
 * Error - If unable to navigate to target date after 120 attempts
 *
 * EXAMPLES:
 * // Select February 4, 2026 with auto-detection
 * await selectDate(page, "2026", "February", "4");
 *
 * // Select June 15, 2024 navigating backward
 * await selectDate(page, "2024", "June", "15", "past");
 *
 * // Select December 25, 2025 navigating forward
 * await selectDate(page, "2025", "December", "25", "future");
 */
async function selectDate(
  page: Page,
  year: string,
  month: string,
  day: string,
  direction: "future" | "past" | "auto" = "auto"
): Promise<void> {
  /**
   * STEP 1: Open the date picker
   * Click the input field with id="datepicker" to trigger calendar display
   */
  const dateInput = page.locator("#datepicker");
  await dateInput.click();
  
  /**
   * Wait for jQuery calendar overlay to appear
   * The calendar is rendered with class="ui-datepicker"
   */
  await page.waitForSelector(".ui-datepicker");

  let navigations = 0;
  const maxNavigations = 120; // Safety limit to prevent infinite loops

  /**
   * STEP 2: Navigate to target month/year
   * Loop until we reach the correct month and year
   */
  while (navigations < maxNavigations) {
    /**
     * Read current month and year displayed in calendar
     * jQuery DatePicker displays month in class="ui-datepicker-month"
     * and year in class="ui-datepicker-year"
     */
    const yearSelect = await page.locator(".ui-datepicker-year").textContent();
    const monthSelect = await page.locator(".ui-datepicker-month").textContent();

    // If we've reached the target month/year, exit the loop
    if (yearSelect === year && monthSelect === month) {
      break;
    }

    /**
     * Determine which direction to navigate
     * Helper function compares current vs target date
     */
    const shouldClickNext = shouldNavigateForward(
      yearSelect || "",
      monthSelect || "",
      year,
      month,
      direction
    );

    /**
     * Navigate calendar
     * Next button: class="ui-datepicker-next" (navigate forward/next month)
     * Prev button: class="ui-datepicker-prev" (navigate backward/previous month)
     */
    if (shouldClickNext) {
      await page.locator(".ui-datepicker-next").click();
    } else {
      await page.locator(".ui-datepicker-prev").click();
    }

    navigations++;
    // Wait 100ms for calendar to update before checking again
    await page.waitForTimeout(100);
  }

  /**
   * Validation: Ensure we didn't hit max navigation limit
   * If we did, the target date doesn't exist or couldn't be reached
   */
  if (navigations >= maxNavigations) {
    throw new Error(
      `Could not navigate to ${month} ${year} after ${maxNavigations} attempts`
    );
  }

  /**
   * STEP 3: Select the target day
   * jQuery calendar displays dates in table cells (td elements)
   * Each td contains a day number
   */
  const allDates = await page.locator(".ui-datepicker-calendar td").all();

  // Iterate through all date cells to find and click the target day
  for (const dateCell of allDates) {
    const dateText = await dateCell.innerText();
    if (dateText.trim() === day) {
      await dateCell.click();
      break;
    }
  }
}

/**
 * Helper Function: Month Name to Index Converter
 *
 * PURPOSE:
 * Converts English month names to numeric indices (0-11) for comparison.
 * This is useful for determining navigation direction in the calendar.
 *
 * PARAMETERS:
 * @param monthName - Full month name in English (e.g., "January", "February")
 *
 * RETURNS:
 * number - Month index: 0=Jan, 1=Feb, 2=Mar, ... 11=Dec
 *          Returns -1 if month name not found
 *
 * EXAMPLE:
 * getMonthIndex("February")  // Returns: 1
 * getMonthIndex("December")  // Returns: 11
 * getMonthIndex("May")       // Returns: 4
 */
function getMonthIndex(monthName: string): number {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months.indexOf(monthName);
}

/**
 * TEST 1: Select Future Date
 *
 * DESCRIPTION:
 * Tests date selection when navigating FORWARD in the calendar.
 * Demonstrates how to select a future date (February 4, 2026)
 * from the current calendar view.
 *
 * TEST STEPS:
 * 1. Navigate to testing page with jQuery DatePicker
 * 2. Verify datepicker input field is visible
 * 3. Open datepicker and navigate to February 2026
 * 4. Select day 4 using "future" direction (always go forward)
 * 5. Verify the input field contains the selected date
 *
 * EXPECTED RESULT:
 * - Datepicker input should contain "02/04/2026" (MM/DD/YYYY format)
 * - Date format uses zero-padding for month and day
 *
 * KEY POINTS:
 * - Uses "future" direction: navigates only forward (next month button)
 * - Useful when you know the target date is ahead in the calendar
 * - jQuery DatePicker returns zero-padded dates (02/04 not 2/4)
 */
test("jQuery DatePicker should select a date correctly", async ({ page }) => {
  // STEP 1: Navigate to page containing jQuery DatePicker
  await page.goto("https://testautomationpractice.blogspot.com/");
  
  // STEP 2: Locate and verify datepicker input is visible
  const dateInput = page.locator("#datepicker");
  expect(dateInput).toBeVisible();

  // STEP 3: Select future date (February 4, 2026) with forward navigation
  await selectDate(page, "2026", "February", "4", "future");
  
  // STEP 4: Verify the selected date is reflected in the input field
  await expect(dateInput).toHaveValue("02/04/2026");
});

/**
 * TEST 2: Select Past Date
 *
 * DESCRIPTION:
 * Tests date selection when navigating BACKWARD in the calendar.
 * Demonstrates how to select a past date (June 15, 2024)
 * by navigating in the previous months direction.
 *
 * TEST STEPS:
 * 1. Navigate to testing page with jQuery DatePicker
 * 2. Verify datepicker input field is visible
 * 3. Open datepicker and navigate backward to June 2024
 * 4. Select day 15 using "past" direction (always go backward)
 * 5. Verify the input field contains the selected date
 *
 * EXPECTED RESULT:
 * - Datepicker input should contain "06/15/2024" (MM/DD/YYYY format)
 * - Date format uses zero-padding for month and day
 *
 * KEY POINTS:
 * - Uses "past" direction: navigates only backward (previous month button)
 * - Useful for selecting dates in the past
 * - Year 2024 is before current date (February 2026)
 */
test("jQuery DatePicker should select a past date", async ({ page }) => {
  // STEP 1: Navigate to page containing jQuery DatePicker
  await page.goto("https://testautomationpractice.blogspot.com/");
  
  // STEP 2: Locate and verify datepicker input is visible
  const dateInput = page.locator("#datepicker");
  expect(dateInput).toBeVisible();

  // STEP 3: Select past date (June 15, 2024) with backward navigation
  await selectDate(page, "2024", "June", "15", "past");
  
  // STEP 4: Verify the selected date is reflected in the input field
  await expect(dateInput).toHaveValue("06/15/2024");
});

/**
 * TEST 3: Select Date with Auto Direction
 *
 * DESCRIPTION:
 * Tests date selection with AUTOMATIC direction detection.
 * The calendar intelligently determines whether to navigate forward
 * or backward based on the target date.
 *
 * TEST STEPS:
 * 1. Navigate to testing page with jQuery DatePicker
 * 2. Verify datepicker input field is visible
 * 3. Open datepicker and navigate to December 2025
 * 4. Select day 25 using "auto" direction (auto-detect best direction)
 * 5. Verify the input field contains the selected date
 *
 * EXPECTED RESULT:
 * - Datepicker input should contain "12/25/2025" (MM/DD/YYYY format)
 * - Date format uses zero-padding for month and day
 *
 * KEY POINTS:
 * - Uses "auto" direction: intelligently determines forward or backward
 * - Most flexible approach for selecting any date
 * - Automatically compares current month/year with target to choose direction
 * - December 2025 is before current date (February 2026), so navigates backward
 *
 * WHEN TO USE AUTO MODE:
 * - When direction is unknown
 * - For generic date selection functions
 * - When you want the most efficient path to target date
 */
test("jQuery DatePicker should select a date with auto direction", async ({ page }) => {
  // STEP 1: Navigate to page containing jQuery DatePicker
  await page.goto("https://testautomationpractice.blogspot.com/");
  
  // STEP 2: Locate and verify datepicker input is visible
  const dateInput = page.locator("#datepicker");
  expect(dateInput).toBeVisible();

  // STEP 3: Select date (December 25, 2025) with auto-direction detection
  // The function automatically determines to navigate backward
  await selectDate(page, "2025", "December", "25", "auto");
  
  // STEP 4: Verify the selected date is reflected in the input field
  await expect(dateInput).toHaveValue("12/25/2025");
});
