package com.pcloudy.testng;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.ssts.pcloudy.exception.ConnectError;
import com.ssts.util.reporting.ExecutionResult;
import com.ssts.util.reporting.SingleRunReport;

import io.appium.java_client.android.AndroidDriver;

public class TestClass1 extends TestSetUp {

	private WebDriver driver;

	@Parameters({ "myDeviceContext" })
	@Test
	public void test1(String myDeviceContext) throws IOException, ConnectError, InterruptedException {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);
		SingleRunReport report = myContext.report;
		AndroidDriver<WebElement> driver = myContext.driver;

		try {

			report.beginTestcase("TestCase test1 :" + getClass().getName());
			report.addComment("--- Add your Test Scripts over here ---");
			
			driver.manage().timeouts().implicitlyWait(50,TimeUnit.SECONDS) ;
			driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept' and @text='Accept']")).click();
			report.addStep("Clicked on Accept Button", "Accept", null, ExecutionResult.Pass);

			if (driver.findElements(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/ecLoginButton' and @text='Log-in']")).size() != 0) {
				report.addStep("Verified Login Button dislay", "resource-id='com.pcloudy.appiumdemo:id/ecLoginButton'", null, takeScreenShot(myContext), ExecutionResult.Pass);
			} else {
				report.addStep("Verified Login Button dislay", "resource-id='com.pcloudy.appiumdemo:id/ecLoginButton'", null, takeScreenShot(myContext), ExecutionResult.Fail);
			}
			
			driver.manage().timeouts().implicitlyWait(50,TimeUnit.SECONDS) ;
			String flightbutton = driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/flightButton']")).getText();     
	        driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/flightButton']")).click();
      
	        if (driver.findElements(By.xpath("//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/textView16' and @text='Adults']")).size() != 0) {
				report.addStep("Verified search flights screen is  displayed", "resource-id='com.pcloudy.appiumdemo:id/textView16'", null, takeScreenShot(myContext), ExecutionResult.Pass);
			} else {
				report.addStep("Verified search flights screen is  displayed", "resource-id='com.pcloudy.appiumdemo:id/textView16'", null, takeScreenShot(myContext), ExecutionResult.Fail);
			}
	        
	        driver.manage().timeouts().implicitlyWait(50,TimeUnit.SECONDS) ;
	        driver.findElement(By.xpath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerfrom']")).click();
			driver.findElement(By.xpath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Bangalore, India (BLR)']")).click();
			if (driver.findElements(By.xpath("//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/textView16' and @text='Adults']")).size() != 0) {
				report.addStep("Verified from location is  displayed", "resource-id='com.pcloudy.appiumdemo:id/textView16'", null, takeScreenShot(myContext), ExecutionResult.Pass);
			} else {
				report.addStep("Verified from location is  displayed", "resource-id='com.pcloudy.appiumdemo:id/textView16'", null, takeScreenShot(myContext), ExecutionResult.Fail);
			}
			
			driver.manage().timeouts().implicitlyWait(50,TimeUnit.SECONDS) ;
	        driver.findElement(By.xpath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerto']")).click();
	        driver.findElement(By.xpath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Pune, India (PNQ)']")).click();
	        if (driver.findElements(By.xpath("//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/textView16' and @text='Adults']")).size() != 0) {
				report.addStep("Verified to location is  displayed", "resource-id='com.pcloudy.appiumdemo:id/textView16'", null, takeScreenShot(myContext), ExecutionResult.Pass);
			} else {
				report.addStep("Verified to location is  displayed", "resource-id='com.pcloudy.appiumdemo:id/textView16'", null, takeScreenShot(myContext), ExecutionResult.Fail);
			}
	        
	        driver.manage().timeouts().implicitlyWait(50,TimeUnit.SECONDS) ;
	        driver.findElement(By.xpath("//android.widget.RadioButton[@resource-id='com.pcloudy.appiumdemo:id/singleTrip']")).click();
	        if (driver.findElements(By.xpath("//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/textView16' and @text='Adults']")).size() != 0) {
				report.addStep("Verified one way is selected", "resource-id='com.pcloudy.appiumdemo:id/textView16'", null, takeScreenShot(myContext), ExecutionResult.Pass);
			} else {
				report.addStep("Verified one way is selected", "resource-id='com.pcloudy.appiumdemo:id/textView16'", null, takeScreenShot(myContext), ExecutionResult.Fail);
			}
	        
	        driver.manage().timeouts().implicitlyWait(50,TimeUnit.SECONDS) ;
	        driver.findElement(By.xpath("//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/txtdepart']")).click();
	        driver.findElement(By.xpath("//android.widget.Button[@resource-id='android:id/button1' and @text='OK']")).click();
	        if (driver.findElements(By.xpath("//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/textView16' and @text='Adults']")).size() != 0) {
				report.addStep("Verified departure date is selected", "resource-id='com.pcloudy.appiumdemo:id/textView16'", null, takeScreenShot(myContext), ExecutionResult.Pass);
			} else {
				report.addStep("Verified departure date is selected", "resource-id='com.pcloudy.appiumdemo:id/textView16'", null, takeScreenShot(myContext), ExecutionResult.Fail);
			}
	        
	        driver.manage().timeouts().implicitlyWait(50,TimeUnit.SECONDS) ;
	        driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/searchFlights']")).click();
	                
	        if (driver.findElements(By.xpath("//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/Sea' and @text='Booking Confirm...']")).size() != 0) {
				report.addStep("Verified Booking is confirmed", "resource-id='com.pcloudy.appiumdemo:id/Sea'", null, takeScreenShot(myContext), ExecutionResult.Pass);
			} else {
				report.addStep("Verified Booking is confirmed", "resource-id='com.pcloudy.appiumdemo:id/Sea'", null, takeScreenShot(myContext), ExecutionResult.Fail);
			}		

			report.addStep("Take Screenshot", null, null, takeScreenShot(myContext), ExecutionResult.Pass);
			report.addComment("End of TestCase # ");
		} catch (Exception e) {
			report.addStep("Exception Occur", null, e.getMessage(), takeScreenShot(myContext), ExecutionResult.Fail);
			throw e;
		}
	}
}