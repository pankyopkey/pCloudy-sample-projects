package stepdefinations;

import java.io.File;
import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;

import com.google.common.io.Files;
import com.ssts.pcloudy.exception.ConnectError;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.appium.java_client.AppiumDriver;
import utility.Hook;

public class AppiumScenario {

	private AppiumDriver<WebElement> driver;

	public AppiumScenario() {
		this.driver = Hook.getDriver();
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
	
	private void staticSleepAndSnapshot() {
		try {
			Thread.sleep(5000);
			File snapshot = Hook.getPCloudySession().takeScreenshot();

			File moveTo = new File(".", snapshot.getName());
			Files.move(snapshot, moveTo);
			System.out.println("Snapshot Taken at: " + moveTo.getAbsolutePath());
			
		} catch (InterruptedException | IOException | ConnectError e) {

		}
	}
}
