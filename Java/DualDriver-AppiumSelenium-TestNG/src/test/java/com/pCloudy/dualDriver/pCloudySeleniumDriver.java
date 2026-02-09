package com.pCloudy.dualDriver;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;

import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

/**
 * Builds pCloudy Selenium RemoteWebDriver for browser testing.
 * Uses the same pattern as selenium/java Chapter1 Driver.
 */
public final class pCloudySeleniumDriver {

    private static final String CLOUD_HOST = "https://browser.device.pcloudy.com";
    private static final String SELENIUM_HUB = "/seleniumcloud/wd/hub";

    private pCloudySeleniumDriver() {
    }

    /**
     * Creates a pCloudy RemoteWebDriver with the given options.
     * Replace userName, accessKey, clientName with your pCloudy credentials.
     */
    public static RemoteWebDriver createDriver(String userName, String accessKey, String clientName,
            String os, String osVersion, String browserName, String browserVersion) throws MalformedURLException {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("browserName", browserName != null ? browserName : "chrome");

        HashMap<String, Object> pcloudyOptions = new HashMap<>();
        pcloudyOptions.put("userName", userName);
        pcloudyOptions.put("accessKey", accessKey);
        pcloudyOptions.put("clientName", clientName);
        pcloudyOptions.put("os", os != null ? os : "Mac");
        pcloudyOptions.put("osVersion", osVersion != null ? osVersion : "Ventura");
        pcloudyOptions.put("browserVersion", browserVersion != null ? browserVersion : "120");
        pcloudyOptions.put("local", false);
        pcloudyOptions.put("seleniumVersion", "3.141.59");
        capabilities.setCapability("pcloudy:options", pcloudyOptions);

        return new RemoteWebDriver(new URL(CLOUD_HOST + SELENIUM_HUB), capabilities);
    }

    /**
     * Creates a pCloudy RemoteWebDriver with default Chrome on Mac/Ventura.
     * Replace Enter-Email, Enter-ApiKey, Enter-Client-name with your pCloudy credentials.
     */
    public static RemoteWebDriver createDriver() throws MalformedURLException {
        return createDriver("Enter-Email", "Enter-ApiKey", "Enter-Client-name",
                "Mac", "Ventura", "chrome", "120");
    }
}
