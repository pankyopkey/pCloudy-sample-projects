package com.pCloudy.dualDriver;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;

import org.openqa.selenium.remote.DesiredCapabilities;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.MobileCapabilityType;

/**
 * Builds pCloudy Appium driver for Android device/app testing.
 * Uses the same pattern as Java/NewAppium_SampleProjects Chapter1 Runner.
 */
public final class pCloudyAppiumDriver {

    private static final String BASE_URL = "https://device.pcloudy.com";
    private static final String APPIUM_HUB = "/appiumcloud/wd/hub";
    private static final String ANDROID_APP = "pCloudyAppiumDemo.apk";
    private static final String APP_PACKAGE = "com.pcloudy.appiumdemo";
    private static final String APP_ACTIVITY = "com.ba.mobile.LaunchActivity";

    private pCloudyAppiumDriver() {
    }

    /**
     * Creates a pCloudy Android AppiumDriver with the given credentials.
     * Replace userName and apiKey with your pCloudy credentials.
     */
    @SuppressWarnings("unchecked")
    public static AppiumDriver createAndroidDriver(String userName, String apiKey) throws MalformedURLException {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("pCloudy_Username", userName);
        capabilities.setCapability("pCloudy_ApiKey", apiKey);
        capabilities.setCapability("pCloudy_ApplicationName", ANDROID_APP);
        capabilities.setCapability("pCloudy_DurationInMinutes", 10);
        capabilities.setCapability("pCloudy_DeviceManafacturer", "Samsung");
        capabilities.setCapability("pCloudy_DeviceVersion", "8.0.0");
        capabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "uiautomator2");
        capabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "8.0.0");
        capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android");
        capabilities.setCapability(MobileCapabilityType.NEW_COMMAND_TIMEOUT, 600);
        capabilities.setCapability("launchTimeout", 90000);
        capabilities.setCapability("appPackage", APP_PACKAGE);
        capabilities.setCapability("appActivity", APP_ACTIVITY);

        return new AndroidDriver(new URL(BASE_URL + APPIUM_HUB), capabilities);
    }

    /**
     * Creates a pCloudy Android AppiumDriver with placeholder credentials.
     * Replace "Enter your email-id" and "Enter your API Key" with your pCloudy credentials.
     */
    @SuppressWarnings("unchecked")
    public static AppiumDriver createAndroidDriver() throws MalformedURLException {
        return createAndroidDriver("Enter your email-id", "Enter your API Key");
    }
}
