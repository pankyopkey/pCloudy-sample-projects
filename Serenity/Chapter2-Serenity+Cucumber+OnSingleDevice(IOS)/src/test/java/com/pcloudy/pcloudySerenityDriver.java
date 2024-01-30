package com.pcloudy;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.ios.IOSDriver;
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
    public AppiumDriver<WebElement>  prepareTest() {
        System.out.println("Initializing WebDriver..."+driver.getCapabilities().getCapability("pCloudy_DeviceFullName").toString());
        try {
            return initializeWebDriver();
        } catch (MalformedURLException e) {
            e.printStackTrace();
            throw new RuntimeException("WebDriver initialization failed due to MalformedURLException.", e);
        }
    }

    private AppiumDriver<WebElement>  initializeWebDriver() throws MalformedURLException {
    	DesiredCapabilities capabilities = new DesiredCapabilities();
    	capabilities.setCapability("pCloudy_Username", "Enter-Email");
		capabilities.setCapability("pCloudy_ApiKey", "Enter-apiKey");
		capabilities.setCapability("pCloudy_ApplicationName", "TestmunkDemo_Resigned1706469571.ipa");		
		capabilities.setCapability("pCloudy_DurationInMinutes", 10);
		capabilities.setCapability("pCloudy_DeviceFullName", "APPLE_iPhoneXR_iOS_15.1.0_805dd");
		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		capabilities.setCapability("bundleId", "com.pcloudy.TestmunkDemo");
		capabilities.setCapability("automationName", "XCUITest");
		capabilities.setCapability("appiumVersion", "1.22.0");
		capabilities.setCapability("pCloudy_EnableVideo", "true");

        // Initializing WebDriver
        driver = new IOSDriver(new URL("https://device.pcloudy.com/appiumcloud/wd/hub"), capabilities);
        return driver;
    }

}
