/**
 * Test suite for XPath locator strategies
 * Demonstrates absolute and relative XPath approaches
 */

import { test, expect, Locator } from "@playwright/test"

/**
 * Test: XPath demo in playwright
 * 
 * Description:
 * Comprehensive demonstration of XPath locator strategies including:
 * - Absolute XPath: Complete path from root element
 * - Relative XPath: Partial path starting from any element
 * - XPath functions: normalize-space(), contains()
 * - Text matching and filtering
 * - Element collection handling
 * 
 * Test Steps:
 * 1. Navigate to tutorial ninja demo website
 * 2. Test absolute XPath locator
 * 3. Test relative XPath with text normalization
 * 4. Locate elements with contains() function
 * 5. Count and display elements
 * 6. Extract individual and bulk element content
 */
test("XPath demo in playwright", async ({ page }) => {
    // Navigate to tutorial ninja demo website
    await page.goto("https://tutorialsninja.com/demo/");

    // Absolute Xpath
    const logo: Locator = page.locator("xpath=/html[1]/body[1]/header[1]/div[1]/div[1]/div[1]/div[1]/h1[1]/a[1]");
    await expect(logo).toBeVisible();

    // Relative Xpath
    const logo2: Locator = page.locator("xpath=//a[normalize-space()='Qafox.com']");
    await expect(logo2).toBeVisible();

    // contains()
    const products: Locator = page.locator("//a[contains(@href,'product_id')]");
    const productCount: number = await products.count();
    console.log(productCount);
    expect(productCount).toBeGreaterThan(0);

    //console.log(await products.textContent()) //error strict mode validation
    console.log("First Product Content: ", await products.first().textContent());
    console.log("First Product Content: ", await products.nth(2).textContent());
    console.log("First Product Content: ", await products.nth(6).textContent());
    console.log("First Product Content: ", await products.nth(8).textContent());
    console.log("First Product Content: ", await products.last().textContent());
    console.log();
    console.log(await products.allTextContents());
    const productTitles: string[] = await products.allTextContents();
    for (const pt of productTitles)
        console.log(pt)
});