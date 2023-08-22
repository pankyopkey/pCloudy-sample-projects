 // Define the capabilities and browser options
 const capabilities = {
  browserName: "",
  pCloudy_Username: 'Enter-Email',
  pCloudy_ApiKey: 'Enter-API-Key',
  pCloudy_ApplicationName: "pCloudyAppiumDemo.apk",
  pCloudy_DurationInMinutes: "10",
  pCloudy_DeviceFullName: "SAMSUNG_GalaxyA32_Android_11.0.0_b62bd",
  platformName: "Android",
  automationName: "uiautomator2",
  newCommandTimeout: 600,
  launchTimeout: 90000,
  appPackage: "com.pcloudy.appiumdemo",
  appActivity: "com.ba.mobile.LaunchActivity",
  pCloudy_EnableVideo: "true",
};
const server = {
  url: "https://device.pcloudy.com/appiumcloud/wd/hub"
}
//  set the app name ,test name and your actual Applitools API key

const applitools = {
  appName: 'Adnroid App Demo',
  testName: 'Ticket Booking',
  apiKey: 'Enter-Applitools-API-KEY'
};

module.exports = {
  capabilities,
  applitools,
  server
};