const { Onfido, Region } = require('@onfido/api')
const { config: configDotenv } = require('dotenv')
const fs = require('fs')

configDotenv()

const onfido = new Onfido({
  apiToken: process.env.API_TOKEN,
  region: Region.EU,
})

async function generateApplicantId() {
  const applicant = await onfido.applicant.create({
    firstName: 'Web',
    lastName: 'SDK',
  })

  return applicant.id
}

async function generateSdkToken(applicantId: string) {
  return await onfido.sdkToken.generate({
    applicantId: `${applicantId}`,
  })
}

async function createWorkflowRun(applicantId: string) {
  const workflowRun = await onfido.workflowRun.create({
    applicantId: `${applicantId}`,
    workflowId: `${process.env.WORKFLOW_ID}`,
  })

  return workflowRun.id
}

async function writeEnvFile(sdkToken: string, workflowRunId: string) {
  const envContent = `SDK_TOKEN=${sdkToken}\nWORKFLOW_RUN_ID=${workflowRunId}
  `

  fs.appendFileSync('.env', envContent, 'utf-8')
}
generateApplicantId().then(async (applicantId) => {
  const sdkToken = await generateSdkToken(applicantId)
  const workflowRunId = await createWorkflowRun(applicantId)

  await writeEnvFile(sdkToken, workflowRunId)

  console.log({
    sdkToken: sdkToken,
    workflowRunId: workflowRunId,
  })
})
