export const environment = {
  production: true,
  SDK_TARGET_VERSION: process.env.SDK_TARGET_VERSION ?? 'latest',
  IS_CLASSIC_INTEGRATION: process.env.IS_CLASSIC_INTEGRATION ?? 'false',
  SDK_TOKEN: process.env.SDK_TOKEN,
  WORKFLOW_RUN_ID: process.env.WORKFLOW_RUN_ID,
}
