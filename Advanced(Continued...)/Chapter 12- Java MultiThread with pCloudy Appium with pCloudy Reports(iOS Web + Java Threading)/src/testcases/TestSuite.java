package testcases;

import java.io.File;
import java.net.URL;

import org.openqa.selenium.By;
import org.openqa.selenium.remote.DesiredCapabilities;

import com.ssts.pcloudy.appium.PCloudyAppiumSession;
import com.ssts.util.reporting.ExecutionResult;
import com.ssts.util.reporting.SingleRunReport;
import com.ssts.util.reporting.printers.HtmlFilePrinter;

import keyword.Keywords;
import main.EntryPoint_Web;

public class TestSuite implements Runnable {

	URL endpoint = null;
	DesiredCapabilities capabilities = null;

	SingleRunReport report = null;
	PCloudyAppiumSession sessionCloser = null;

	public TestSuite(URL endpoint, SingleRunReport report, DesiredCapabilities capabilities, PCloudyAppiumSession sessionCloser) {
		this.endpoint = endpoint;
		this.report = report;
		this.capabilities = capabilities;
		this.sessionCloser = sessionCloser;
	}

	public void run() {
		try {
			for (int i = 1; i <= EntryPoint_Web.REPEATITION; i++) {
				try {
					report.beginTestcase("TestCase Google #" + i);
					this.test_Google();
				} catch (Exception e) {
					report.addStep("Iteration Sequence #" + i, endpoint.toString(), e.toString(), ExecutionResult.Fail);
					System.err.println(Thread.currentThread().getName() + " -> " + e.getMessage());
				}


			}
			

		} finally {
			try {
				if (sessionCloser != null)
					sessionCloser.releaseSessionNow();
			} catch (Exception e) {
				report.addComment("Error while closing session: " + e.getMessage());
			}
			printReport();
		}

	}

	private void printReport() {
		try {

			File folder = new File("Reports", report.Header);
			if (folder.exists() == false)
				folder.mkdirs();

			File outReport = new File(folder, report.Header + ".html");
			if (outReport.exists())
				outReport.delete();

			HtmlFilePrinter printer = new HtmlFilePrinter(outReport);
			printer.printSingleRunReport(report);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public void test_Google() throws Exception {
		Keywords keywords = new Keywords(this.report, this.sessionCloser);
		try {

			keywords.initRemoteWebDriver(endpoint, capabilities, "https://www.google.com");
			printReport();

			keywords.WaitForObject(By.name("q"), 10, "Google Search TextBox");

			keywords.ClickObject(By.name("q"), "Google Search TextBox");

			keywords.TypeText(By.name("q"), "pCloudy");

			keywords.ClickObject(By.name("btnG"), "Search Button");

			printReport();
			keywords.navigateTo("https://device.pcloudy.com");

			keywords.TypeText(By.id("userId"), "good.user@domain.com");

			keywords.TypeText(By.id("password"), "pa$$w*rd");

			keywords.ClickObject(By.id("loginSubmitBtn"), "Login Button");

			keywords.WaitForObject(By.id("loginErrMsg"), 15, "Login Error Message");

			printReport();

			keywords.navigateTo("https://www.gmail.com");

			System.out.println("----------");

		} finally {
			if (keywords.getDriver() != null) {
				keywords.getDriver().quit();

				report.addComment("Close Application");
			}
		}
	}
}
