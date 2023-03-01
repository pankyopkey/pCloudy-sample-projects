  const { Builder, } = require("selenium-webdriver");

  const Capabilities={
  browserName:'chrome',
  pCloudy_Username:'Enter your Email-id',
  pCloudy_ApiKey:'Enter your API Key',
  pCloudy_DurationInMinutes: '10',
  pCloudy_DeviceFullName:"APPLE_iPadPro4thGen_iOS_16.0.0_3a42d" ,
  platformName: 'ios',
  automationName: 'XCUITest',
  newCommandTimeout: '600',
  launchTimeout: '90000',
  pCloudy_EnableVideo : "true",
  }




  describe("pCloudy-Jest Demo", () => {
    let driver;

    beforeAll(() => {
      driver = new Builder()
        .usingServer(`https://device.pcloudy.com/appiumcloud/wd/hub`)
        .withCapabilities(Capabilities)
        .build();
    });

    
    
    afterAll(async () => {
      await driver.quit();
    })
    
    test("Test the browser", async () => {
      const url=await driver.get("https://device.pcloudy.com/start");
    }, 1000000);
  });
