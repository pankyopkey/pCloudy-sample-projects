package com.pcloudy.cucumber.steps;


import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class StepExecutor {

    public static void executeTestForDrivers(List<WebDriver> drivers) {
        List<Callable<Void>> tasks = new ArrayList<>();
        for (WebDriver driver : drivers) {
            tasks.add(() -> {
            	navigate(driver);
            	username(driver);
            	password(driver);
            	loginButton(driver);

                return null;
            });
        }

        executeConcurrently(tasks);
    }
    
    
    public void navigate(List<WebDriver> drivers) {
        for (WebDriver driver : drivers) {
        	navigate(driver);
        }
    }
    
    public void username(List<WebDriver> drivers) {
        for (WebDriver driver : drivers) {
        	username(driver);
        }
    }
    
    public void password(List<WebDriver> drivers) {
        for (WebDriver driver : drivers) {
        	password(driver);
        }
    }
    
    public void loginButton(List<WebDriver> drivers) {
        for (WebDriver driver : drivers) {
        	loginButton(driver);
        }
    }
    
    

    private static void navigate(WebDriver driver) {
    	 driver.get("https://device.pcloudy.com/");
        System.out.println("Url Open : "+driver);
    }

    private static void username(WebDriver  driver) {
    	String username = "test@pcloudy.com";
    	  driver.findElement(By.id("userId")).sendKeys(username);
        System.out.println("Username Entered : "+driver);
    }
    
    private static void password(WebDriver driver) {
    	String password = "test1234";
    	 driver.findElement(By.id("password")).sendKeys(password);
       System.out.println("Password Entered : "+driver);
    }
    
    private static void loginButton(WebDriver driver) {
    	 driver.findElement(By.id("loginSubmitBtn")).click();
       System.out.println("Login Clicked : "+driver);
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
