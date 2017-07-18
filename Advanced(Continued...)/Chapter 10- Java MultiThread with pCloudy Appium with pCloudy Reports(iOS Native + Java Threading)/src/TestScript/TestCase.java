package TestScript;

import java.io.File;
import java.io.IOException;
import java.net.URL;

import org.openqa.selenium.By;
import org.openqa.selenium.remote.DesiredCapabilities;

import com.ssts.pcloudy.Version;
import com.ssts.pcloudy.appium.PCloudyAppiumSession;
import com.ssts.util.reporting.ExecutionResult;
import com.ssts.util.reporting.SingleRunReport;
import com.ssts.util.reporting.printers.HtmlFilePrinter;

import io.appium.java_client.ios.IOSDriver;

public class TestCase implements Runnable {

	SingleRunReport s;
	IOSDriver driver;
	DesiredCapabilities capabilities;
	URL endpoint;
	Keywords keywords;
	PCloudyAppiumSession pCloudySession = null;

	public TestCase(SingleRunReport s, DesiredCapabilities capabilities, URL endpoint, PCloudyAppiumSession pCloudySession) {
		this.s = s;
		this.capabilities = capabilities;
		this.endpoint = endpoint;
		this.pCloudySession = pCloudySession;
	}

	public void initRemoteWebDriver(URL endpoint, DesiredCapabilities capabilities) {
		driver = new IOSDriver(endpoint, capabilities);
	}

	public void runTestCase() throws IOException, InterruptedException {

		keywords = new Keywords(s, driver, pCloudySession);

		// ObjectRepository object_pom = PageFactory.initElements(driver, ObjectRepository.class);
		String snap = keywords.getScreenshot();
		s.addStep("Application Opened", null, null, snap, ExecutionResult.Pass);

		if (this.pCloudySession.getDto().getVersion().compareTo(new Version("9.3")) >= 0) {
			keywords.typeText(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]"), "test@testname.com", "Email");
			keywords.typeText(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]"), "testmunk", "Password");
			keywords.click(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]"), "SIGN IN");
		} else {
			keywords.typeText(By.xpath("//UIAApplication[1]/UIAWindow[1]/UIATextField[1]"), "test@testname.com", "Email");
			keywords.typeText(By.xpath("//UIAApplication[1]/UIAWindow[1]/UIASecureTextField[1]"), "testmunk", "Password");
			keywords.click(By.xpath("   //UIAApplication[1]/UIAWindow[1]/UIAButton[1]"), "SIGN IN");
			keywords.swipeRight("Swipe to page 2");
			// keywords.swipeRight("Swipe to page 3");
			keywords.click(By.xpath("//UIAApplication[1]/UIAWindow[1]/UIAButton[1]"), "Skip");

		}

	}

	public void run() {
		for (int i = 1; i <= MainClass.REPEATITION; i++) {
			try {
				s.beginTestcase("TestCase # " + i);
				if (pCloudySession != null) {
					pCloudySession.extendSession(4);
					s.addComment("Extended Session by four mins");
				}

				initRemoteWebDriver(endpoint, capabilities);
				s.addStep("Open the application", endpoint.toString(), null, null, ExecutionResult.Pass);
				Thread.sleep(6000);
				this.runTestCase();
				// Thread.sleep(6000);
			} catch (Exception e) {
				s.addStep("Error executing TestCase #" + i, null, e.toString(), null, ExecutionResult.Fail);
				// e.printStackTrace();
			} finally {
				if (driver != null) {
					try {
						driver.quit();
						s.addStep("Application Closed", null, null, null, ExecutionResult.Pass);
						driver = null;
					} catch (Exception e) {
					}
				}

				s.addComment("End of TestCase # " + i);
			}
		}

		try {
			if (pCloudySession != null) {
				pCloudySession.releaseSessionNow();
				s.addComment("Released Appium Booking with RID:" + pCloudySession.getDto().rid);
			}
		} catch (Exception e) {
			s.addComment(e.getMessage());
		}

		File parentFolder = new File(MainClass.WORKING_DIRECTORY, s.Header);

		parentFolder.mkdirs();
		HtmlFilePrinter h = new HtmlFilePrinter(new File(parentFolder, s.Header + ".html"));
		h.printSingleRunReport(s);

	}
}