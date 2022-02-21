package com.pCloudy.testNG;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.service.local.AppiumDriverLocalService;

public class Runner {

	AppiumDriverLocalService service;
	public AppiumDriver<WebElement> driver;
	DriverIntialize driverIntial=new DriverIntialize();
	String folder_name;
	DateFormat df;
    static ArrayList<AppiumDriver> driverlistAppium=new ArrayList();
	

	@Parameters({"deviceName"})
	@BeforeMethod
	public void prepareTest(String deviceName) throws IOException, InterruptedException {

		DesiredCapabilities capabilities = new DesiredCapabilities();

		capabilities.setCapability("pCloudy_Username", "sridatta.pani@sstsinc.com");
		capabilities.setCapability("pCloudy_ApiKey", "m3pbymd6k69622p99dkjtj5k");
		capabilities.setCapability("pCloudy_ApplicationName", "pCloudy_Appium_Demo.apk");
		capabilities.setCapability("pCloudy_DurationInMinutes", 10);
		//capabilities.setCapability("pCloudy_DeviceManafacturer", deviceName);
		//capabilities.setCapability("pCloudy_DeviceVersion", "8.0.0");
		capabilities.setCapability("pCloudy_DeviceFullName", deviceName);
		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		capabilities.setCapability("appPackage", "com.pcloudy.appiumdemo");
		capabilities.setCapability("appActivity", "com.ba.mobile.LaunchActivity");
		capabilities.setCapability("pCloudy_EnableVideo", true);
		
		driverIntial.capability=capabilities;
		driverIntial.driver= new AndroidDriver(new URL("https://device.pcloudy.com/appiumcloud/wd/hub"), driverIntial.capability);
		driverlistAppium.add(driverIntial.driver);

	}
	


	@Test
	public void Test() throws IOException, InterruptedException {     

		

	}

	
	
}
