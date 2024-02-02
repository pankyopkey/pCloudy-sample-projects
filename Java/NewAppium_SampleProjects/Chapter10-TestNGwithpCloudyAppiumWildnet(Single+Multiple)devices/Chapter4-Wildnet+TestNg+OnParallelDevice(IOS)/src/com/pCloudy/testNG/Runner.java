package com.pCloudy.testNG;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.ios.IOSDriver;
import io.appium.java_client.service.local.AppiumDriverLocalService;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.commons.io.FileUtils;
import org.json.simple.JSONObject;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;


public class Runner {

    AppiumDriverLocalService service;
    AppiumDriver<WebElement> driver;
    String folder_name;
    DateFormat df;


    @BeforeTest
    public void setUpSuite() throws Exception {
    	
    	
    }

    @Parameters({"deviceName"})
    @BeforeMethod
    public void prepareTest(String deviceName) throws IOException, InterruptedException {
    	
    	  JSONObject jsonParams = Tunnel.readJsonParams("src/resources/config.json");
          
          String pCloudy_Username = (String) jsonParams.get("pCloudy_Username");
          String pCloudy_ApiKey = (String) jsonParams.get("pCloudy_ApiKey");
          String baseUrl = (String) jsonParams.get("baseUrl");
    	
        DesiredCapabilities capabilities = new DesiredCapabilities();
        
        capabilities.setCapability("pCloudy_Username", pCloudy_Username);
        capabilities.setCapability("pCloudy_ApiKey", pCloudy_ApiKey);
        capabilities.setCapability("pCloudy_DurationInMinutes", 10);
        capabilities.setCapability("pCloudy_DeviceManafacturer", deviceName);
        capabilities.setCapability("newCommandTimeout", 600);
        capabilities.setCapability("launchTimeout", 90000);
        capabilities.setCapability("automationName", "XCUITest");
        capabilities.setCapability("pCloudy_EnableVideo", "true");
        capabilities.setCapability("pCloudy_WildNet", "true");
        capabilities.setBrowserName("safari");
        Tunnel.validateWildNetCapability(capabilities);
        driver = new IOSDriver(new URL(baseUrl + "/appiumcloud/wd/hub"), capabilities);
    }

    @Test
    public void Test() throws IOException, InterruptedException {
        String website = "http://127.0.0.1:3000";  // Replace by your local url
        System.out.println("Opening website : " + website);
        driver.navigate().to(website);
        System.out.println(website + " : Successfully open");
    }

    @AfterMethod
    public void endTest() throws IOException {
        System.out.println("Closing the driver : " + driver.getCapabilities().getCapability("platformName").toString());
        driver.quit();
        System.out.println(driver.getCapabilities().getCapability("platformName").toString() + " : Driver Closed");
    }

    // Capture screenshot
    public void captureScreenShots() throws IOException {
        folder_name = "screenshot";
        File f = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        // Date format for screenshot file name
        df = new SimpleDateFormat("dd-MMM-yyyy__hh_mm_ssaa");
        // create dir with given folder name
        new File(folder_name).mkdir();
        // Setting file name
        String file_name = df.format(new Date()) + ".png";
        // copy screenshot file into screenshot folder.
        FileUtils.copyFile(f, new File(folder_name + "/" + file_name));
    }

   
}
