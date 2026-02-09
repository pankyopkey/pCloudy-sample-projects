package com.pCloudy.dualDriver;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

import io.appium.java_client.AppiumDriver;

/**
 * Sample tests that use either DriverManager.getSeleniumDriver() or
 * DriverManager.getAppiumDriver() (or both) to perform actions.
 */
public class DualDriverTest extends BaseRunner {

    @Test(description = "Uses Selenium driver only: open Google and assert title")
    public void testWithSeleniumOnly() {
        WebDriver driver = DriverManager.getSeleniumDriver();
        Assert.assertNotNull(driver, "Selenium driver should be set by BaseRunner");
        driver.manage().window().maximize();
        driver.get("https://www.google.com/");
        String title = driver.getTitle();
        Assert.assertNotNull(title);
        Assert.assertTrue(title.toLowerCase().contains("google"), "Page title should contain 'google', got: " + title);
    }

    @Test(description = "Uses Appium driver only: tap Accept and Flight in demo app")
    public void testWithAppiumOnly() {
        AppiumDriver driver = DriverManager.getAppiumDriver();
        Assert.assertNotNull(driver, "Appium driver should be set by BaseRunner");
        driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept']")).click();
        driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/flightButton']")).click();
    }

    @Test(description = "Uses both drivers in the same test: Selenium opens URL, then Appium performs app action")
    public void testWithBothDrivers() {
        WebDriver selenium = DriverManager.getSeleniumDriver();
        AppiumDriver appium = DriverManager.getAppiumDriver();
        Assert.assertNotNull(selenium, "Selenium driver should be set");
        Assert.assertNotNull(appium, "Appium driver should be set");

        selenium.manage().window().maximize();
        selenium.get("https://www.google.com/");
        Assert.assertTrue(selenium.getTitle().toLowerCase().contains("google"), "Selenium: Google page opened");

        appium.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept']")).click();
        appium.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/flightButton']")).click();
    }
}
