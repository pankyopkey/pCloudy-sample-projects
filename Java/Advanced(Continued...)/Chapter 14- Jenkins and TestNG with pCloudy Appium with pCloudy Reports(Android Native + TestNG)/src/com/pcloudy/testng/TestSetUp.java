package com.pcloudy.testng;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.WebElement;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;

import com.ssts.pcloudy.dto.appium.booking.BookingDtoDevice;
import com.ssts.pcloudy.exception.ConnectError;
import com.ssts.util.reporting.ExecutionResult;
import com.ssts.util.reporting.printers.HtmlFilePrinter;

import io.appium.java_client.android.AndroidDriver;

public class TestSetUp {

	@Parameters({ "myDeviceContext" })
	@BeforeTest
	public void beforeTest(String myDeviceContext) {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);
		myContext.report.beginTestcase("@Before Test: " + this.getClass().getName());
		myContext.report.addStep("@BeforeTest", null, null, ExecutionResult.Pass);

		BookingDtoDevice aDevice = myContext.device;
		myContext.deviceFolder = new File(Controller.ReportsFolder, aDevice.manufacturer + " " + aDevice.model + " " + aDevice.version);
		myContext.snapshotsFolder = new File(myContext.deviceFolder, "Snapshots");
		myContext.snapshotsFolder.mkdirs();
		myContext.report.addStep("Create Report Folders", null, null, ExecutionResult.Pass);
	}

	@Parameters({ "myDeviceContext" })
	@BeforeClass
	public void beforeClass(String myDeviceContext) throws ConnectError, IOException, InterruptedException {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);
		try {

			myContext.report.beginTestcase("@Before Class");
			myContext.report.addComment("@Before Class : " + getClass().getName());

			myContext.driver = new AndroidDriver<WebElement>(myContext.endpoint, myContext.capabilities);

			myContext.report.addStep("Launch App", myContext.capabilities.toString(), myContext.endpoint.toString(), ExecutionResult.Pass);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	@Parameters({ "myDeviceContext" })
	@AfterClass
	public void afterClass(String myDeviceContext) throws ConnectError, IOException {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);

		myContext.report.beginTestcase("@AfterClass");
		myContext.report.addStep("@AfterClass : " + getClass().getName(), null, null, ExecutionResult.Pass);
		myContext.driver.quit();
		myContext.report.addStep("Quit Driver Object", null, null, ExecutionResult.Pass);

	}

	@Parameters({ "myDeviceContext" })
	@AfterTest(alwaysRun=true)
	public void afterTest(String myDeviceContext) throws Exception {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);
		try {
			myContext.report.beginTestcase("@After Test: " + this.getClass().getName());
			myContext.pCloudySession.releaseSessionNow();
			myContext.report.addStep("Release Appium Session", null, null, ExecutionResult.Pass);

		} catch (ConnectError | IOException e) {
			myContext.report.addStep("Error Running TestCase", null, e.getMessage(), ExecutionResult.Fail);
			e.printStackTrace();

		} finally {
			HtmlFilePrinter printer = new HtmlFilePrinter(new File(myContext.deviceFolder, myContext.deviceFolder.getName() + ".html"));
			printer.printSingleRunReport(myContext.report);
		}

	}

	protected String takeScreenShot(DeviceContext deviceContext) {
		try {
			File snapshotTmpFile = deviceContext.pCloudySession.takeScreenshot();
			File snapshotFile = new File(deviceContext.snapshotsFolder, snapshotTmpFile.getName());
			FileUtils.moveFile(snapshotTmpFile, snapshotFile);
			return snapshotFile.getAbsolutePath();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			// e.printStackTrace();
		}
		return null;
	}
}