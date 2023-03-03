  const webdriver = require("selenium-webdriver");


  const Capabilities={
    browserName: '',
    pCloudy_Username:'Enter your Email-id',
    pCloudy_ApiKey: 'Enter your API Key',
    pCloudy_ApplicationName: 'TestmunkDemo_Resigned1675153426.ipa',
    pCloudy_DurationInMinutes: '10',
    pCloudy_DeviceFullName:'APPLE_iPadPro4thGen_iOS_16.0.0_3a42d',
    platformName: 'ios',
    platformVersion: '16.0.0',
    automationName: 'XCUITest',
    newCommandTimeout: '600',
    launchTimeout: '900',
    bundleId:'com.pcloudy.TestmunkDemo',
    pCloudy_EnableVideo : "true",
  }




  describe("pCloudy-Jest Demo", () => {
    let driver;

    beforeAll(() => {
      driver = new webdriver.Builder()
        .usingServer(`https://device.pcloudy.com/appiumcloud/wd/hub`)
        .withCapabilities(Capabilities)
        .build();
    });

    
    
    afterAll(async () => {
      await driver.quit();
    })
    
    test("Test the browser", async () => {
    await driver.findElement(webdriver.By.xpath("//XCUIElementTypeApplication[@name=\"TestmunkDemo\"]/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeTextField"))
    .sendKeys("test@testname.com");
    await driver.findElement(webdriver.By.xpath("///XCUIElementTypeApplication[@name=\"TestmunkDemo\"]/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeSecureTextField"))
    .sendKeys("test@testname.com");
    await driver.findElement(webdriver.By.xpath("//XCUIElementTypeStaticText[@name=\"SIGN IN\"]"))
    .click();
  }, 1000000);
    
  });


  