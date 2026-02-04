import { test, expect } from "@playwright/test";

/**
 * TEST: Book Dates for Any Range
 *
 * DESCRIPTION:
 * This test automates the hotel date booking process on Booking.com.
 * It demonstrates how to select a date range (check-in and check-out dates)
 * using Playwright's locators and role-based queries.
 *
 * TEST STEPS:
 * 1. Navigate to Booking.com homepage
 * 2. Dismiss the sign-in information overlay
 * 3. Open the date picker calendar
 * 4. Navigate to the target month (May)
 * 5. Select check-in date (May 10)
 * 6. Navigate to checkout month if needed
 * 7. Select check-out date (May 28)
 *
 * EXPECTED RESULT:
 * Both check-in (May 10) and check-out (May 28) dates are selected
 * in the date range picker.
 *
 * CUSTOMIZATION:
 * To use different dates, modify the date regex patterns:
 * - For check-in: Change /10 May/ to /[day] [month]/
 * - For check-out: Change /28 May/ to /[day] [month]/
 *
 * Example:
 * - /15 June/ for June 15
 * - /1 December/ for December 1
 * - /25 July/ for July 25
 *
 * DEPENDENCIES:
 * - Booking.com homepage must be accessible
 * - Calendar must support "Next month" navigation button
 * - Date buttons must use accessibility role 'button' with date text
 */
test("book dates for any range", async ({ page }) => {
  /**
   * STEP 1: Navigate to Booking.com
   * Opens the main homepage where users can search for accommodations
   */
  await page.goto("https://www.booking.com/");

  /**
   * STEP 2: Dismiss Sign-In Overlay
   * Closes the persistent sign-in information banner that appears on page load.
   * This step is necessary because the overlay blocks interaction with the date picker.
   */
  await page.getByRole("button", { name: "Dismiss sign-in info." }).click();

  /**
   * STEP 3: Open Calendar/Date Picker
   * Clicks the date selection container to open the calendar interface.
   * The container uses data-testid attribute for stable selection.
   */
  await page.locator('[data-testid="searchbox-dates-container"]').click();

  /**
   * STEP 4: Navigate to Target Month
   * Clicks "Next month" button twice to advance the calendar view.
   * Adjust the number of clicks based on the current month and desired month.
   *
   * Navigation Strategy:
   * - Current month visible on initial calendar load
   * - Each "Next month" click advances the calendar by one month
   * - For May dates, we need to navigate forward 2 months (Feb -> Mar -> Apr -> May)
   */
  await page.getByRole("button", { name: "Next month" }).click();
  await page.getByRole("button", { name: "Next month" }).click();

  /**
   * STEP 5: Select Check-In Date (May 10)
   * Clicks the button containing "10 May" using regex pattern matching.
   * Regex pattern /10 May/ matches buttons with this text regardless of day prefix (e.g., "Su 10 May").
   *
   * Pattern Explanation:
   * - /10 May/ - Regex to match "10 May" in button text
   * - Day of week prefix (Su, Mo, Tu, etc.) is ignored
   * - Case-sensitive matching
   */
  await page.getByRole("button", { name: /10 May/ }).click();

  /**
   * STEP 6: Navigate for Check-Out Date
   * Clicks "Next month" button to move to the next month view if checkout
   * is in a different month than check-in.
   * For May 10 - May 28, both dates are in the same month, but this
   * step ensures flexibility for date ranges spanning multiple months.
   */
  await page.getByRole("button", { name: "Next month" }).click();

  /**
   * STEP 7: Select Check-Out Date (May 28)
   * Clicks the button containing "28 May" to set the checkout date.
   * Uses same regex pattern approach as check-in date selection.
   *
   * Note: After selecting checkout date, the calendar typically closes
   * and the booking form updates with the selected date range.
   */
  await page.getByRole("button", { name: /28 May/ }).click();
});
