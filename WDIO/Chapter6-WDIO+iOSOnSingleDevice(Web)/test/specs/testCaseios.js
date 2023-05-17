var path = import('path');

describe('Demo Browser Testing',  () =>{
    
  it('pCloudy lgin Test', async ()=> {

    await browser.url('https://device.pcloudy.com/login')
    console.log(`Opened the pCloudy login page`)
  
    const userid = await $('#userId');
      await userid.waitForDisplayed({timeout : 30000});
      await userid.addValue('test@pcloudy.com')
      console.log("Username Entered");

    const password = await $('#password');
      await password.waitForDisplayed({timeout: 30000});
      await password.addValue('test@1234')
      console.log("Password Entered");

    const login = await $('#loginSubmitBtn');
      await login.waitForDisplayed({timeout : 30000});
      await login.click();
      console.log("login Clicked");
    
  });    
});


