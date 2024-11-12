describe('Demo Android Native App test', async function () {
  it('Launch the app', async function () {
    this.nemo.driver.manage().timeouts().implicitlyWait(5000);
    
    await this.nemo.view._find('xpath://XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]')
    .sendKeys("test@pcloudy.com ");
    await this.nemo.view._find('xpath://XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]')
    .sendKeys("test@pcloudy.com ");
    await this.nemo.view._find('xpath://XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]')
    .click();
    
  });
});
