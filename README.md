# WebViewAngular
A sample Angular native app integration with Onfido’s [Web SDK](https://documentation.onfido.com/sdk/web/), using webviews.

## Instructions

Create a `.env` file on the root of the project and set the following environment variables:

```
IS_CLASSIC_INTEGRATION=<true-or-false>
API_TOKEN=<your-api-token>
WORKFLOW_ID=<your-workflow-id>,
```

> Check other possible environment variables under [environment.ts](src/app/environments/environment.ts).

```shell
npm i # install dependencies
npm build # set other required environment variables on .env file
npm run start # start the web sdk
npm run e2e # run the e2e tests
```
