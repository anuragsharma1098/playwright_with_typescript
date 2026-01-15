# Playwright with TypeScript

A test automation project using Playwright and TypeScript for end-to-end testing.

## Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js** (version 14.0 or higher)
- **npm** (comes with Node.js)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd playwright_with_typescript
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Install Playwright browsers:**

   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in UI mode (recommended for debugging)

```bash
npx playwright test --ui
```

### Run tests in headed mode (see browser window)

```bash
npx playwright test --headed
```

### Run a specific test file

```bash
npx playwright test tests/example.spec.ts
```

### Run tests with a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests in debug mode

```bash
npx playwright test --debug
```

## Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

Test results are stored in the `test-results/` directory and reports in the `playwright-report/` directory.

## Configuration

Tests are configured in `playwright.config.ts`. You can modify:

- Browser types (Chromium, Firefox, WebKit)
- Base URL
- Timeout settings
- Screenshot and video capture options
- Report generation

## Troubleshooting

- **Port already in use:** The test server might be running on a port that's already in use. Check `playwright.config.ts` for the webServer configuration.
- **Browser not found:** Run `npx playwright install` again to ensure all browsers are installed.
- **Timeout errors:** Increase the timeout in `playwright.config.ts` or in individual tests.

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
