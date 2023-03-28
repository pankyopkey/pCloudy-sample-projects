            const { default: driver } = require("appium-android-driver/build/lib/driver");
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

                    
                
                driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept']"))
                .click().then(function(){
                console.log("Accept Button clicked");
                });

                driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/flightButton']"))
                .click().then(function(){
                console.log("Flight Button clicked");
                });

                driver.findElement(By.xpath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerfrom']"))
                .click().then(function(){
                console.log("from selected");
                });

                driver.findElement(By.xpath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Bangalore, India (BLR)']"))
                .click().then(function(){
                console.log("From city selected");
                });

                driver.findElement(By.xpath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerto']"))
                .click().then(function(){
                console.log("To selected");
                });

                driver.findElement(By.xpath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Pune, India (PNQ)']"))
                .click().then(function(){
                console.log("To city selected");
                });

                driver.findElement(By.xpath("//android.widget.RadioButton[@resource-id='com.pcloudy.appiumdemo:id/singleTrip']"))
                .click().then(function(){
                console.log("Single Trip Selected");
                });

                driver.findElement(By.xpath("//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/txtdepart']"))
                .click().then(function(){
                console.log("Depart selected");
                });

                driver.findElement(By.xpath("//android.widget.Button[@resource-id='android:id/button1' and @text='OK']"))
                .click().then(function(){
                console.log("Ok clicked");
                });

                driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/searchFlights']"))
                .click().then(function(){
                console.log("Search flight Button clicked");
                });
                driver.quit().then(function(){
                    done();
                 });
            });
            });
            

