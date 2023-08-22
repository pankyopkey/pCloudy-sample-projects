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

          // Capture a screenshot after loading the page
          await captureScreenshot(driver, 'page-loaded');

          const userName = await driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]"));
          await userName.sendKeys('test@pcloudy.com');
          console.log("Username Entered");

          console.log('Performing visula check Initial Window')
          await eyes.checkWindow("Initial Window", Target.window().fully());

          const password = await driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]"));
          await password.sendKeys('test@1234');
          console.log("Password Entered");

          const login = await driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]"));
          await login.click();
          console.log("login Clicked")

          // Perform visual checks
          console.log('Performing visula check Final Window')
          await eyes.checkWindow("Final Window", Target.window().fully());

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