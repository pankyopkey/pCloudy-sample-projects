package com.pcloudy.cucumber.steps;
import io.appium.java_client.AppiumDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class StepExecutor {

    public static void executeTestForDrivers(List<AppiumDriver<WebElement>> drivers) {
        List<Callable<Void>> tasks = new ArrayList<>();
        for (AppiumDriver<WebElement> driver : drivers) {
            tasks.add(() -> {
            	email(driver);
            	password(driver);
            	loginClick(driver);

                return null;
            });
        }

        executeConcurrently(tasks);
    }
    
    
    public void email(List<AppiumDriver<WebElement>> drivers) {
        for (AppiumDriver<WebElement> driver : drivers) {
        	email(driver);
        }
    }
    
    public void password(List<AppiumDriver<WebElement>> drivers) {
        for (AppiumDriver<WebElement> driver : drivers) {
        	password(driver);
        }
    }
    
    public void loginClick(List<AppiumDriver<WebElement>> drivers) {
        for (AppiumDriver<WebElement> driver : drivers) {
        	loginClick(driver);
        }
    }

    
    

    private static void email(AppiumDriver<WebElement> driver) {
    	driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]")).sendKeys("test@testname.com");
        System.out.println("Email Entered In :"+driver.getCapabilities().getCapability("pCloudy_DeviceFullName").toString());
    }

    private static void password(AppiumDriver<WebElement> driver) {
    	driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]")).sendKeys("testmunk");
    	 System.out.println("Email Entered In :"+driver.getCapabilities().getCapability("pCloudy_DeviceFullName").toString());
    }
    
    private static void loginClick(AppiumDriver<WebElement> driver) {
    	driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]")).click();
    	 System.out.println("Login Clicked In  :"+driver.getCapabilities().getCapability("pCloudy_DeviceFullName").toString());
    }


    // Define other methods similarly...

    private static void executeConcurrently(List<Callable<Void>> tasks) {
        int numThreads = tasks.size();
        ExecutorService executorService = Executors.newFixedThreadPool(numThreads);
        List<Future<Void>> futures;

        try {
            futures = executorService.invokeAll(tasks);

            for (Future<Void> future : futures) {
                future.get(); // Wait for each task to complete
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            executorService.shutdown();
        }
    }
}
