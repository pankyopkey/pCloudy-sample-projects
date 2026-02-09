package com.pCloudy.dualDriver;

import org.openqa.selenium.remote.RemoteWebDriver;

import io.appium.java_client.AppiumDriver;

/**
 * Thread-local holder for pCloudy Selenium and Appium drivers.
 * Use getSeleniumDriver() / getAppiumDriver() in test methods after
 * BaseRunner has initialized drivers in @BeforeMethod.
 */
public final class DriverManager {

    private static final ThreadLocal<RemoteWebDriver> seleniumDriver = new ThreadLocal<>();
    private static final ThreadLocal<AppiumDriver> appiumDriver = new ThreadLocal<>();

    private DriverManager() {
    }

    public static void setSeleniumDriver(RemoteWebDriver driver) {
        seleniumDriver.set(driver);
    }

    public static void setAppiumDriver(AppiumDriver driver) {
        appiumDriver.set(driver);
    }

    /**
     * Returns the Selenium (browser) driver for the current thread.
     * Expected to be set by BaseRunner @BeforeMethod; may return null if not set.
     */
    public static RemoteWebDriver getSeleniumDriver() {
        return seleniumDriver.get();
    }

    /**
     * Returns the Appium (device/app) driver for the current thread.
     * Expected to be set by BaseRunner @BeforeMethod; may return null if not set.
     */
    public static AppiumDriver getAppiumDriver() {
        return appiumDriver.get();
    }

    /**
     * Quits both drivers if non-null and removes them from ThreadLocal.
     * Call from @AfterMethod to avoid leaking threads in parallel runs.
     */
    public static void removeDrivers() {
        RemoteWebDriver sel = seleniumDriver.get();
        if (sel != null) {
            try {
                sel.quit();
            } catch (Exception ignored) {
            }
            seleniumDriver.remove();
        }
        AppiumDriver app = appiumDriver.get();
        if (app != null) {
            try {
                app.quit();
            } catch (Exception ignored) {
            }
            appiumDriver.remove();
        }
    }
}
