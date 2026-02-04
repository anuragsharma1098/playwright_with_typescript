import { test, expect, Page } from "@playwright/test";

/**
 * Helper function to determine navigation direction
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
 * Selects a date from jQuery DatePicker
 * @param page - The page object
 * @param year - Target year (e.g., "2026")
 * @param month - Target month name (e.g., "February")
 * @param day - Target day (e.g., "4")
 * @param direction - "future" to navigate forward, "past" to navigate backward, "auto" to determine automatically
 */
async function selectDate(
  page: Page,
  year: string,
  month: string,
  day: string,
  direction: "future" | "past" | "auto" = "auto"
): Promise<void> {
  // Open the date picker
  const dateInput = page.locator("#datepicker");
  await dateInput.click();
  await page.waitForSelector(".ui-datepicker");

  let navigations = 0;
  const maxNavigations = 120; // Prevent infinite loops

  while (navigations < maxNavigations) {
    const yearSelect = await page.locator(".ui-datepicker-year").textContent();
    const monthSelect = await page.locator(".ui-datepicker-month").textContent();

    if (yearSelect === year && monthSelect === month) {
      break;
    }

    const shouldClickNext = shouldNavigateForward(
      yearSelect || "",
      monthSelect || "",
      year,
      month,
      direction
    );

    // Navigate
    if (shouldClickNext) {
      await page.locator(".ui-datepicker-next").click();
    } else {
      await page.locator(".ui-datepicker-prev").click();
    }

    navigations++;
    await page.waitForTimeout(100);
  }

  if (navigations >= maxNavigations) {
    throw new Error(
      `Could not navigate to ${month} ${year} after ${maxNavigations} attempts`
    );
  }

  // Select the day
  const allDates = await page.locator(".ui-datepicker-calendar td").all();

  for (let dateCell of allDates) {
    const dateText = await dateCell.innerText();
    if (dateText.trim() === day) {
      await dateCell.click();
      break;
    }
  }
}

/**
 * Helper function to convert month name to index (0-11)
 */
function getMonthIndex(monthName: string): number {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months.indexOf(monthName);
}

test("jQuery DatePicker should select a date correctly", async ({ page }) => {
  // Navigate to the page containing the jQuery DatePicker
  await page.goto("https://testautomationpractice.blogspot.com/");
  const dateInput = page.locator("#datepicker");
  expect(dateInput).toBeVisible();

  // Select future date
  await selectDate(page, "2026", "February", "4", "future");
  await expect(dateInput).toHaveValue("02/04/2026");
});

test("jQuery DatePicker should select a past date", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const dateInput = page.locator("#datepicker");
  expect(dateInput).toBeVisible();

  // Select past date
  await selectDate(page, "2024", "June", "15", "past");
  await expect(dateInput).toHaveValue("06/15/2024");
});

test("jQuery DatePicker should select a date with auto direction", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const dateInput = page.locator("#datepicker");
  expect(dateInput).toBeVisible();

  // Select date with auto direction (automatically determines direction)
  await selectDate(page, "2025", "December", "25", "auto");
  await expect(dateInput).toHaveValue("12/25/2025");
});
