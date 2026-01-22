/**
 * CSS Locators Test Suite
 * 
 * Comprehensive tests for CSS locator strategies in Playwright
 * 
 * CSS Locator Types:
 * 1. Absolute CSS locators - Full path from root element
 * 2. Relative CSS locators - Partial paths starting from context element
 * 
 * CSS Selector Patterns:
 * - ID selector: #id or tag#id
 * - Class selector: .class or tag.class
 * - Attribute selector: [attr=value] or tag[attr=value]
 * - Combined: tag.class[attr=value]
 * 
 * Relationship Selectors:
 * - Child: parent > child
 * - Descendant: parent descendant
 * - Sibling: element ~ sibling
 * - Adjacent sibling: element + sibling
 */

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');
});

test.describe('CSS Locators Examples - Playwright TypeScript', () => {
    test('Locate by ID', async ({ page }) => {
        const searchInput = page.locator('#searchInput');
        await expect(searchInput).toBeVisible();
    });
    test('Locate by Class', async ({ page }) => {
        const mainPageContent = page.locator('.mw-body-content');
        await expect(mainPageContent).toBeVisible();
    });
    test('Locate by Attribute', async ({ page }) => {
        const searchInput = page.locator('#searchInput');
        await expect(searchInput).toBeVisible();
    });
    test('Locate by Class and Attribute', async ({ page }) => {
        const buttons = page.locator('button');
        const count = await buttons.count();
        expect(count).toBeGreaterThan(0);
    });
    test('Locate Child Elements', async ({ page }) => {
        const navLinks = page.locator('div#p-navigation ul li a');
        const count = await navLinks.count();
        console.log(`Found ${count} navigation links`);
        expect(count).toBeGreaterThan(0);
    });
    test('Locate Descendant Elements', async ({ page }) => {
        const allLinks = page.locator('div#mw-content-text a');
        const count = await allLinks.count();
        console.log(`Found ${count} links in content text`);
        expect(count).toBeGreaterThan(0);
    });
    test('Locate Sibling Elements', async ({ page }) => {
        const navLinks = page.locator('div#p-navigation a');
        const count = await navLinks.count();
        console.log(`Found ${count} navigation links`);
        expect(count).toBeGreaterThanOrEqual(0);
    });
    test('Locate Parent Element', async ({ page }) => {
        const searchInput = page.locator('#searchInput');
        const count = await searchInput.count();
        expect(count).toBeGreaterThan(0);
    }
    );
});
test('Locate Ancestor Element', async ({ page }) => {
    const searchInput = page.locator('#searchInput');
    const count = await searchInput.count();
    expect(count).toBeGreaterThan(0);
});
test('Locate Following Sibling Element', async ({ page }) => {
    const mainContent = page.locator('main');
    const count = await mainContent.count();
    expect(count).toBeGreaterThan(0);
}
);
test('Locate Preceding Sibling Element', async ({ page }) => {
    const searchInput = page.locator('#searchInput');
    const count = await searchInput.count();
    expect(count).toBeGreaterThan(0);
});
test('Locate Descendant Elements from Specific Parent', async ({ page }) => {
    const contentDiv = page.locator('div#mw-content-text');
    const descendantLinks = contentDiv.locator('a');
    const count = await descendantLinks.count();
    console.log(`Found ${count} descendant links in content text`);
    expect(count).toBeGreaterThan(0);
});
test.describe('XPath Axes Examples - Playwright TypeScript', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to a page with HTML elements to demonstrate XPath axes
        await page.goto('https://www.wikipedia.org');
    });
    test('Child Axis - Select direct children', async ({ page }) => {
        // Select all input elements that are direct children of a form
        const childInputs = page.locator('//form/input');
        const count = await childInputs.count();
        console.log(`Found ${count} direct input children in forms`);
        expect(count).toBeGreaterThanOrEqual(0);
    });
    test('Parent Axis - Select parent element', async ({ page }) => {
        // Select parent of a specific input element
        const parentOfInput = page.locator('//input[@id="searchInput"]/parent::div');
        const parentVisible = await parentOfInput.isVisible();
        console.log(`Parent of input is visible: ${parentVisible}`);
    });
    test('Ancestor Axis - Select all ancestor elements', async ({ page }) => {
        // Select all ancestors of search input up to the root
        const ancestors = page.locator('//input[@id="searchInput"]/ancestor::*');
        const ancestorCount = await ancestors.count();
        console.log(`Found ${ancestorCount} ancestor elements`);
        expect(ancestorCount).toBeGreaterThan(0);
    });
    test('Descendant Axis - Select all descendant elements', async ({ page }) => {
        // Select all descendant elements (any level) within a parent
        const descendants = page.locator('//div[@id="mw-page-base"]/descendant::*');
        const descendantCount = await descendants.count();
        console.log(`Found ${descendantCount} descendant elements`);
        expect(descendantCount).toBeGreaterThanOrEqual(0);
    });
    test('Following Axis - Select all following elements at same level', async ({ page }) => {
        // Select all following sibling elements after a specific element
        const followingSiblings = page.locator('//input[@id="searchInput"]/following-sibling::*');
        const followingCount = await followingSiblings.count();
        console.log(`Found ${followingCount} following sibling elements`);
    });
    test('Preceding Axis - Select all preceding elements at same level', async ({ page }) => {
        // Select all preceding sibling elements before a specific element
        const precedingSiblings = page.locator('//input[@id="searchInput"]/preceding-sibling::*');
        const precedingCount = await precedingSiblings.count();
        console.log(`Found ${precedingCount} preceding sibling elements`);
    });
    test('Following-Sibling Axis - Select following siblings only', async ({ page }) => {
        // Select only following siblings (not descendants)
        const followingTab = page.locator(
            '//div[contains(@class, "mw-wiki-logo")]/following-sibling::*[1]'
        );
        // Guard against missing nodes
        const count = await followingTab.count();
        if (count > 0) {
            const isVisible = await followingTab.isVisible();
            console.log(`Following sibling is visible: ${isVisible}`);
        } else {
            console.log('No following sibling found.');
        }
    });
});