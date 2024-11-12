describe('Demo IOS web test', async function () {
  it('Open website', async function () {
    this.nemo.driver.manage().timeouts().implicitlyWait(5000);
    await this.nemo.driver.get("https://device.pcloudy.com/login");
    await this.nemo.view._find('id:userId')
    .sendKeys("test@pcloudy.com ");
    await this.nemo.view._find('id:password')
    .sendKeys("test@pcloudy.com ");
    await this.nemo.view._find('id:loginSubmitBtn')
    .click();
    
  });
});
