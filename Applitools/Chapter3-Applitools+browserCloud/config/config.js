 // Define the capabilities and browser options
 const capabilities = {
  email: 'Enter-Email',
  apiKey: 'Enter-API-KEY',
  clientName: 'Enter-Email',
  os: 'Windows',
  osVersion: '10',
  browserVersion: '112',
  browserName: 'chrome'
};

const server = {
  url: "https://prod-browsercloud-in.pcloudy.com/seleniumcloud/wd/hub"
}

//  set the app name ,test name and your actual Applitools API key

const applitools = {
  appName: 'pCloudy Device Demo',
  testName: 'Appium Device List',
  apiKey: 'Enter-Applitools-API-KEY'
};

module.exports = {
  capabilities,
  applitools,
  server
};