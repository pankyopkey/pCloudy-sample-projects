package com.pCloudy.testNg;

import java.io.IOException;


import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import com.pCloudy.testCases.DemoTest;

public class Runner {

	RemoteWebDriver driver;

	@BeforeTest
	public void setupSuite() throws Exception{

	}
	@BeforeMethod
	public void prepareDriver() throws IOException, InterruptedException{
		try {
			Driver driverObj = new Driver();
			driver = driverObj.createDriver();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	public void demoTest() throws IOException, InterruptedException{
		try {
			DemoTest demoTest = new DemoTest();
			demoTest.Test(driver);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	@AfterMethod
	public void aftermethod() throws IOException, InterruptedException{
		try {
			driver.quit();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}