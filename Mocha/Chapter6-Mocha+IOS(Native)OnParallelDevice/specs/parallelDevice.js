const { By } = require("selenium-webdriver");
const { capabilities } = require("../conf/parallelDevice.conf.js");

require("appium-android-driver");

var assert= require("assert"),
webdriver = require("selenium-webdriver"),
conf_file= process.argv[3];

var buildDriver = function(caps) {
  return new webdriver.Builder()
      .usingServer(
      "https://device.pcloudy.com/appiumcloud/wd/hub"
      )
      .withCapabilities(caps)
      .build();
};

describe("Mocha Demo", function() {
  this.timeout(0);

  capabilities.forEach(function(caps) {
    var driver;

    it('Application is launched on ' + caps.pCloudy_DeviceFullName, function(done) {
      driver = buildDriver(caps);

      driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]"))
    .sendKeys("test@pcloudy.com").then(function(){
    console.log("Username Entered");
    });

    driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]")).
    sendKeys("test@123").then(function(){
    console.log("Email Entered");
    });
    
    driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]")).
    click().then(function(){
    console.log("Login Clicked");
    });  

      driver.quit().then(function(){
        done();
      });
    });
  });
});
