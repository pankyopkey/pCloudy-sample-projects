const driver= require("appium-base-driver")
const { By } = require("selenium-webdriver");
const { capabilities } = require("../conf/singleDevice.conf");

require("appium-android-driver")
var assert= require("assert"),
webdriver = require("selenium-webdriver"),
conf_file= process.argv[3];


var caps = require("../" + conf_file).capabilities;

var buildDriver = function(caps) {
return new webdriver.Builder()
    .usingServer(
    "https://device.pcloudy.com/appiumcloud/wd/hub"
    )
    .withCapabilities(caps)
    .build();
};



describe("Mocha Demo " + caps.browserName, function() {
var driver;
this.timeout(0);


    it ('Application is launched', function name(done) { 
        driver=buildDriver(caps);

        
    
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


