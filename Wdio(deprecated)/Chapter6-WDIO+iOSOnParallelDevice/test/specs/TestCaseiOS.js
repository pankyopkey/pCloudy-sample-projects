var path = require('path');

describe('Demo App Testing', function () {
    
  it('Login Functionality', function () {

    browser.setValue('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]','test@testname.com');
    console.log("Email id is entered");
    browser.setValue('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]','testmunk');
    console.log("password is entered");
    browser.click("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]");
    console.log("login button is clicked");
    browser.closeApp()
   });          
});


