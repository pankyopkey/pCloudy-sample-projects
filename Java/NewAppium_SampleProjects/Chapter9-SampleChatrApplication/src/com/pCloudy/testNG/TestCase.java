package com.pCloudy.testNG;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

public class TestCase extends Runner{
	
	@Test
	public void Test() throws IOException, InterruptedException {     

		System.out.println(driverAppium.size());
		driverAppium.get(0).findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept']")).click(); 
		Thread.sleep(5000);


		driverAppium.get(1).findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/btnrefuse']")).click();
        Thread.sleep(5000);


	}
	@AfterMethod
	public void endTest() throws  IOException {

		driverAppium.get(0).quit();
		driverAppium.get(1).quit();
		
	}
	
		 
}
