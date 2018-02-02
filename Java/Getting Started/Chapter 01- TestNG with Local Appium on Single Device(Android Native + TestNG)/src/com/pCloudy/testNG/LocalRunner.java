package com.pCloudy.testNG;

import java.io.IOException;
import java.net.URL;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.service.local.AppiumDriverLocalService;

public class LocalRunner {

	AppiumDriverLocalService service;
	AppiumDriver<WebElement> driver;

	@BeforeTest
	public void setUpSuite() throws Exception {
		
		//You may start  Appium server by below code or start manually
//		 service = AppiumDriverLocalService.buildDefaultService();
//		 service.start();
	}

	@BeforeMethod
	public void prepareTest() throws IOException, InterruptedException {
		
		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		capabilities.setCapability("deviceName", Your_Android_Device_ID);
		capabilities.setCapability("browserName", "Android");
		capabilities.setCapability("platformName", "Android");
		capabilities.setCapability("appPackage", "com.ba.mobile");
		capabilities.setCapability("appActivity", "com.ba.mobile.LaunchActivity");
		capabilities.setCapability("rotatable", true);
		capabilities.setCapability("app", System.getProperty("user.dir")+"/com.ba.mobile.apk");
		
		driver = new AndroidDriver<WebElement>(new URL("http://127.0.0.1:4723/wd/hub"), capabilities);
	}

	@Test
	public void Test1() {

		driver.findElement(By.xpath("//android.widget.Button[@resource-id='android:id/button1' and @text='Accept']")).click();
	}

	@Test
	public void Test2() {

		driver.findElement(By.xpath("//android.widget.Button[@resource-id='android:id/button2' and @text='Reject']")).click();
	}

	@AfterMethod
	public void endTest() throws  IOException {

		driver.quit();
	}

	@AfterTest
	public void tearDownSuite() throws IOException {

		//Appium stop in AfterTest
	    //service.stop();
	}
}
