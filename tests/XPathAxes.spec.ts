import { test, expect } from '@playwright/test';

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
    if (count === 0) {
      console.log('No following sibling found for the logo container.');
      return;
    }

    const tagName = await followingTab.evaluate((el) => el.tagName);
    console.log(`Following sibling tag: ${tagName}`);
  });

  test('Preceding-Sibling Axis - Select preceding siblings only', async ({ page }) => {
    // Select only preceding siblings
    const precedingElements = page.locator(
      '//body/preceding-sibling::head'
    );
    const count = await precedingElements.count();
    console.log(`Found ${count} preceding siblings`);
  });

  test('Self Axis - Select the context node itself', async ({ page }) => {
    // Select the element itself
    const selfElement = page.locator('//input[@id="searchInput"]/self::input');
    const isVisible = await selfElement.isVisible();
    console.log(`Self element (searchInput) is visible: ${isVisible}`);
    expect(isVisible).toBe(true);
  });

  test('Attribute Axis - Select attributes of an element', async ({ page }) => {
    // Select elements by their attributes
    const inputWithType = page.locator('//input[@type="text"]');
    const count = await inputWithType.count();
    console.log(`Found ${count} text input elements`);
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('Namespace Axis - Select namespace nodes', async ({ page }) => {
    // Select SVG elements with namespaces
    const svgElements = page.locator('//svg//*');
    const svgCount = await svgElements.count();
    console.log(`Found ${svgCount} SVG child elements`);
  });

  test('Complex XPath - Combining multiple axes', async ({ page }) => {
    // Combine multiple axes to find specific elements
    // Find inputs that are descendants of divs with specific class, 
    // whose parent is a form
    const complexPath = page.locator(
      '//div[@id="searchInput"]/ancestor::div/descendant::input[@type="search"]'
    );
    const complexCount = await complexPath.count();
    console.log(`Complex XPath found ${complexCount} elements`);
  });

  test('Practical Example - Navigate through page structure', async ({ page }) => {
    // Get the search input
    const searchInput = page.locator('//input[@id="searchInput"]');
    
    // Navigate to its parent div (Wikipedia doesn't have a form parent for searchInput)
    const parentDiv = page.locator('//input[@id="searchInput"]/parent::div');
    const divClass = await parentDiv.getAttribute('class');
    console.log(`Parent div class: ${divClass}`);

    // Get all siblings of the search input
    const siblings = page.locator('//input[@id="searchInput"]/parent::*/child::*');
    const siblingCount = await siblings.count();
    console.log(`Total siblings (including self): ${siblingCount}`);

    // Get the closest div ancestor
    const closestDiv = page.locator('//input[@id="searchInput"]/ancestor::div[1]');
    const divId = await closestDiv.getAttribute('id');
    console.log(`Closest div ancestor id: ${divId}`);

    expect(searchInput).toBeDefined();
  });

  test('XPath Axes - Table Navigation Example', async ({ page }) => {
    // Go to a page with tables
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Example: Select all cells in a row
    // Find a table cell, then select all following cells in same row
    const rowCells = page.locator("//td[normalize-space()='Learn JS']/following-sibling::td")
    const cellCount = await rowCells.count();
    console.log(`Cells following first data cell: ${cellCount}`);

    // Select parent row from a cell and count all td children
    const parentRow = page.locator("//td[normalize-space()='Learn JS']/parent::tr");
    const rowChildCount = await parentRow.locator("//td").count();
    console.log(`Total cells in parent row: ${rowChildCount}`);
  });
});
