package com.pCloudy.testNG;

import java.io.IOException;

import org.openqa.selenium.By;

import org.openqa.selenium.WebElement;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

import io.appium.java_client.AppiumDriver;

public class TestCase extends Runner{
	
	public  AppiumDriver<WebElement> Hostdriver;
	public  AppiumDriver<WebElement> Childdriver;
	
	@Test
	public void Test() throws IOException, InterruptedException {     

		Hostdriver=driverlistAppium.get(0);
		Childdriver=driverlistAppium.get(1);
		
		System.out.println(driverlistAppium.size());
		Hostdriver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept']")).click(); 
		Thread.sleep(5000);


		Childdriver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/btnrefuse']")).click();
        Thread.sleep(5000);


	}
	@AfterMethod
	public void endTest() throws  IOException {

		Hostdriver.quit();
		Childdriver.quit();
		
	}
	
		 
}
