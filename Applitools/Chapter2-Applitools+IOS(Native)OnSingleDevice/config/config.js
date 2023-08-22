 // Define the capabilities and browser options
 const capabilities = {
  browserName: '',
  pCloudy_Username: 'Enter-Email',
  pCloudy_ApiKey: 'Enter-API-KEY',
  pCloudy_ApplicationName: 'TestmunkDemo_Resigned1675153426.ipa',
  pCloudy_DurationInMinutes: '10',
  pCloudy_DeviceFullName: 'APPLE_iPhone11ProMax_iOS_15.0.0_b99a8',
  platformName: 'iOS',
  platformVersion: '16.0',
  automationName: 'XCUITest',
  newCommandTimeout: '600',
  launchTimeout: '90000',
  bundleId: 'com.pcloudy.TestmunkDemo',
};
const server = {
  url: "https://device.pcloudy.com/appiumcloud/wd/hub"
}
//  set the app name ,test name and your actual Applitools API key

const applitools = {
  appName: 'IOS App Demo',
  testName: 'Login Page',
  apiKey: 'Enter-Applitools-API-KEY '
};

module.exports = {
  capabilities,
  applitools,
  server
};