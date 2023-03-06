  var path = import('path');

  describe('Demo App Testing',  () =>{
      
    it('Book A Flight Functionality', async ()=> {
    
      const acceptButton = await $('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/accept")');
        await acceptButton.waitForDisplayed({timeout : 30000});
        await acceptButton.click();
        console.log("accept button is clicked");

      const flightButton = await $('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/flightButton")');
        await flightButton.waitForDisplayed({timeout: 30000});
        await flightButton.click();
        console.log("flight button is clicked");

      const fromLocation = await $('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/spinnerfrom")');
        await fromLocation.waitForDisplayed({timeout : 30000});
        await fromLocation.click();
        console.log("From is clicked");
        const SelectFromCity = await $("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Bangalore, India (BLR)']");
        await SelectFromCity.click();
        console.log("from location is selected");

      const toLocation = await $('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/spinnerto")');
        await toLocation.waitForDisplayed({timeout : 30000});
        await toLocation.click();
        console.log("To is clicked");
        const SelecttoCity= await $("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Pune, India (PNQ)']");
        await SelecttoCity.click();
        console.log("To location is selected");

      
      const oneway = await $('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/singleTrip")');
        await oneway.waitForDisplayed({timeout : 30000});
        await oneway.click();
        console.log("oneway option is selected");

      const departureTime = await $('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/txtdepart")');
        await departureTime.waitForDisplayed({timeout : 30000});
        await departureTime.click();
        console.log("departureTime is selected");
        const Okay= await $("//android.widget.Button[@resource-id='android:id/button1' and @text='OK']");
        await Okay.click();
        console.log("Ok is clicked");

      const searchflightsButton = await $('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/searchFlights")');
        await searchflightsButton.waitForDisplayed({timeout : 30000});
        await searchflightsButton.click();
        console.log("searchflight button is clicked");
      
    });    
  });


