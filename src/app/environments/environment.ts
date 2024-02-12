export const environment = {
  production: true,
  SDK_TARGET_VERSION: process.env.SDK_TARGET_VERSION ?? 'latest',
  SDK_TOKEN: process.env.SDK_TOKEN,
  WORKFLOW_RUN_ID: process.env.WORKFLOW_RUN_ID,
}
