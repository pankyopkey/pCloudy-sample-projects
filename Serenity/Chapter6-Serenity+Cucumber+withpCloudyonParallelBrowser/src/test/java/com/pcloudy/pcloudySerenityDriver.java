package com.pcloudy;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import java.net.MalformedURLException;
import java.net.URL;

public class pcloudySerenityDriver {

    WebDriver driver;
    DesiredCapabilities capabilities;

    @BeforeTest
    public void setUpSuite() throws Exception {
        // Setup suite if needed
    }

    
    

    @BeforeMethod
    public WebDriver prepareTest(String os, String osVersion, String browserName, String browserVersion) {

        try {
            return initializeWebDriver(os, osVersion, browserName, browserVersion);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            throw new RuntimeException("WebDriver initialization failed due to MalformedURLException.", e);
        }
    }

    private WebDriver initializeWebDriver(String os, String osVersion, String browserName, String browserVersion) throws MalformedURLException {
        capabilities = new DesiredCapabilities();
        capabilities.setBrowserName(browserName);
        capabilities.setCapability("os", os);
        capabilities.setCapability("osVersion", osVersion);
        capabilities.setCapability("browserVersion",browserVersion);
        capabilities.setCapability("clientName", "Enter-clientName");
        capabilities.setCapability("apiKey", "Enter-apiKey");
        capabilities.setCapability("email", "Enter-Email");

        // Initializing WebDriver
        driver = new RemoteWebDriver(new URL("https://prod-browsercloud-in.pcloudy.com/seleniumcloud/wd/hub"), capabilities);
        return driver;
    }

  
}
