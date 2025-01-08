package com.pCloudy.testNG;


import java.io.IOException;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;
import io.appium.java_client.AppiumDriver;
import com.pCloudy.TestCase.*;
import com.pCloudy.Utils.Version;

public class Runner {

	static AppiumDriver driver;
	
	@BeforeTest
	public void setUpSuite() throws Exception {
		
	}
	
	@Parameters({"deviceName","appiumVersion"})
	@BeforeMethod
	public static void prepareTest(String deviceName, String appiumVersion) throws IOException, InterruptedException {
	    boolean isW3C = Version.isVersionGreaterThanTwo(appiumVersion);
	    boolean isIOS = deviceName.toLowerCase().contains("ios");

	    if (isW3C) {
	        driver = isIOS ? Driver.createIosDriverW3C(deviceName, appiumVersion)
	                       : Driver.createAndroidDriverW3C(deviceName, appiumVersion);
	    } else {
	        driver = isIOS ? Driver.createIOSDriver(deviceName, appiumVersion)
	                       : Driver.createAndroidDriver(deviceName, appiumVersion);
	    }
	}
	
	@Parameters({"deviceName"})
	@Test
	public void Test(String deviceName) throws IOException, InterruptedException {
		
		if(deviceName.toLowerCase().contains("ios")) {
			Ios.loginPage(driver);
		}
		else {
			Android.flightBooking(driver);
			}
	}
	

	@Parameters({"deviceName"})
	@AfterMethod
	public void endTest(String deviceName) throws  IOException {
		driver.quit();
	}


	
}