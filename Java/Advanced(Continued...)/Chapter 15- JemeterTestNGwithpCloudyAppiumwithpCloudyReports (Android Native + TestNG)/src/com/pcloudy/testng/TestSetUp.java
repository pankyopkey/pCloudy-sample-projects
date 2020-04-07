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
	public void beforeTest(String myDeviceContext) throws IOException, ConnectError {
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

		deleteExistingFile(myContext);
		
		File cpu = myContext.con.AppiumApis().downloadCPUData(myContext.token, myContext.device.rid);
		File mem = myContext.con.AppiumApis().downloadMemoryData(myContext.token, myContext.device.rid);
		File bat = myContext.con.AppiumApis().downloadBatteryData(myContext.token, myContext.device.rid);

		getCpuPerformanceData(myContext, cpu);
		getMemoryPerformanceData(myContext, mem);
		getBatteryPerformanceData(myContext, bat);
		
		runCommand(new String[]{"perl",
				myContext.perlFilePath,
				System.getProperty("user.dir")+File.separator+"Reports"+File.separator+myContext.deviceFolder.getName()});
	}

	/**
	 * To get performance data
	 * @param deviceContext
	 * @param filePath
	 * @return
	 */
	protected String getCpuPerformanceData(DeviceContext deviceContext, File filePath) {
		try {
			File snapshotTmpFile = filePath;
			File snapshotFile = null;
			snapshotFile = new File(deviceContext.deviceFolder, snapshotTmpFile.getName().replaceAll("[0-9]",""));
			FileUtils.moveFile(snapshotTmpFile, snapshotFile);
			return snapshotFile.getAbsolutePath();
		} catch (Exception e) {
			//e.printStackTrace();
		}
		return null;
	}

	protected String getMemoryPerformanceData(DeviceContext deviceContext, File filePath) {
		try {
			File snapshotTmpFile = filePath;
			File snapshotFile = null;
			snapshotFile = new File(deviceContext.deviceFolder, snapshotTmpFile.getName().replaceAll("[0-9]",""));
			FileUtils.moveFile(snapshotTmpFile, snapshotFile);
			return snapshotFile.getAbsolutePath();
		} catch (Exception e) {
			//e.printStackTrace();
		}
		return null;
	}

	protected String getBatteryPerformanceData(DeviceContext deviceContext, File filePath) {
		try {
			File snapshotTmpFile = filePath;
			File snapshotFile = null;
			snapshotFile = new File(deviceContext.deviceFolder, snapshotTmpFile.getName().replaceAll("[0-9]",""));
			FileUtils.moveFile(snapshotTmpFile, snapshotFile);
			return snapshotFile.getAbsolutePath();
		} catch (Exception e) {
			//e.printStackTrace();
		}
		return null;
	}

	/**
	 * Method to delete existing files
	 * @param deviceContext
	 */
	private void deleteExistingFile(DeviceContext deviceContext) {
		File performanceHtmlFile = new File(deviceContext.deviceFolder, "index.html");
		File cpuData = new File(deviceContext.deviceFolder, "cpu.txt");
		File memData = new File(deviceContext.deviceFolder, "mem.txt");
		File batData = new File(deviceContext.deviceFolder, "bat.txt");

		if(cpuData.exists()) {
			cpuData.delete();
		}

		if(memData.exists()) {
			memData.delete();
		}

		if(batData.exists()) {
			batData.delete();
		}

		if(performanceHtmlFile.exists()) {
			performanceHtmlFile.delete();
		}
	}

	/**
	 * Take screenshot method
	 * @param deviceContext
	 * @return
	 */
	protected String takeScreenShot(DeviceContext deviceContext) {
		try {
			File snapshotTmpFile = deviceContext.pCloudySession.takeScreenshot();
			File snapshotFile = new File(deviceContext.snapshotsFolder, snapshotTmpFile.getName());
			FileUtils.moveFile(snapshotTmpFile, snapshotFile);
			return snapshotFile.getAbsolutePath();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Method to run the command
	 * @param command
	 * @return
	 * @throws InterruptedException
	 * @throws IOException
	 */
	public static void runCommand(String[] command) throws InterruptedException, IOException {
		Process process;
		process = Runtime.getRuntime().exec(command);

	}

}