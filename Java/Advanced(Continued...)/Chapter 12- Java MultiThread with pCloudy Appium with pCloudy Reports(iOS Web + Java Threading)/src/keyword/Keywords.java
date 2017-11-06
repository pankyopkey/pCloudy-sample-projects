package keyword;

import java.io.File;
import java.net.URL;
import java.util.Calendar;
import java.util.concurrent.TimeUnit;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.ssts.pcloudy.appium.PCloudyAppiumSession;
import com.ssts.util.reporting.ExecutionResult;
import com.ssts.util.reporting.SingleRunReport;

import io.appium.java_client.AppiumDriver;

public class Keywords {

	private SingleRunReport report;
	private RemoteWebDriver driver;
	private PCloudyAppiumSession pCloudySession;

	public Keywords(SingleRunReport report, PCloudyAppiumSession pCloudySession) {
		this.report = report;
		this.pCloudySession = pCloudySession;
	}

	public RemoteWebDriver getDriver() {
		return this.driver;
	}

	private String getSnapshot_() {
		return null;
	}

	private String getSnapshot() {
		try {

			File folder = new File("Reports/" + report.Header, "Snapshots");
			folder.mkdirs();

			File destScreenshot = new File(folder, "Snap_" + Calendar.getInstance().getTimeInMillis() + ".png");

			logActivity("Taking Screenshot", "");

			if (pCloudySession == null) {
				File scrFile = driver.getScreenshotAs(OutputType.FILE);
				FileUtils.copyFile(scrFile, destScreenshot);
			} else {
				File tmpFile = pCloudySession.takeScreenshot();
				FileUtils.moveFile(tmpFile, destScreenshot);
			}
			return destScreenshot.getAbsolutePath();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public void navigateTo(String url) throws InterruptedException {
		report.addComment("Current Title: " + driver.getTitle());
		driver.navigate().to(url);
		Thread.sleep(5000);
		WebDriverWait wait = new WebDriverWait(driver, 20);
		wait.until(pageLoadCondition);
		report.addStep("Navigate to URL", url, driver.getTitle(), getSnapshot(), ExecutionResult.Pass);

	}

	ExpectedCondition<Boolean> pageLoadCondition = new ExpectedCondition<Boolean>() {
		public Boolean apply(WebDriver driver) {
			String readyState = (String) ((JavascriptExecutor) driver).executeScript("return document.readyState");

			report.addComment("Document ReadyState: " + readyState);
			return readyState.equalsIgnoreCase("complete");
		}
	};

	private void waitForObjectInner(By by, int timeOutInSeconds, boolean addStepInReport, String objectName) throws InterruptedException {
		long startTime = Calendar.getInstance().getTimeInMillis();
		while (true) {
			long currentTime = Calendar.getInstance().getTimeInMillis();

			int secondsElapsed = (int) ((currentTime - startTime) / 1000);

			if (secondsElapsed > timeOutInSeconds) {
				System.err.println("Object not found in the defined time");
				if (addStepInReport) {
					String snap = getSnapshot();
					report.addStep("Wait for Object", secondsElapsed + ", [" + objectName + "] Object not found in the defined time", null, snap, ExecutionResult.Fail);
				}
				break;
			}

			try {
				WebElement elem = driver.findElement(by);
				if (elem.isDisplayed() == true) {

					if (addStepInReport)
						report.addStep("Wait for Object", timeOutInSeconds + ", " + objectName, null, getSnapshot(), ExecutionResult.Pass);

					logActivity("Wait For Object", timeOutInSeconds + "");
					return;
				}
			} catch (Exception ex) {
				Thread.sleep(1000);

			}

		}
	}

	public void WaitForObject(By by, int timeOutInSeconds, String objectNameForReport) {
		try {
			waitForObjectInner(by, timeOutInSeconds, true, objectNameForReport);
		} catch (InterruptedException e) {

		}
	}

	public void ClickObject(By by, String objectNameForReport) {
		try {
			waitForObjectInner(by, 5, false, objectNameForReport);
			driver.findElement(by).click();
			report.addStep("Click an element", objectNameForReport, null, getSnapshot(), ExecutionResult.Pass);
			logActivity("Click an element", objectNameForReport);
		} catch (Exception e) {
			report.addStep("Click an element", objectNameForReport, e.toString(), getSnapshot(), ExecutionResult.Fail);
		}
	}

	public void TypeText(By by, String text) {
		try {
			waitForObjectInner(by, 5, false, by.toString());
			WebElement element = driver.findElement(by);

			element.sendKeys(text);
			// driver.executeScript("arguments[0].setAttribute('value', '" + text + "')", element);

			// http://stackoverflow.com/questions/25583641/set-value-of-input-instead-of-sendkeys-selenium-webdriver-nodejs

			// https://bugs.chromium.org/p/chromedriver/issues/detail?id=1018

			String snap = getSnapshot();
			report.addStep("TypeText", text, null, snap, ExecutionResult.Pass);
			logActivity("TypeText", text);
		} catch (Exception e) {
			String snap = getSnapshot();
			report.addStep("TypeText", text, e.toString(), snap, ExecutionResult.Fail);
		}
	}

	public void swipe(Point startPoint, Point endPoint) {
		// Util.Log(startPoint.toString());
		// Util.Log(endPoint.toString());

		((AppiumDriver) driver).swipe(startPoint.x, startPoint.y, endPoint.x, endPoint.y, 200);
		logActivity("Swipe", startPoint.toString() + " -to-" + endPoint.toString());
	}

	/*
	 * public static void swipeUp(AppiumDriver driver) { Dimension dimension = driver.manage().window().getSize(); int centerX = dimension.getWidth() / 2; int centerY = dimension.getHeight() / 2;
	 * 
	 * Point startPoint = new Point(centerX, centerY); Point endPoint = new Point(centerX, centerY / 2);
	 * 
	 * Keywords.swipe(startPoint, endPoint, driver);
	 * 
	 * }
	 * 
	 * public static boolean ObjectExists(By by, AppiumDriver driver) { try { driver.findElement(by); return true; } catch (Exception ex) { return false; } }
	 * 
	 * public static void WaitForObjectDisappear(By by, AppiumDriver driver, int timeOutInSeconds) throws Exception { long startTime = Calendar.getInstance().getTimeInMillis(); while (true) {
	 * Thread.sleep(1500); long currentTime = Calendar.getInstance().getTimeInMillis();
	 * 
	 * int secondsElapsed = (int) ((currentTime - startTime) / 1000);
	 * 
	 * if (secondsElapsed > timeOutInSeconds) throw new Exception("Object Not Disappeared");
	 * 
	 * if (Keywords.ObjectExists(by, driver) == false) return;
	 * 
	 * }
	 * 
	 * }
	 */
	private void logActivity(String Method, String arg) {
		String paddedReportName = String.format("%1$-" + 25 + "s", report.Header);
		Method = String.format("%1$-" + 25 + "s", Method);
		arg = String.format("%1$-" + 25 + "s", arg);

		System.out.println(paddedReportName + " | " + Calendar.getInstance().getTime() + " | " + Method + " | " + arg + "|");
	}

	public void initRemoteWebDriver(URL endpoint, DesiredCapabilities capabilities, String url) throws Exception {
		int trialsLeft = 11;
		Exception firstException = null;
		// Thread.sleep(3000);
		while (trialsLeft > 0) {
			trialsLeft--;
			try {
				driver = new RemoteWebDriver(endpoint, capabilities);
				report.addComment("Created the Driver instance");

				driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
				driver.manage().timeouts().pageLoadTimeout(30, TimeUnit.SECONDS);
				driver.manage().timeouts().setScriptTimeout(10, TimeUnit.SECONDS);
				Thread.sleep(1000);
				this.navigateTo(url);

				report.addStep("Open Browser", url, driver.getTitle(), null, ExecutionResult.Pass);

				return;

			} catch (Exception ex) {
				// report.addComment(ex.getMessage());
				Thread.sleep(1000);
				if (firstException == null)
					firstException = ex;

				if (driver != null)
					driver.quit();
			}

		}

		// report.addStep("Open App", endpoint.toString(), firstException.toString(), ExecutionResult.Fail);
		throw firstException;

	}

}
