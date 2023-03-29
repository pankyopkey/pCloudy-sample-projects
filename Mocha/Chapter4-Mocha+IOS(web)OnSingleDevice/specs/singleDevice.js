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


    it ('Chrome launched', function name(done) { 
        driver=buildDriver(caps);

        
        driver.get("https://device.pcloudy.com/login").then(function(){;
        console.log("Website open");});
        
    driver.findElement(By.id("userId"))
    .sendKeys("test@pcloudy.com").then(function(){
    console.log("Username Entered");
    });

    driver.findElement(By.id("password"))
    .sendKeys("test@123").then(function(){
    console.log("Password Enetered");
    });

    driver.findElement(By.id("loginSubmitBtn"))
    .click().then(function(){
    console.log("login clicked");
    });
    driver.quit().then(function(){
      done();
   });
    

});
});


