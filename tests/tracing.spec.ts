/**
 * Tracing Test Suite
 *
 * Comprehensive tests for capturing and analyzing browser traces in Playwright
 *
 * Tracing Concepts:
 * - context.tracing.start(): Begins recording of user interactions, network requests, and DOM snapshots
 * - Options:
 *   - screenshots: true - Captures screenshots at each action for visual debugging
 *   - snapshots: true - Captures DOM snapshots to reconstruct page state
 *   - sources: true - Records JavaScript source files (optional)
 * - context.tracing.stop({ path }): Stops tracing and saves data to a zip file
 * - Traces are used for:
 *   - Post-test debugging and analysis
 *   - Understanding test failures with visual and DOM context
 *   - Performance analysis and optimization
 *   - Creating detailed test reports
 *
 * Tracing Patterns:
 * - Start tracing at the beginning of test setup
 * - Enable screenshots and snapshots for comprehensive debugging
 * - Stop tracing at test completion and save with timestamp
 * - Access trace files for investigation after test execution
 */

import { test, expect } from '@playwright/test';

/**
 * Test: should take a screenshot of the page
 *
 * Description:
 *   Demonstrates how to capture and record browser traces including screenshots
 *   and DOM snapshots during test execution. The trace is saved to a timestamped
 *   zip file for later analysis and debugging.
 *
 * Steps:
 *   1. Start tracing with screenshots and snapshots enabled
 *   2. Generate a unique timestamp for trace file naming
 *   3. Navigate to https://www.testrail.com/
 *   4. Click on "Features" link
 *   5. Stop tracing and save trace file to traces/ directory
 *
 * Expected Behavior:
 *   - Tracing is successfully started
 *   - Page navigation and click interaction are recorded
 *   - Trace file is created with timestamp: traces/trace-{timestamp}.zip
 *   - Trace file contains screenshots and DOM snapshots of all actions
 */
test('should take a screenshot of the page', async ({ page, context }) => {
  context.tracing.start({ screenshots: true, snapshots: true });
  const timestamp = Date.now();
  await page.goto('https://www.testrail.com/');
  await page.click('text=Features');
  await context.tracing.stop({ path: `traces/trace-${timestamp}.zip` });
});
