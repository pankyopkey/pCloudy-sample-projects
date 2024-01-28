package com.pcloudy;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.service.local.AppiumDriverLocalService;

import java.net.MalformedURLException;
import java.net.URL;

public class pcloudySerenityDriver {

	AppiumDriverLocalService service;
	AppiumDriver<WebElement> driver;
    DesiredCapabilities capabilities;

    @BeforeTest
    public void setUpSuite() throws Exception {
        // Setup suite if needed
    }

    
    
    
    @BeforeMethod
    public AppiumDriver<WebElement>  prepareTest(String pCloudy_DeviceFullName) {

        try {
            return initializeWebDriver(pCloudy_DeviceFullName);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            throw new RuntimeException("WebDriver initialization failed due to MalformedURLException.", e);
        }
    }

    private  AppiumDriver<WebElement> initializeWebDriver(String pCloudy_DeviceFullName) throws MalformedURLException {
    	DesiredCapabilities capabilities = new DesiredCapabilities();
		
		capabilities.setCapability("pCloudy_Username", "Enter-Email");
		capabilities.setCapability("pCloudy_ApiKey", "Enter-apiKey");
		capabilities.setCapability("pCloudy_ApplicationName", "pCloudyAppiumDemo.apk");
		capabilities.setCapability("pCloudy_DurationInMinutes", 10);
		capabilities.setCapability("pCloudy_DeviceFullName", pCloudy_DeviceFullName);
		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		capabilities.setCapability("automationName", "uiautomator2");
		capabilities.setCapability("platformVersion", "14.0.0");
		capabilities.setCapability("appPackage", "com.pcloudy.appiumdemo");
		capabilities.setCapability("appActivity", "com.ba.mobile.LaunchActivity");
		capabilities.setCapability("appiumVersion", "1.22.0");

        // Initializing WebDriver
        driver = new AndroidDriver(new URL("https://device.pcloudy.com/appiumcloud/wd/hub"), capabilities);
        return driver;
    }

   
}