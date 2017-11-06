package com.testng.pCloudy;

import java.io.IOException;

import org.openqa.selenium.WebElement;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;

import com.ssts.pcloudy.exception.ConnectError;

import io.appium.java_client.android.AndroidDriver;

public class TestSetUp {

	@Parameters({ "myDeviceContext" })
	@BeforeTest
	public void beforeTest(String myDeviceContext) {

	}

	@Parameters({ "myDeviceContext" })
	@BeforeClass
	public void beforeClass(String myDeviceContext) throws ConnectError, IOException, InterruptedException {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);
		try {

			myContext.driver = new AndroidDriver<WebElement>(myContext.endpoint, myContext.capabilities);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	@Parameters({ "myDeviceContext" })
	@AfterClass
	public void afterClass(String myDeviceContext) throws ConnectError, IOException {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);

		myContext.driver.quit();

	}

	@Parameters({ "myDeviceContext" })
	@AfterTest(alwaysRun=true)
	public void afterTest(String myDeviceContext) throws Exception {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);
		try {
			myContext.pCloudySession.releaseSessionNow();

		} catch (ConnectError | IOException e) {
			e.printStackTrace();

		} 

	}

}