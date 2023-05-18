package pcloudy.testng;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;

import com.ssts.pcloudy.dto.appium.booking.BookingDtoDevice;
import com.ssts.pcloudy.exception.ConnectError;
import com.ssts.util.reporting.ExecutionResult;
import com.ssts.util.reporting.printers.HtmlFilePrinter;

import io.appium.java_client.ios.IOSDriver;


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
	public void beforeClass(String myDeviceContext) throws Exception {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);

			myContext.report.beginTestcase("@Before Class");
			myContext.report.addComment("@Before Class : " + getClass().getName());
			
			int trialsLeft = 5;
			Exception firstException = null;
			// Thread.sleep(3000);
			while (trialsLeft > 0) {
				trialsLeft--;
				try {
					myContext.driver = new IOSDriver<WebElement>(myContext.endpoint, myContext.capabilities);

					myContext.driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
					myContext.driver.manage().timeouts().pageLoadTimeout(30, TimeUnit.SECONDS);
					myContext.driver.manage().timeouts().setScriptTimeout(10, TimeUnit.SECONDS);
					Thread.sleep(1000);
					myContext.report.addStep("Launch Safari", myContext.capabilities.toString(), myContext.endpoint.toString(), ExecutionResult.Pass);

					navigateTo(myContext.driver, "https://www.google.com");
					myContext.report.addStep("Open URL", null, null, takeScreenShot(myContext), ExecutionResult.Pass);
					return;
				} catch (Exception ex) {
					// report.addComment(ex.getMessage());
					Thread.sleep(3000);
					if (firstException == null)
						firstException = ex;

					if (myContext.driver != null)
						myContext.driver.quit();
				}

			}

			throw firstException;	
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

	public void navigateTo(WebDriver driver, String url) throws InterruptedException {
		driver.navigate().to(url);
		Thread.sleep(5000);
		WebDriverWait wait = new WebDriverWait(driver, 20);
		wait.until(new ExpectedCondition<Boolean>() {
			public Boolean apply(WebDriver driver) {
				String readyState = (String) ((JavascriptExecutor) driver).executeScript("return document.readyState");

				return readyState.equalsIgnoreCase("complete");
			}
		});

	}
}