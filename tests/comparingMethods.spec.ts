/**
 * Test suite for comparing element locating methods
 * Demonstrates different Playwright API methods for accessing element text and collections
 */

import { test, expect, Locator } from '@playwright/test';

/**
 * Test: Comparing different methods to locate elements
 * 
 * Description:
 * Compares various Playwright methods for extracting text from elements and retrieving
 * collections. Demonstrates the differences between innerText, textContent, and bulk
 * retrieval methods (allInnerTexts, allTextContents, all()).
 * 
 * Key Concepts:
 * - innerText: Returns visible text with formatting
 * - textContent: Returns all text content including hidden text
 * - allInnerTexts(): Returns array of visible text
 * - allTextContents(): Returns array of all text content
 * - all(): Returns array of Locator objects for iteration
 */
test('Comparing different methods to locate elements', async ({ page }) => {
    // Navigate to demo e-commerce website
    await page.goto('https://demowebshop.tricentis.com/');

    // Locate all product title elements
    const products: Locator = page.locator('.product-title');

    // Method 1: Compare innerText vs textContent for individual elements
    // innerText returns visible text, textContent includes all text content
    const firstProductInnerText = await products.nth(0).innerText();
    const firstProductTextContent = await products.nth(0).textContent();
    console.log('Inner Text:', firstProductInnerText);
    console.log('Text Content:', firstProductTextContent);
    
    // Get total count of products
    const count = await products.count();

    for (let i = 0; i < count; i++) {
        const innerText = await products.nth(i).innerText();
        const textContent = await products.nth(i).textContent();
        console.log(`Product ${i + 1} - Inner Text:`, innerText);
        console.log(`Product ${i + 1} - Text Content:`, textContent);
        console.log(`Product ${i + 1} - Text Content (trimmed):`, textContent?.trim());
    }

    // Method 2: Bulk text extraction using allInnerTexts() vs allTextContents()
    // allInnerTexts() returns array of visible text
    // allTextContents() returns array of all text content
    const allInnerTexts = await products.allInnerTexts();
    const allTextContents = await products.allTextContents();
    console.log('All Inner Texts:', allInnerTexts);
    console.log('All Text Contents:', allTextContents);

    // Trim whitespace from all text contents
    const trimmedTextContents = allTextContents.map(text => text?.trim());
    console.log('Trimmed Text Contents:', trimmedTextContents);

    // Method 3: Using all() to get array of Locator objects
    // all() returns an array of Locator objects that can be individually manipulated
    const allProducts: Locator[] = await products.all();
    console.log('All Products using all():', allProducts.length);
    console.log('All Products:', allProducts);

    // console.log(await allProducts[0].innerText());

    for (let product of allProducts) {
        console.log(await product.innerText());
    }
});