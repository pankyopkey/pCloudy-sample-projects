const caps= {
    browserName: '',
    pCpCloudy_Username: 'Enter Email',
    pCloudy_ApiKey: 'Enter API Key',
    pCloudy_ApplicationName: 'pCloudyAppiumDemo-1674560861.apk',
    pCloudy_DurationInMinutes: '10',
    //pCloudy_DeviceFullName: 'GOOGLE_Pixel7_Android_13.0.0_81870',
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
} ;

mob.init(caps)
let acceptBouuton = mob.findElement("id=com.pcloudy.appiumdemo:id/accept");
mob.waitForVisible(acceptBouuton,10000);
mob.click(acceptBouuton);
console.log("Accept Button Clicked");


let flightButton = mob.findElement("id=com.pcloudy.appiumdemo:id/flightButton");
mob.waitForVisible(flightButton,3000);
mob.click(flightButton);
console.log("Flight Button Clicked");


let FromLocation = mob.findElement('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/spinnerfrom")');
mob.waitForVisible(FromLocation,3000);
mob.click(FromLocation);
console.log("From is Clicked");
let FromCity = mob.findElement("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Bangalore, India (BLR)']");
mob.waitForVisible(FromCity,3000);
mob.click(FromCity);
console.log("From City is selected");


let ToLocation = mob.findElement('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/spinnerto")');
mob.waitForVisible(ToLocation,3000);
mob.click(ToLocation);
console.log("To is Clicked");
let ToCity = mob.findElement("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Pune, India (PNQ)']");
mob.waitForVisible(ToCity,3000);
mob.click(ToCity);
console.log("To City is selected");


let OneWay = mob.findElement('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/singleTrip")');
mob.waitForVisible(OneWay,3000);
mob.click(OneWay);
console.log("One Way Option is selected");


let DepartureTime = mob.findElement('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/txtdepart")');
mob.waitForVisible(DepartureTime,3000);
mob.click(DepartureTime);
console.log("Departure Time is selected");
let Okay = mob.findElement("//android.widget.Button[@resource-id='android:id/button1' and @text='OK']");
mob.waitForVisible(Okay,3000);
mob.click(Okay);
console.log("Okay is Pressed");


let SearchFlight = mob.findElement('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/searchFlights")');
mob.waitForVisible(SearchFlight,3000);
mob.click(SearchFlight);
console.log("One Way Option is selected");