var path = require('path');

describe('Demo App Testing', function () {
    
  it('Book A Flight Functionality', function () {
   
    var acceptButton = 'android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/accept")';
      browser.waitForVisible(acceptButton, 30000);
      browser.element(acceptButton).click();
      console.log("accept button is clicked");

    var flightButton = 'android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/flightButton")';
      browser.waitForVisible(flightButton, 30000);
      browser.element(flightButton).click();
      console.log("flight button is clicked");

    var fromLocation = 'android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/spinnerfrom")';
      browser.waitForVisible(fromLocation, 30000);
      browser.element(fromLocation).click();
      browser.click("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Bangalore, India (BLR)']");
      console.log("from location is selected");

    var toLocation = 'android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/spinnerto")';
      browser.waitForVisible(toLocation, 30000);
      browser.element(toLocation).click();
      browser.click("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Pune, India (PNQ)']");
      console.log("to location is selected");

    
    var oneway = 'android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/singleTrip")';
      browser.waitForVisible(oneway, 30000);
      browser.element(oneway).click();
      console.log("oneway option is selected");

    var departureTime = 'android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/txtdepart")';
      browser.waitForVisible(departureTime, 30000);
      browser.element(departureTime).click();
      browser.click("//android.widget.Button[@resource-id='android:id/button1' and @text='OK']");
      console.log("departureTime is selected");

    var searchflightsButton = 'android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/searchFlights")';
      browser.waitForVisible(searchflightsButton, 30000);
      browser.element(searchflightsButton).click();
      console.log("searchflight button is clicked");
   });    
});


