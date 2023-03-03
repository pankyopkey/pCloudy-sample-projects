  const webdriver = require("selenium-webdriver");


  const Capabilities={
    browserName: '',
    pCloudy_Username: 'abhinav.purokait@sstsinc.com',
    pCloudy_ApiKey: '49zfjq28dxchvnxgg35nqpfd',
    pCloudy_ApplicationName: 'pCloudyAppiumDemo-1674560861.apk',
    pCloudy_DurationInMinutes: '10',
    pCloudy_DeviceFullName: 'GOOGLE_Pixel7Pro_Android_13.0.0_dbf82',
    //pCloudy_DeviceManafacturer is an optional capability
    pCloudy_DeviceManafacturer: 'Google',
    //pCloudy_DeviceVersion is an optional capability
    pCloudy_DeviceVersion: '13.0.0',
    platformName: 'Android',
    automationName: 'uiautomator2',
    newCommandTimeout: '600',
    launchTimeout: '90000',
    appPackage: 'com.pcloudy.appiumdemo',
    appActivity: 'com.ba.mobile.LaunchActivity',
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
    
    test("Test Android Native App", async () => {
    await driver.findElement(webdriver.By.id("com.pcloudy.appiumdemo:id/accept")).click()
    await driver.findElement(webdriver.By.id("com.pcloudy.appiumdemo:id/flightButton")).click()
    await driver.findElement(webdriver.By.id("com.pcloudy.appiumdemo:id/spinnerfrom")).click()
  }, 1000000);
    
  });
