describe('Demo Android Native App test', async function () {
  it('Launch the app', async function () {
    this.nemo.driver.manage().timeouts().implicitlyWait(5000);
    
    await this.nemo.view._find('id:com.pcloudy.appiumdemo:id/accept').click();
    await this.nemo.view._find('id:com.pcloudy.appiumdemo:id/flightButton').click();
    
  });
});
