package pcloudy.testng;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.ssts.pcloudy.exception.ConnectError;
import com.ssts.util.reporting.ExecutionResult;
import com.ssts.util.reporting.SingleRunReport;

import io.appium.java_client.ios.IOSDriver;

public class TestClass1 extends TestSetUp {

	@Parameters({ "myDeviceContext" })
	@Test
	public void test1(String myDeviceContext) throws IOException, ConnectError, InterruptedException {
		DeviceContext myContext = Controller.allDeviceContexts.get(myDeviceContext);
		SingleRunReport report = myContext.report;
		IOSDriver<WebElement> driver = myContext.driver;

		try {

			report.beginTestcase("TestCase test1 :" + getClass().getName());
			report.addComment("--- Add your Test Scripts over here ---");

			driver.findElement(By.name("q")).click();
			report.addStep("Clicked google search textBox", null, null, takeScreenShot(myContext), ExecutionResult.Pass);

			driver.findElement(By.name("q")).sendKeys("pCloudy");
			report.addStep("Type text 'pCloudy'", null, null, takeScreenShot(myContext), ExecutionResult.Pass);

			driver.findElement(By.name("btnG")).click();
			report.addStep("Clicked search button", null, null, takeScreenShot(myContext), ExecutionResult.Pass);

			report.addStep("Take Screenshot", null, null, takeScreenShot(myContext), ExecutionResult.Pass);
			report.addComment("End of TestCase1 # ");
		} catch (Exception e) {
			report.addStep("Exception Occured", null, e.getMessage(), takeScreenShot(myContext), ExecutionResult.Fail);
			throw e;
		}
	}
}