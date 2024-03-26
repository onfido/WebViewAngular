import { chromium, expect, test } from '@playwright/test'

const getPage = async ({ withCameraPermissions = true }) => {
  const args = []
  const permissions = []

  if (withCameraPermissions) {
    args.push('--use-fake-ui-for-media-stream')
    args.push('--use-fake-device-for-media-stream')
    permissions.push('camera')
  }

  const browser = await chromium.launch({
    args,
  })
  const page = await browser.newPage()

  await page.context().grantPermissions(permissions)

  // Mocking consents being given
  await page.route('**/applicants/*/consents', async (route) => {
    return route.fulfill({
      body: JSON.stringify([]),
    })
  })

  return page
}

test.describe('Classic integration', () => {
  test.skip(
    process.env.IS_CLASSIC_INTEGRATION === 'false',
    'Skipping tests if not a classic integration'
  )

  test('without camera permissions', async () => {
    const page = await getPage({ withCameraPermissions: false })

    await page.goto('/')

    await page
      .frameLocator('iframe[name="onfido-document"]')
      .locator('[data-qa="country-selector"]')
      .click()

    await page
      .frameLocator('iframe[name="onfido-document"]')
      .locator('span[role="option"]')
      .first()
      .click()

    await page
      .frameLocator('iframe[name="onfido-document"]')
      .locator('[data-qa="passport"]')
      .click()

    await page
      .frameLocator('iframe[name="onfido-document"]')
      .locator('[data-qa="passport-guide-next-btn"]')
      .click()

    await page
      .frameLocator('iframe[name="onfido-document"]')
      .locator('[data-qa="enable-camera-btn"]')
      .click()

    await page
      .frameLocator('iframe[name="onfido-document"]')
      .locator('[data-screen="Recover"]')
      .isVisible()
  })

  test('with camera permissions', async () => {
    const page = await getPage({})

    await page.goto('/')

    await page
      .frameLocator('iframe[name="onfido-document"]')
      .locator('[data-qa="country-selector"]')
      .click()

    await page
      .frameLocator('iframe[name="onfido-document"]')
      .locator('span[role="option"]')
      .first()
      .click()

    await page
      .frameLocator('iframe[name="onfido-document"]')
      .locator('[data-qa="passport"]')
      .click()

    await page
      .frameLocator('iframe[name="onfido-document"]')
      .locator('[data-qa="passport-guide-next-btn"]')
      .click()

    await expect(
      page
        .frameLocator('iframe[name="onfido-document"]')
        .locator('[data-qa="enable-camera-btn"]')
    ).not.toBeVisible()
  })
})
