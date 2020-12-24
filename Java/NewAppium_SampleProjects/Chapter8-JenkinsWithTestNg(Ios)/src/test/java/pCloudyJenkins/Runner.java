package pCloudyJenkins;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.ios.IOSDriver;
import io.appium.java_client.service.local.AppiumDriverLocalService;


public class Runner {

	AppiumDriverLocalService service;
	AppiumDriver<WebElement> driver;
	String folder_name;
	DateFormat df;

	@BeforeTest
	public void setUpSuite() throws Exception {

	}

	@Parameters({"device"})
	@BeforeMethod
	public void prepareTest(String device) throws IOException, InterruptedException {

		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability("pCloudy_Username", System.getenv("pCloudy_Username"));
		capabilities.setCapability("pCloudy_ApiKey",  System.getenv("pCloudy_ApiKey"));
		capabilities.setCapability("pCloudy_ApplicationName", System.getenv("pCloudy_ApplicationName"));
		capabilities.setCapability("pCloudy_DurationInMinutes",System.getenv("pCloudy_DurationInMinutes"));
		capabilities.setCapability("pCloudy_DeviceFullName", device);
		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		capabilities.setCapability("bundleId", "com.pcloudy.TestmunkDemo");
		capabilities.setCapability("acceptAlerts", true);
		capabilities.setCapability("automationName", "XCUITest");
		driver = new IOSDriver(new URL("https://device.pcloudy.com/appiumcloud/wd/hub"), capabilities);

	}

	@Test
	public void Test() throws IOException, InterruptedException {
		driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]")).sendKeys("test@testname.com");
		captureScreenShots();

		//Enter Password		
		driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]")).sendKeys("testmunk");
		captureScreenShots();

		//Click on login button	
		driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]")).click();
		captureScreenShots();
	}


	@AfterMethod
	public void endTest() throws  IOException {

		driver.quit();
	}

	//Capture screenshot
	public void captureScreenShots() throws IOException {
		folder_name="screenshot";
		File f=((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
		//Date format for screenshot file name
		df=new  SimpleDateFormat("dd-MMM-yyyy__hh_mm_ssaa");
		//create dir with given folder name
		new File(folder_name).mkdir();
		//Setting file name
		String file_name=df.format(new Date())+".png";
		//copy screenshot file into screenshot folder.
		FileUtils.copyFile(f, new File(folder_name + "/" + file_name));
	}


}
