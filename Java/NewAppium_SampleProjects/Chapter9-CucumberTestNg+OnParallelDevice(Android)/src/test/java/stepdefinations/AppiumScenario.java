package stepdefinations;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.appium.java_client.AppiumDriver;
import utility.Hook;

public class AppiumScenario {

	AppiumDriver<WebElement> driver;
	String folder_name;
	DateFormat df;
	public AppiumScenario() {

		driver = Hook.getDriver();
	}


	@Given("^I open the application$")
	public void i_open_the_application() throws Throwable {
		Assert.assertTrue(driver.findElement(By.xpath("//*[@text='Accessibility']")).isDisplayed());
		staticSleepAndSnapshot();
	}


	@When("^I tap on Accessibility$")
	public void i_tap_on_Accessibility() throws Throwable {
		driver.findElement(By.xpath("//*[@text='Accessibility']")).click();
		staticSleepAndSnapshot();
	}


	@Then("^I validate Custom View$")
	public void i_validate_Custom_View() throws Throwable {
		Assert.assertTrue(driver.findElement(By.xpath("//*[@text='Custom View']")).isDisplayed(), "Custom View is not displayed");
		staticSleepAndSnapshot();
	}


	@Then("^I open the Custom View$")
	public void i_open_the_Custom_View() throws Throwable {
		driver.findElement(By.xpath("//*[@text='Custom View']")).click();
		staticSleepAndSnapshot();
	}

	private void staticSleepAndSnapshot() throws IOException {
		String folder_name="screenshot";
		File f=((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
		//Date format for screenshot file name
		df=new  SimpleDateFormat("dd-MMM-yyyy__hh_mm_ssaa");
		//create dir with given folder name
		new File(folder_name).mkdir();
		//Setting file name
		String file_name=df.format(new Date())+".png";
		//copy screenshot file into screenshot folder.
		FileUtils.copyFile(f, new File(folder_name + "/" + file_name));
	}
}
