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
                acceptButton(driver);
                flightButton(driver);

                return null;
            });
        }

        executeConcurrently(tasks);
    }
    
    
    public void acceptButton(List<AppiumDriver<WebElement>> drivers) {
        for (AppiumDriver<WebElement> driver : drivers) {
            acceptButton(driver);
        }
    }
    
    public void flightButton(List<AppiumDriver<WebElement>> drivers) {
        for (AppiumDriver<WebElement> driver : drivers) {
        	flightButton(driver);
        }
    }

    
    

    private static void acceptButton(AppiumDriver<WebElement> driver) {
        driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept']")).click();
        System.out.println("Accept button clicked for :"+driver.getCapabilities().getCapability("pCloudy_DeviceFullName").toString());
    }

    private static void flightButton(AppiumDriver<WebElement> driver) {
    	 driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/flightButton']")).click();
        System.out.println("Flight button clicked  for :"+driver.getCapabilities().getCapability("pCloudy_DeviceFullName").toString());
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
