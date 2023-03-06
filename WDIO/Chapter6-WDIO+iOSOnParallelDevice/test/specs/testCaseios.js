  var path = import('path');

  describe('Demo App Testing',  () => {
      
    it('Login Functionality', async ()=> {

      const Email = await $('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]');
      await Email.setValue('test@testname.com');
      console.log("Email id is entered");
      const password = await $('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]');
      await password.setValue('testmunk');
      console.log("password is entered");
      const LButton = await $('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]');
      await LButton.click();
      console.log("login button is clicked");
      //browser.closeApp();
    });         
  });

