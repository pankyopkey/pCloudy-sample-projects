package com.pcloudy.cucumber.steps;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.pcloudy.pcloudySerenityDriver;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.appium.java_client.AppiumDriver;
import cucumber.api.java.After;
import cucumber.api.java.Before;

public class TodoAppSteps {
	
	
	AppiumDriver<WebElement> driver;

	  @Before
	  public void setUp() {
	      pcloudySerenityDriver driverProvider = new pcloudySerenityDriver();
	      try {
	          this.driver = driverProvider.prepareTest();
	          if (this.driver == null) {
	              throw new IllegalStateException("WebDriver initialization failed");
	          }
	      } catch (Exception e) {
	          e.printStackTrace();
	      }
	  }

	  @Given("^the user is on the login screen$")
	    public void the_user_is_on_the_login_screen() {
	    	System.out.println("User In login page");
	    }


	    @When("^the user enters the email-id \"([^\"]*)\"$")
	    public void the_user_enters_the_email_id(String arg1) {
	    	driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]")).sendKeys("test@testname.com");
	    	System.out.println("Email : "+arg1);
	    	
	    }

	    @When("^the user enters the password \"([^\"]*)\"$")
	    public void the_user_enters_the_password(String arg1) {
	    	driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]")).sendKeys("testmunk");
	    	System.out.println("Password : "+arg1);
	    	
	    }

	    @When("^clicks on the login button$")
	    public void clicks_on_the_login_button() {
	    	driver.findElement(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]")).click();
	    	System.out.println("Login Clicked");
	    	
	    }

	    @Then("^the user should be logged in successfully$")
	    public void the_user_should_be_logged_in_successfully() {
	    	System.out.println("Sucessfully login Done");
	    }
	  

	 @After
	    public void tearDown() {
	        closeDriver();
	    }

	    private void closeDriver() {
	        if (driver != null) {
	            System.out.println("Closing WebDriver..." + driver.getCapabilities().getCapability("pCloudy_DeviceFullName").toString());
	            driver.quit();
	            System.out.println("WebDriver closed successfully...." + driver.getCapabilities().getCapability("pCloudy_DeviceFullName").toString());
	        }
	    }
}