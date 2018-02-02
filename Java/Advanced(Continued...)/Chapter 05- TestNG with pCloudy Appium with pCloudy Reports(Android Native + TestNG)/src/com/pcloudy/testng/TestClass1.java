package com.pcloudy.testng;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.ssts.pcloudy.exception.ConnectError;
import com.ssts.util.reporting.ExecutionResult;
import com.ssts.util.reporting.SingleRunReport;

import io.appium.java_client.android.AndroidDriver;

public class TestClass1 extends TestSetUp {

	@Parameters({ "myDeviceContext" })
	@Test
	public void test1(String myDeviceContext) throws IOException, ConnectError, InterruptedException {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);
		SingleRunReport report = myContext.report;
		AndroidDriver<WebElement> driver = myContext.driver;

		try {

			report.beginTestcase("TestCase test1 :" + getClass().getName());
			report.addComment("--- Add your Test Scripts over here ---");

			driver.findElement(By.xpath("//android.widget.Button[@resource-id='android:id/button1' and @text='Accept']")).click();
			report.addStep("Clicked on Accept Button", "Accept", null, ExecutionResult.Pass);

			if (driver.findElements(By.xpath("//android.widget.Button[@resource-id='com.ba.mobile:id/ecLoginButton' and @text='Log-in']")).size() != 0) {
				report.addStep("Verified Login Button dislay", "resource-id='com.ba.mobile:id/ecLoginButton'", null, takeScreenShot(myContext), ExecutionResult.Pass);
			} else {
				report.addStep("Verified Login Button dislay", "resource-id='com.ba.mobile:id/ecLoginButton'", null, takeScreenShot(myContext), ExecutionResult.Fail);
			}

			report.addStep("Take Screenshot", null, null, takeScreenShot(myContext), ExecutionResult.Pass);
			report.addComment("End of TestCase # ");
		} catch (Exception e) {
			report.addStep("Exception Occur", null, e.getMessage(), takeScreenShot(myContext), ExecutionResult.Fail);
			throw e;
		}
	}

}