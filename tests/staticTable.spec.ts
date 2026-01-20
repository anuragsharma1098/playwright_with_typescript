import { test, expect, Locator } from '@playwright/test';

test('Static Table Test', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const table: Locator = page.locator('table[name="BookTable"] tbody');
    await expect(table).toBeVisible();

    // 1) count number of rows in a table
    const rows = table.locator('tr'); //chainable locator for rows

    await expect(rows).toHaveCount(7); // including header row
    console.log(`Number of rows: ${await rows.count()}`);

    const rowCount = await rows.count(); // includes header row
    expect(rowCount).toBe(7);
    console.log(`Number of rows: ${rowCount}`);

    // 2) count number of columns in a table
    const columns = rows.nth(0).locator('th'); //chainable locator for columns in header row
    await expect(columns).toHaveCount(4);
    console.log(`Number of columns: ${await columns.count()}`);

    const columnCount = await columns.count();
    expect(columnCount).toBe(4);
    console.log(`Number of columns: ${columnCount}`);

    // 3) read and print second row data
    const secondRow = rows.nth(1);
    const secondRowData = await secondRow.locator('td').allTextContents();
    console.log(`Data in second row: ${secondRowData.join(', ')}`);

    // 4) read specific row and column data
    const specificCell = rows.nth(2).locator('td').nth(1);
    await expect(specificCell).toHaveText('Mukesh');
    console.log(`Data at row 3, column 2: ${await specificCell.textContent()}`);

    // 5) iterate through all rows and columns to print the entire table data
    console.log('--- Iterating through all rows and columns ---');
    for (let i = 1; i < rowCount; i++) { // start from 1 to skip header row
        const currentRow = rows.nth(i);
        const rowData = await currentRow.locator('td').allTextContents();
        console.log(`Row ${i} data: ${rowData.join(', ')}`);
    }

    console.log('--- Using all() method to get all rows ---');
    const allRowsData = await rows.all();

    for (let row of allRowsData.slice(1)) { // skip header row
        const rowData = await row.locator('td').allTextContents();
        console.log(`Row data: ${rowData.join(', ')}`);
    }

    // 6) print book names where author is 'Mukesh'
    console.log('--- Books by author Mukesh ---');
    const mukeshBookNames: string[] = [];
    for (let i = 1; i < rowCount; i++) { // start from 1 to skip header row
        const currentRow = rows.nth(i);
        const author = await currentRow.locator('td').nth(1).textContent();
        if (author === 'Mukesh') {
            const bookName = await currentRow.locator('td').nth(0).textContent();
            console.log(`Book name: ${bookName}`);
            mukeshBookNames.push(bookName || '');
        }
    }
    expect(mukeshBookNames).toHaveLength(2); // assertion


    // 7) print prices of all books and add them to a list and total price
    console.log('--- Prices of all books ---');
    let priceTotal = 0;
    const bookPrices: string[] = [];
    for (let i = 1; i < rowCount; i++) { // start from 1 to skip header row
        const currentRow = rows.nth(i);
        const price = await currentRow.locator('td').nth(3).textContent();
        console.log(`Price: ${price}`);
        bookPrices.push(price || '');
        priceTotal += Number(price);
    }
    expect(bookPrices).toHaveLength(6); // assertion
    console.log('Total price of all books:', priceTotal);
    expect(priceTotal).toBe(7100); // assertion
}); 