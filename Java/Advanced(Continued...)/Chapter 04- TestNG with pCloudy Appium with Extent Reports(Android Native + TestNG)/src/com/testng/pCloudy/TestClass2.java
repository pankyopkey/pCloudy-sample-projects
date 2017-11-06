package com.testng.pCloudy;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.relevantcodes.extentreports.ExtentTest;
import com.relevantcodes.extentreports.LogStatus;
import com.ssts.pcloudy.exception.ConnectError;

import io.appium.java_client.android.AndroidDriver;

public class TestClass2 extends TestSetUp {

	@Parameters({ "myDeviceContext" })
	@Test
	public void test2(String myDeviceContext) throws IOException, ConnectError, InterruptedException {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);
		AndroidDriver<WebElement> driver = myContext.driver;
		ExtentTest logger = report.startTest(myDeviceContext + " | "+"test2");
		try {
			logger.log(LogStatus.PASS, "Application Opened Successfully");
			
			driver.findElement(By.xpath("//android.widget.Button[@resource-id='android:id/button1' and @text='Accept']")).click();
			logger.log(LogStatus.PASS, "Clicked Accept Button");
			
			if (driver.findElements(By.xpath("//android.widget.Button[@resource-id='com.ba.mobile:id/ecLoginButton' and @text='Log-in']")).size() != 0) {
				logger.log(LogStatus.PASS, "Verified Login Button display");
			} else {
				logger.log(LogStatus.FAIL, "Verified Login Button not display");
				logger.addScreenCapture(takeScreenShot(myContext));
			}
		} catch (Exception e) {
			logger.log(LogStatus.ERROR, "Error Occur"+e);
			logger.addScreenCapture(takeScreenShot(myContext));
			throw e;
		}
	}

}