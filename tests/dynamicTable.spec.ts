import { test, expect, Locator } from '@playwright/test';
import { text } from 'node:stream/consumers';

test("verify chrome cpu load in dynamic table", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");

    const table: Locator = page.locator("table.table tbody");
    await expect(table).toBeVisible();

    const rowsAll: Locator[] = await table.locator("tr").all();
    console.log('Number of rows in the table:', rowsAll.length);
    expect(rowsAll).toHaveLength(4);

    let cpuLoad = '';
    for (const row of rowsAll) {
        const processName = await row.locator("td").nth(0).innerText();
        if (processName.trim() === "Chrome") {
            // const cpuLoad = await row.locator("td:has-text(\"%\")").innerText();
            cpuLoad = await row.locator("td", ({ hasText: "%" })).innerText();
            console.log(`Verified Chrome CPU Load: ${cpuLoad.trim()}`);
            break;
        }
    }
    let cpuLoadValue = await page.locator("#chrome-cpu").innerText();
    console.log(`CPU Load value from the top section: ${cpuLoadValue}`);
    const cpuLoadValueExtracted = cpuLoadValue.split(": ")[1];
    expect(cpuLoad.trim()).toBe(cpuLoadValueExtracted.trim());
});