import { test, expect } from '@playwright/test'

test.describe('Studio integration', () => {
  test.skip(
    process.env.IS_CLASSIC_INTEGRATION === 'true',
    'Skipping tests if not a Studio integration'
  )

  test('has title', async ({ page }) => {
    await page.goto('/')
    expect(
      page
        .frameLocator('iframe[name="onfido-welcome"]')
        .getByText('Verify your identity')
    ).toBeTruthy()
  })
})
