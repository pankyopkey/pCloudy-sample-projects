import { $ } from '@wdio/globals'

describe('Demo App Testing', () => {

	beforeEach(async function () {
		
		const testName = this.currentTest?.title || "Unnamed Test";
		await browser.execute('mobile:update:name', { testName });
		console.log(`Test name set to: ${testName}`);
		
	});

	it('Book A Flight Functionality first', async () => {

		const acceptButton = await $('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/accept")');
		await acceptButton.waitForDisplayed({ timeout: 30000 });
		await acceptButton.click();
		console.log("accept button is clicked");
		await browser.reloadSession();

		
	});

	it('Book A Flight Functionality Second', async () => {

		const acceptButton = await $('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/accept")');
		await acceptButton.waitForDisplayed({ timeout: 30000 });
		await acceptButton.click();
		console.log("accept button is clicked");
		await browser.reloadSession();

	});

	it('Book A Flight Functionality Third', async () => {

		const acceptButton = await $('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/accept")');
		await acceptButton.waitForDisplayed({ timeout: 30000 });
		await acceptButton.click();
		console.log("accept button is clicked");
		await browser.reloadSession();

	});

	it('Book A Flight Functionality Fourth', async () => {

		const acceptButton = await $('android=new UiSelector().resourceId("com.pcloudy.appiumdemo:id/accept")');
		await acceptButton.waitForDisplayed({ timeout: 30000 });
		await acceptButton.click();
		console.log("accept button is clicked");
		
	});
});


