/**
 * Test suite for handling dynamic web elements
 * Tests interaction with elements that change their state or appearance dynamically
 */

import { test, expect, Locator } from "@playwright/test"

/**
 * Test: Dynamic WebElement Handling
 * 
 * Description:
 * Tests handling of buttons that dynamically toggle between START and STOP states.
 * Demonstrates multiple approaches to locating elements with changing attributes
 * and using role-based selectors for dynamic content.
 * 
 * Test Steps:
 * 1. Navigate to test automation practice website
 * 2. Loop 5 times to repeatedly click the dynamic button
 * 3. Button toggles between START and STOP states
 * 4. Wait 2 seconds between clicks to observe state changes
 * 
 * Alternative Locator Approaches (commented):
 * - Text-based XPath: //button[text()="STOP" or text()="START"]
 * - Attribute-based: //button[@name="start" or @name="stop"]
 * - Contains attribute: //button[contains(@name,"st")]
 * - Starts-with: //button[starts-with(@name,"st")]
 */
test('Dynamic WebElement Handling', async ({ page }) => {
    // Navigate to test automation practice website
    await page.goto("https://testautomationpractice.blogspot.com/");
    for (let i = 1; i <= 5; i++) {
        // Alternative XPath approaches (commented out):
        // const button: Locator = page.locator('//button[text()="STOP" or text()="START"]');
        // const button = page.locator('//button[@name="start"]');
        // const button = page.locator('//button[@name="start" or @name="stop"]');
        // const button = page.locator('//button[contains(@name,"st")]');
        // const button = page.locator('//button[starts-with(@name,"st")]');
        
        // Use role-based selector - more resilient to dynamic changes
        // Matches button with text containing START or STOP
        const button = page.getByRole('button', { name: /START|STOP/ })
        
        // Click the button to toggle its state
        await button.click();
        
        // Wait 2 seconds to observe state change
        await page.waitForTimeout(2000);
    }
});