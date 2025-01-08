package com.pCloudy.testNG;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;

import org.openqa.selenium.remote.DesiredCapabilities;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.ios.IOSDriver;

public class Driver {

	static AppiumDriver driver;
	static String username = "Enter email";
	static String apiKey = "Enter api key";
	static String baseUrl = "https://device.pcloudy.com"; // Enter cloud url  
	static String androidApplicationName = "pCloudyAppiumDemo.apk";
	static String androidAppPackage = "com.pcloudy.appiumdemo";
	static String androidAppactivity = "com.ba.mobile.LaunchActivity";
	static String iosApplicationName = "TestmunkDemo_Resigned1731245983.ipa";
	static String iosBundleId = "com.pcloudy.TestmunkDemo";
	
	
	// IOS Driver creation for W3C capabilities
	public static AppiumDriver createAndroidDriverW3C(String deviceName,String appiumVersion) throws MalformedURLException {

		DesiredCapabilities capabilities = new DesiredCapabilities();

		capabilities.setCapability("appium:newCommandTimeout", 600);
		capabilities.setCapability("appium:launchTimeout", 90000);
		capabilities.setCapability("appium:platformName", "Android");
		capabilities.setCapability("appium:automationName", "uiautomator2");
		capabilities.setCapability("appium:appPackage", androidAppPackage);
		capabilities.setCapability("appium:appActivity", androidAppactivity);
		HashMap<String, Object> pcloudyOptions = new HashMap<String, Object>();
		pcloudyOptions.put("pCloudy_Username",username);
		pcloudyOptions.put("pCloudy_ApiKey", apiKey);
		pcloudyOptions.put("pCloudy_DeviceFullName", deviceName);
		pcloudyOptions.put("pCloudy_ApplicationName", androidApplicationName);
		pcloudyOptions.put("pCloudy_WildNet", false);
		pcloudyOptions.put("pCloudy_EnableVideo", false);
		pcloudyOptions.put("pCloudy_EnablePerformanceData", false);
		pcloudyOptions.put("pCloudy_EnableDeviceLogs", false);
		pcloudyOptions.put("appiumVersion", appiumVersion);
		capabilities.setCapability("pcloudy:options", pcloudyOptions);
		driver = new AndroidDriver(new URL(baseUrl+"/appiumcloud/wd/hub"), capabilities);

		return driver;
	}

	// Android Driver creation for W3C capabilities
	public static AppiumDriver createIosDriverW3C(String deviceName,String appiumVersion) throws MalformedURLException {

		DesiredCapabilities capabilities = new DesiredCapabilities();

		capabilities.setCapability("appium:newCommandTimeout", 600);
		capabilities.setCapability("appium:launchTimeout", 90000);
		capabilities.setCapability("appium:platformName", "ios");
		capabilities.setCapability("appium:acceptAlerts", true);
		capabilities.setCapability("appium:automationName", "XCUITest");
		capabilities.setCapability("appium:bundleId", iosBundleId);
		HashMap<String, Object> pcloudyOptions = new HashMap<String, Object>();
		pcloudyOptions.put("pCloudy_Username", username);
		pcloudyOptions.put("pCloudy_ApiKey", apiKey);
		pcloudyOptions.put("pCloudy_DeviceFullName", deviceName);
		pcloudyOptions.put("pCloudy_ApplicationName", iosApplicationName);
		pcloudyOptions.put("pCloudy_WildNet", false);
		pcloudyOptions.put("pCloudy_EnableVideo", false);
		pcloudyOptions.put("pCloudy_EnablePerformanceData", false);
		pcloudyOptions.put("pCloudy_EnableDeviceLogs", false);
		pcloudyOptions.put("appiumVersion", appiumVersion);
		capabilities.setCapability("pcloudy:options", pcloudyOptions);
		driver = new IOSDriver(new URL(baseUrl+"/appiumcloud/wd/hub"), capabilities);

		return driver;
	}
	

	// IOS Driver creation for legacy capabilities
	public static AppiumDriver createIOSDriver(String deviceName,String appiumVersion) throws MalformedURLException {

		DesiredCapabilities capabilities = new DesiredCapabilities();

		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		capabilities.setCapability("acceptAlerts", true);
		capabilities.setCapability("platformName", "ios");
		capabilities.setCapability("pCloudy_Username",username);
		capabilities.setCapability("pCloudy_ApiKey", apiKey);
		capabilities.setCapability("pCloudy_ApplicationName", iosApplicationName);		
		capabilities.setCapability("pCloudy_DurationInMinutes", 10);
		capabilities.setCapability("pCloudy_DeviceFullName", deviceName);
		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		capabilities.setCapability("bundleId", iosBundleId);
		capabilities.setCapability("automationName", "XCUITest");
		capabilities.setCapability("appiumVersion", appiumVersion);
		capabilities.setCapability("pCloudy_WildNet", false);
		capabilities.setCapability("pCloudy_EnableVideo", false);
		capabilities.setCapability("pCloudy_EnablePerformanceData", false);
		capabilities.setCapability("pCloudy_EnableDeviceLogs", false);
		driver = new IOSDriver(new URL(baseUrl+"/appiumcloud/wd/hub"), capabilities);


		return driver;

	}

	// Android Driver creation for legacy capabilities
	public static AppiumDriver createAndroidDriver(String deviceName,String appiumVersion) throws MalformedURLException {

		DesiredCapabilities capabilities = new DesiredCapabilities();

		capabilities.setCapability("pCloudy_Username", username);
		capabilities.setCapability("pCloudy_ApiKey", apiKey);
		capabilities.setCapability("pCloudy_ApplicationName", androidApplicationName);
		capabilities.setCapability("pCloudy_DurationInMinutes", 10);
		capabilities.setCapability("pCloudy_DeviceFullName", deviceName);
		capabilities.setCapability("acceptAlerts", true);
		capabilities.setCapability("platformName", "Android");
		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		capabilities.setCapability("automationName", "uiautomator2");
		capabilities.setCapability("appPackage", androidAppPackage);
		capabilities.setCapability("appActivity", androidAppactivity);
		capabilities.setCapability("appiumVersion", appiumVersion);
		capabilities.setCapability("pCloudy_WildNet", false);
		capabilities.setCapability("pCloudy_EnableVideo", false);
		capabilities.setCapability("pCloudy_EnablePerformanceData", false);
		capabilities.setCapability("pCloudy_EnableDeviceLogs", false);
		driver = new AndroidDriver(new URL(baseUrl+"/appiumcloud/wd/hub"), capabilities);

		return driver;

	}

}
