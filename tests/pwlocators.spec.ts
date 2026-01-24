/**
 * Test suite for modern Playwright locator strategies
 * Demonstrates accessible and resilient element locating methods
 */

import { test, expect, Locator } from '@playwright/test'

/**
 * Playwright Built-in Locators Overview:
 * 
 * - getByRole(): Locate by explicit and implicit accessibility attributes (recommended)
 * - getByText(): Locate by text content (non-interactive elements)
 * - getByLabel(): Locate form controls by associated label's text
 * - getByPlaceholder(): Locate input by placeholder text
 * - getByAltText(): Locate elements (usually images) by alt text
 * - getByTitle(): Locate elements by title attribute
 * - getByTestId(): Locate by data-testid attribute (or custom configured attribute)
 */

/**
 * Test: locators test
 * 
 * Description:
 * Demonstrates various modern locator strategies for element selection.
 * Shows both basic usage and filtering by role, text, and other attributes.
 */
test('locators test', async ({ page }) => {
    // Navigate to e-commerce demo website
    await page.goto("https://tutorialsninja.com/demo/");

    // page.getByAltText()
    const logo: Locator = page.getByAltText("Apple Cinema 30");
    await expect(logo).toBeVisible();

    // page.getByText()
    const textFeatured: Locator = page.getByText("Featured");
    await expect(textFeatured).toBeVisible();

    // page.getByRole()
    page.getByRole('link', { name: 'Phones & PDAs' }).click();
    await expect(page.getByRole('heading', { name: 'Phones & PDAs' })).toBeVisible();

    // page.getByLabel()

    // getByLabel usage notes and examples:
    // - Basic: await page.getByLabel('Email').fill('me@example.com');
    // - Exact match: await page.getByLabel('Email', { exact: true }).fill('me@example.com');
    // - Regex: await page.getByLabel(/email/i).fill('me@example.com');
    // - Scoped: await page.locator('form').getByLabel('First name').fill('Ana');
    // - Works for inputs, textareas, selects and other form controls associated with a <label>.
    // - If a control has no label, consider `getByPlaceholder`, `getByRole`, or `locator` with attributes.

    // await page.getByRole('link', { name: ' My Account' }).click();
    // await page.getByRole('link', { name: 'Register' }).click();
    // await page.getByLabel('input-firstname').fill('FirstName');
    // await page.getByLabel('input-lastname').fill('LastName');
    // await page.getByLabel('input-email').fill('email@mail.com');

    // page.getByPlaceholder()
    await page.getByRole('link', { name: ' My Account' }).click();
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByPlaceholder('First Name').fill('FirstName');
    await page.getByPlaceholder('Last Name').fill('LastName');
    await page.getByPlaceholder('E-Mail').fill('email@mail.com');

    // // page.getByTitle()
    // // Click the button
    // await page.getByTitle('Save changes').click();

    // // page.getByTestId()
    // // Click the button
    // await page.getByTestId('submit-btn').click();

});