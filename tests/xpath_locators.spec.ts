import { test, expect, Locator } from "@playwright/test"

test("XPath demo in playwright", async ({ page }) => {

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
    let productTitles: string[] = await products.allTextContents();
    for (let pt of productTitles)
        console.log(pt)
});