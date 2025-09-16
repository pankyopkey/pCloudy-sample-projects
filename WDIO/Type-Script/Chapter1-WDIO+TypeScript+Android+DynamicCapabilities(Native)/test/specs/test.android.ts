import { $ } from '@wdio/globals'

describe('Start Acrobat', () => {

  it('should complete the Acrobat startup flow', async () => {

       let close;

    try {
      // First locator (English)
      close = await $('//android.widget.ImageView[@content-desc="Cross Button"]');
      await close.waitForDisplayed({ timeout: 5000 });
      await close.click();
      console.log("Close Clicked (English)");

    } catch (err) {
      // Fallback locator (Russian)
      close = await $('//android.widget.ImageView[@content-desc="Перекрестные кнопки"]');
      await close.waitForDisplayed({ timeout: 5000 });
      await close.click();
      console.log("Close Clicked (Russian)");
    }

    // Continue button (first)
    const continueButton1 = await $('//android.widget.Button[@resource-id="com.adobe.reader:id/continue_button"]');
    await continueButton1.waitForDisplayed({ timeout: 10000 });
    await continueButton1.click();
    console.log("Continue Clicked");

    // Continue button (second)
    const continueButton2 = await $('//android.widget.Button[@resource-id="com.adobe.reader:id/continue_button"]');
    await continueButton2.waitForDisplayed({ timeout: 10000 });
    await continueButton2.click();
    console.log("Continue Clicked");

    // Permission
    const permission = await $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_deny_button"]');
    await permission.waitForDisplayed({ timeout: 10000 });
    await permission.click();
    console.log("Permission Don't allow");

    await browser.pause(2000);

    // Close (again)
    const close2 = await $('//android.widget.TextView[@resource-id="com.adobe.reader:id/fileName"]');
    await close2.waitForDisplayed({ timeout: 10000 });
    await close2.click();
    console.log("File clicked");

	 await browser.pause(5000);

  });

});
