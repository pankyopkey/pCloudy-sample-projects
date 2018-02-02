package com.testng.pCloudy;

import java.io.File;
import java.io.IOException;

import org.openqa.selenium.WebElement;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;

import com.relevantcodes.extentreports.ExtentReports;
import com.ssts.pcloudy.exception.ConnectError;

import io.appium.java_client.android.AndroidDriver;

public class TestSetUp {
	
	public static ExtentReports report;

	@BeforeSuite
	public void beforeSuite() {
		report=new ExtentReports(System.getProperty("user.dir")+"/pCloudy.html");
		report.loadConfig(new File(System.getProperty("user.dir")+"/extent-config.xml"));

	}
	
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
	
	@AfterSuite
	public void afterSuite() {
		report.flush();
		System.out.println("Reports--> "+System.getProperty("user.dir")+"/pCloudy.html");

	}
	
	protected String takeScreenShot(DeviceContext deviceContext) {
		try {
			File snapshotTmpFile = deviceContext.pCloudySession.takeScreenshot();
//			File snapshotFile = new File(deviceContext.snapshotsFolder, snapshotTmpFile.getName());
//			FileUtils.moveFile(snapshotTmpFile, snapshotFile);
			//return snapshotFile.getAbsolutePath();
			return snapshotTmpFile.getAbsolutePath();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			 e.printStackTrace();
		}
		return null;
	}
	


}