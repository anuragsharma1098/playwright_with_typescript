/**
 * Frames Test Suite
 *
 * Comprehensive tests for Playwright frame handling
 *
 * Frame Concepts:
 * - Frames: Isolated execution contexts within a page (iframes, nested frames)
 * - page.frames(): Returns all frames in the page hierarchy
 * - page.frame(): Access specific frame by URL or selector
 * - page.frameLocator(): Create locator for elements inside frames
 * - ChildFrames: Nested frames within parent frames
 *
 * Frame Handling Approaches:
 * 1. Direct Frame Access: Use page.frame() to get frame and interact with elements
 * 2. Frame Locator: Use page.frameLocator() for cleaner locator chain
 * 3. Nested Frames: Use childFrames() to access frames nested within other frames
 */

import { test, expect } from '@playwright/test';

/**
 * Test: should work with frames
 *
 * Description: Verifies frame handling including simple frames, nested frames, and child frame interactions
 * Demonstrates multiple approaches to access and interact with frame elements
 */
test('should work with frames', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');
  const frames = page.frames();
  console.log(frames.length);
  for (const frame of frames) {
    console.log(frame.url());
  }
  // approach 1: using page.frame()
  const frame1 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_1.html' });
  if (frame1) {
    await frame1.locator("[name='mytext1']").fill('Hello Frame 1');
    await frame1.fill("[name='mytext1']", 'Hello Frame 1 2');
  } else console.log('Frame 1 not found');
  await page.waitForTimeout(5000);

  // approach 2: using frame locator
  const frame2 = page.frameLocator('[src*="frame_2.html"]').locator('[name="mytext2"]');
  await frame2.fill('Hello Frame 2');
  await page.waitForTimeout(5000);

  // nexted frames
  const frame3 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_3.html' });
  if (frame3) {
    await frame3.locator("[name='mytext3']").fill('Hello Nested Frame');
    const childFrame = frame3.childFrames();
    console.log(childFrame.length);
    for (const frame of childFrame) {
      console.log(frame.url());
    }
    if (childFrame.length > 0) {
      const radio = childFrame[0].getByLabel('I am a human');
      await radio.check();
      await expect(radio).toBeChecked();
    }
  } else console.log('Frame not found');
});
