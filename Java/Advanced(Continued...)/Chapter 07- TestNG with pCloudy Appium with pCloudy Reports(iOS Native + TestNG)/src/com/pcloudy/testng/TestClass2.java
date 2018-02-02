package com.pcloudy.testng;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.ssts.pcloudy.exception.ConnectError;
import com.ssts.util.reporting.ExecutionResult;
import com.ssts.util.reporting.SingleRunReport;

import io.appium.java_client.ios.IOSDriver;

public class TestClass2 extends TestSetUp {

	@Parameters({ "myDeviceContext" })
	@Test
	public void test2(String myDeviceContext) throws IOException, ConnectError, InterruptedException {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);
		SingleRunReport report = myContext.report;
		IOSDriver<WebElement> driver = myContext.driver;
		try {

			report.beginTestcase("TestCase test2 :" + getClass().getName());
			report.addComment("--- Add your Test Scripts over here ---");

			driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]")).sendKeys("test@testname.com");
			report.addStep("Enter Email", null, null, takeScreenShot(myContext), ExecutionResult.Pass);
			
			driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]")).sendKeys("testmunk");
			report.addStep("Enter Password", null, null, takeScreenShot(myContext), ExecutionResult.Pass);
			
			driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]")).click();
			report.addStep("Click Login Button", null, null, takeScreenShot(myContext), ExecutionResult.Pass);
			
			report.addStep("Take Screenshot", null, null, takeScreenShot(myContext), ExecutionResult.Pass);
			report.addComment("End of TestCase2 # ");
		} catch (Exception e) {
			report.addStep("Exception Occur", null, e.getMessage(), takeScreenShot(myContext), ExecutionResult.Fail);
			throw e;
		}
	}

}