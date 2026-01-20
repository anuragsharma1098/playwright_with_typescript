import { test, expect, Locator } from '@playwright/test';

test('Comparing different methods to locate elements', async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

    const products: Locator = page.locator('.product-title');

    // 1) inner text vs text content
    const firstProductInnerText = await products.nth(0).innerText();
    const firstProductTextContent = await products.nth(0).textContent();
    console.log('Inner Text:', firstProductInnerText);
    console.log('Text Content:', firstProductTextContent);
    // expect(firstProductInnerText.trim()).toBe(firstProductTextContent?.trim());
    const count = await products.count();

    for (let i = 0; i < count; i++) {
        const innerText = await products.nth(i).innerText();
        const textContent = await products.nth(i).textContent();
        console.log(`Product ${i + 1} - Inner Text:`, innerText);
        console.log(`Product ${i + 1} - Text Content:`, textContent);
        console.log(`Product ${i + 1} - Text Content:`, textContent?.trim());
    }

    // 2) all inner texts vs all text contents
    const allInnerTexts = await products.allInnerTexts();
    const allTextContents = await products.allTextContents();
    console.log('All Inner Texts:', allInnerTexts);
    console.log('All Text Contents:', allTextContents);

    const trimmedTextContents = allTextContents.map(text => text?.trim());
    console.log('Trimmed Text Contents:', trimmedTextContents);

    // 3) all()
    // Note: all() returns an array of Locator objects
    const allProducts: Locator[] = await products.all();
    console.log('All Products using all():', allProducts.length);
    console.log('All Products:', allProducts);

    // console.log(await allProducts[0].innerText());

    for (let product of allProducts) {
        console.log(await product.innerText());
    }
});