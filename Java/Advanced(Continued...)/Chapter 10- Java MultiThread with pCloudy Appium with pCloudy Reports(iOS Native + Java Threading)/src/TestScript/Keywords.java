package TestScript;

import java.io.File;
import java.io.PrintStream;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.WebElement;

import com.ssts.pcloudy.appium.PCloudyAppiumSession;
import com.ssts.util.reporting.ExecutionResult;
import com.ssts.util.reporting.SingleRunReport;

import io.appium.java_client.ios.IOSDriver;

public class Keywords {

	private SingleRunReport s;
	private IOSDriver driver;
	PCloudyAppiumSession pCloudySession = null;

	public Keywords(SingleRunReport s, IOSDriver driver, PCloudyAppiumSession session) {
		this.s = s;
		this.driver = driver;
		this.pCloudySession = session;
	}

	private void logActivity(String Method, String arg, Boolean isError) {
		String paddedReportName = String.format("%1$-" + 30 + "s", s.Header);

		Method = String.format("%1$-" + 25 + "s", Method);
		arg = String.format("%1$-" + 25 + "s", arg);

		PrintStream strm = System.out;
		if (isError)
			strm = System.err;

		strm.println(paddedReportName + " | " + Calendar.getInstance().getTime() + " | " + Method + " | " + arg + "|");
	}

	public void click(By by, String buttonName) throws InterruptedException {
		waitForObjectLoading(by, 10);
		try {
			WebElement e = driver.findElement(by);
			driver.tap(1, e, 1);
			String snap = getScreenshot();
			s.addStep("Click", buttonName, null, snap, ExecutionResult.Pass);
			logActivity("Click an element", buttonName, false);
		} catch (Exception ex) {
			logActivity("Click an element", ex.getMessage(), true);
			String snap = getScreenshot();
			s.addStep("Click", buttonName, ex.toString(), snap, ExecutionResult.Fail);
		}
	}

	public void waitForObjectLoading(By by, int waitTimeInSeconds) throws InterruptedException {

		Date startTime = Calendar.getInstance().getTime();
		while (true) {

			try {
				WebElement we = driver.findElement(by);
				if (we.isDisplayed()) {
					logActivity("Wait for Object", by.toString(), false);
					String snap = getScreenshot();
					s.addStep("Wait for Object", waitTimeInSeconds + "", null, snap, ExecutionResult.Pass);
					return;
				}
			} catch (org.openqa.selenium.NoSuchElementException e) {
			} catch (Exception ex) {
				logActivity("WaitForObject", ex.getMessage(), true);
			}

			long diffInSeconds = (Calendar.getInstance().getTime().getTime() - startTime.getTime()) / 1000;

			if (diffInSeconds > waitTimeInSeconds) {
				System.err.println("Object not found in the defined time");
				String snap = getScreenshot();
				s.addStep("Wait for Object", waitTimeInSeconds + "secs. Object not found in the defined time", null, snap, ExecutionResult.Fail);
				break;
			}

			Thread.sleep(100);
		}
	}

	public String getScreenshot() {
		try {

			File folder = new File("Reports/" + s.Header, "Snapshots");
			folder.mkdirs();

			File destScreenshot = new File(folder, "Snap_" + Calendar.getInstance().getTimeInMillis() + ".png");

			logActivity("Taking Screenshot", "", false);

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

	public void typeText(By by, String text, String textName) {
		try {

			WebElement e = driver.findElement(by);
			e.sendKeys(text);

			// driver.tap(1, e, 1);
			// driver.executeAsyncScript("target.frontMostApp().keyboard().typeString('" + text + "');", "args[]");
			// driver.executeAsyncScript("var onePixelAboveKeyboard = au.mainApp().keyboard().rect().origin.y - 1; UIATarget.localTarget().tap({x:0, y:onePixelAboveKeyboard});", "args[]");

			// ((IOSDriver) driver).hideKeyboard("return");

			String snap = getScreenshot();
			s.addStep("TypeText", textName, null, snap, ExecutionResult.Pass);
			logActivity("TypeText", textName, false);

		} catch (Exception ex) {

			String snap = getScreenshot();
			if (ex.getMessage().contains("NSInvocation setArgument:atIndex")
					|| ex.getMessage().contains("An error occurred while executing user supplied JavaScript. (WARNING: The server did not provide any stacktrace information)")) {
				s.addStep("TypeText", textName, null, snap, ExecutionResult.Pass);
				logActivity("TypeText", textName, false);
			} else {
				logActivity("TypeText", ex.getMessage(), true);
				s.addStep("TypeText", textName, ex.toString(), snap, ExecutionResult.Fail);
			}
		}

	}

	public void swipeRight(String name) {
		try {
			driver.context("NATIVE_APP");
			Dimension size = driver.manage().window().getSize();
			/*
			 * int startx = (int) (size.width * 0.8); int endx = (int) (size.width * 0.10); int starty = size.height / 2;
			 */

			int endx = (int) (size.width * 0.8);
			int startx = (int) (size.width * 0.10);
			int starty = size.height / 2;

			driver.swipe(startx, starty, endx, starty, 1000);
			String snap = getScreenshot();
			s.addStep("Swipe the page", name, null, snap, ExecutionResult.Pass);
			logActivity("Swipe the screen", name, false);
		} catch (Exception e) {
			logActivity("Swipe the screen", e.getMessage(), false);
			String snap = getScreenshot();
			s.addStep("TypeText", name, e.toString(), snap, ExecutionResult.Fail);
		}

	}

}