import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(
    page
      .frameLocator('iframe[name="onfido-welcome"]')
      .getByText('Verify your identity')
  ).toBeTruthy()
})
