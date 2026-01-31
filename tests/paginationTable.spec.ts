import { test, expect, Locator } from "@playwright/test";

test("Pagination Table Test", async ({ page }) => {
  await page.goto(
    "https://datatables.net/examples/basic_init/zero_configuration.html",
  );

  let hasMorePages = true;

  while (hasMorePages) {
    const rows = await page.locator("#example tbody tr").all();
    for (let row of rows) {
      const rowText = await row.innerText();
      console.log(rowText);
    }
    const nextButton = page.getByRole("link", { name: "Next" });
    if (await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForTimeout(1000);
    } else {
      hasMorePages = false;
    }
  }
});

test("filter the rows and check the results", async ({ page }) => {
  await page.goto(
    "https://datatables.net/examples/basic_init/zero_configuration.html",
  );
  const dropdown: Locator = page.locator("#dt-length-0");
  await dropdown.selectOption({ label: "25" });

  const rows = await page.locator("#example tbody tr").all();
  expect(rows.length).toBe(25); // assertion
});

test("search for specific data", async ({ page }) => {
  await page.goto(
    "https://datatables.net/examples/basic_init/zero_configuration.html",
  );

  const searchBox: Locator = page.locator("#dt-search-0");
  await searchBox.fill("Paul Byrd");
  // await searchBox.fill("new york");
  const rows = await page.locator("#example tbody tr").all();
  if (rows.length > 0) {
    for (let row of rows) {
      const rowText = await row.innerText();
      expect(rowText).toContain("Paul Byrd"); // assertion
      console.log(rowText);
    }
  } else {
    console.log("No matching records found.");
  }
});
