package com.testng.pCloudy;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.ssts.pcloudy.exception.ConnectError;

import io.appium.java_client.android.AndroidDriver;

public class TestClass2 extends TestSetUp {

	@Parameters({ "myDeviceContext" })
	@Test
	public void test2(String myDeviceContext) throws IOException, ConnectError, InterruptedException {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);
		AndroidDriver<WebElement> driver = myContext.driver;
		try {

			// myContext.pCloudySession.extendSession(15); // this will release the session after 15 minutes from now

			driver.findElement(By.xpath("//android.widget.Button[@resource-id='android:id/button1' and @text='Accept']")).click();

			if (driver.findElements(By.xpath("//android.widget.Button[@resource-id='com.ba.mobile:id/ecLoginButton' and @text='Log-in']")).size() != 0) {
				System.out.println("Verified Login Button display");
			} else {
				System.out.println("Verified Login Button not display");
			}

		} catch (Exception e) {
			throw e;
		}
	}

}