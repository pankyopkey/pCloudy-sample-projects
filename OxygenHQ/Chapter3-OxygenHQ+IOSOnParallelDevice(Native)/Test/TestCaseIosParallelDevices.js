const caps={
        browserName: '',
        pCloudy_Username: 'Enter Email',
        pCloudy_ApiKey: 'Enter API Key',          
	    pCloudy_ApplicationName: 'TestmunkDemo_Resigned1675153426.ipa',
        pCloudy_DurationInMinutes: '10',
        //pCloudy_DeviceFullName: 'APPLE_iPadPro4thGen_iOS_16.0.0_3a42d',
        //pCloudy_DeviceManafacturer is an optional capability
        //pCloudy_DeviceManafacturer: 'Apple',
        //pCloudy_DeviceVersion is an optional capability
        //pCloudy_DeviceVersion: '11.2.0',
        platformName: 'iOS',   
        //platformVersion: '16.0',
        automationName: 'XCUITest',
        newCommandTimeout: '600',
        launchTimeout: '90000',
        bundleId: 'com.pcloudy.TestmunkDemo',     
        pCloudy_EnableVideo : "true",
}
mob.init(caps);
    let Email = mob.findElement('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]');
    username= 'test@testname.com';
    mob.type(Email,username);
    console.log("Email id is entered");

    let password = mob.findElement('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]');
    pass= 'hello';
    mob.type(password,pass);
    console.log("password is entered");

    const LButton = mob.findElement('//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]');
    mob.click(LButton)
    console.log("login button is clicked");