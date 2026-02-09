package com.pCloudy.dualDriver;

import java.net.MalformedURLException;

import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;

import io.appium.java_client.AppiumDriver;

/**
 * Base class that initializes both pCloudy Selenium and Appium drivers
 * in @BeforeMethod and stores them in DriverManager (ThreadLocal).
 * Teardown in @AfterMethod quits both and removes from ThreadLocal.
 */
public abstract class BaseRunner {

    @BeforeTest
    public void setupSuite() throws Exception {
        // Optional suite-level setup
    }

    @BeforeMethod
    public void prepareDrivers() throws MalformedURLException {
        RemoteWebDriver selenium = pCloudySeleniumDriver.createDriver();
        AppiumDriver appium = pCloudyAppiumDriver.createAndroidDriver();
        DriverManager.setSeleniumDriver(selenium);
        DriverManager.setAppiumDriver(appium);
    }

    @AfterMethod
    public void tearDownDrivers() {
        DriverManager.removeDrivers();
    }
}
