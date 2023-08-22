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

          eyes.setForceFullPageScreenshot(true);

          // Start the test and set the app name and test name
          await eyes.open(driver, applitools.appName, applitools.testName);
          console.log(`Test started with Applitools App Name : '${applitools.appName}' and Test Name : '${applitools.testName}'`)

          // Capture a screenshot after loading the page
          await captureScreenshot(driver, 'page-loaded');

          const acceptButton = await driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept']"));
          await acceptButton.click();
          console.log("Accept Button clicked");

          console.log('Performing visula check for Accept Button')
          await eyes.checkWindow("Accept Button", Target.window().fully());


          const flightButton = await driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/flightButton']"));
          await flightButton.click();
          console.log("Flight Button clicked");

          console.log('Performing visula check for Flight Button')
          await eyes.checkWindow("Flight Button", Target.window().fully());

          const fromButton = await driver.findElement(By.xpath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerfrom']"));
          await fromButton.click();
          console.log("from selected")

          const fromCity = await driver.findElement(By.xpath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Bangalore, India (BLR)']"));
          await fromCity.click();
          console.log("From city selected");

          const toBtton = await driver.findElement(By.xpath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerto']"));
          await toBtton.click();
          console.log("To selected");

          const toCity = await driver.findElement(By.xpath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Pune, India (PNQ)']"));
          await toCity.click();
          console.log("To city selected");

          const singleTrip = await driver.findElement(By.xpath("//android.widget.RadioButton[@resource-id='com.pcloudy.appiumdemo:id/singleTrip']"));
          await singleTrip.click();
          console.log("Single Trip Selected");

          console.log('Performing visula check for Single Trip')
          await eyes.checkWindow("Single Trip", Target.window().fully());

          const depart = await driver.findElement(By.xpath("//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/txtdepart']"));
          await depart.click();
          console.log("Depart selected");

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