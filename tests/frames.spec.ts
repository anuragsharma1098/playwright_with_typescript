import { test, expect } from '@playwright/test';

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
});
