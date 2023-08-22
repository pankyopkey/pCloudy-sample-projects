const {
  capabilities,
  applitools,
  server
} = require('./config/config.js')
const {
  Builder,
  By,
  until
} = require('selenium-webdriver');
const {
  Eyes,
  Target
} = require('@applitools/eyes-selenium');
const {
  captureScreenshot
} = require('./Controller/screenshot.js');

async function runVisualTest() {

  // Initialize the WebDriver with the Selenium Grid URL and port, and the capabilities
  const driver = await new Builder()
          .usingServer(server.url)
          .withCapabilities(capabilities)
          .build();

  // Initialize the Eyes object
  const eyes = new Eyes();

  try {
          eyes.setApiKey(applitools.apiKey);

          // Start the test and set the app name and test name
          await eyes.open(driver, applitools.appName, applitools.testName);
          console.log(`Test started with the App Name : '${applitools.appName}' and Test Name : '${applitools.testName}'`)

          const url = 'https://device.pcloudy.com/'
          // Navigate to the desired URL
          await driver.get(url);

          // Capture a screenshot after loading the page
          await captureScreenshot(driver, 'page-loaded');

          console.log(`Url open : '${url}'`)

          const userName = await driver.findElement(By.id('userId'));
          await userName.sendKeys('Enter-username');
          console.log(`Username Entered`)

          const password = await driver.findElement(By.id('password'));
          await password.sendKeys('Enter-Password');
          console.log(`Password Entered`)

          const loginButton = await driver.findElement(By.id('loginSubmitBtn'));
          await loginButton.click();
          console.log(`Login button Clicked`)

          // Capture a screenshot after clicking the login button
          await captureScreenshot(driver, 'login-clicked');

          const devices = await driver.findElement(By.xpath("//*[text()='Connect and Test Mobile Apps on Android and IOS devices']"));
          await devices.click();

          // Capture a screenshot for devie list
          await captureScreenshot(driver, 'Device-List-object');
          console.log("Device List Clicked")

          await driver.wait(until.elementLocated(By.xpath('//h5[text()="All Devices"]')), 50000);
          console.log("Devices loaded")

          await captureScreenshot(driver, 'Device-List');

          // Perform visual checks
          console.log('Performing visula check')
          await eyes.check('baseline', Target.window().fully());

          // Additional actions or assertions can be performed here

          // Close the test
          await eyes.close();
  } catch (error) {
          console.error('An error occurred:', error);
  } finally {
          // End the test and close the Eyes session
          await eyes.abortIfNotClosed();

          // Capture a screenshot before closing the session
          await captureScreenshot(driver, 'exit');

          // Quit the WebDriver
          await driver.quit();
  }
}

runVisualTest()
  .then(() => {
          console.log('Test completed successfully!');
  })
  .catch((error) => {
          console.error('An error occurred:', error);
  });