package com.pCloudy.testNG;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.ios.IOSDriver;
import io.appium.java_client.service.local.AppiumDriverLocalService;

public class Runner {

	AppiumDriverLocalService service;
	AppiumDriver<WebElement> driver;
	String folder_name;
	DateFormat df;
	String pCloudy_Username= "Enter-username";
	String pCloudy_ApiKey="Enter-apiKey";
	String baseUrl="Base-url";
	
	@BeforeTest
	public void setUpSuite() throws Exception {
		Tunnel.connection(pCloudy_Username,pCloudy_ApiKey,baseUrl);
	}
		
	@BeforeMethod
	public void prepareTest() throws IOException, InterruptedException {
		
		DesiredCapabilities capabilities = new DesiredCapabilities();
		
		capabilities.setCapability("pCloudy_Username",pCloudy_Username);
		capabilities.setCapability("pCloudy_ApiKey", pCloudy_ApiKey);
		capabilities.setCapability("pCloudy_DurationInMinutes", 10);
		capabilities.setCapability("deviceName", "APPLE_iPhone11ProMax_iOS_17.1.1_111d0");
		capabilities.setCapability("pCloudy_WildNet", "true");
		capabilities.setCapability("platformName", "ios");
		capabilities.setCapability("automationName", "XCUITest");
		capabilities.setCapability("pCloudy_EnableVideo", "true");
		capabilities.setBrowserName("safari");
		
		Tunnel.validateWildNetCapability(capabilities);
		driver = new IOSDriver(new URL(baseUrl+"/appiumcloud/wd/hub"), capabilities);
		
		
	}

	
	
	@Test
	public void Test() throws IOException, InterruptedException {
		String website = "http://127.0.0.1:3000"; // change it by your own localhost
		System.out.println("Opening website : " + website);
		driver.navigate().to(website);
		System.out.println(website+" : Successfully open");
	}


	@AfterMethod
	public void endTest() throws  IOException {
		System.out.println("Closing the driver : "+ driver.getCapabilities().getCapability("platformName").toString());
		driver.quit();
		System.out.println(driver.getCapabilities().getCapability("platformName").toString()+" : Driver Closed" );
	}

	//Capture screenshot
	public void captureScreenShots() throws IOException {
        folder_name="screenshot";
        File f=((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
        //Date format for screenshot file name
        df=new  SimpleDateFormat("dd-MMM-yyyy__hh_mm_ssaa");
        //create dir with given folder name
        new File(folder_name).mkdir();
        //Setting file name
        String file_name=df.format(new Date())+".png";
        //copy screenshot file into screenshot folder.
        FileUtils.copyFile(f, new File(folder_name + "/" + file_name));
    }
}


