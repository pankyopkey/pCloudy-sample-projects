mob.init();
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