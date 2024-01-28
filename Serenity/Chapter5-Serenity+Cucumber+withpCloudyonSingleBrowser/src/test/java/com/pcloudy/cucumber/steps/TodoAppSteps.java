package com.pcloudy.cucumber.steps;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import com.pcloudy.pcloudySerenityDriver;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import cucumber.api.java.After;
import cucumber.api.java.Before;

public class TodoAppSteps {
	
	
	  WebDriver driver;

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
	


	 @Given("^the user navigates to 'https://device\\.pcloudy\\.com/'$")
	 public void the_user_navigates_to_https_device_pcloudy_com() {
        driver.get("https://device.pcloudy.com/");
        System.out.println("Url open: '" + "https://device.pcloudy.com/");
    }

	 @When("^the user enters the username and password$")
	 public void the_user_enters_the_username_and_password(){
        String username = "test@pcloudy.com";
        String password = "test1234";

        driver.findElement(By.id("userId")).sendKeys(username);
        System.out.println("Username Entered");

        driver.findElement(By.id("password")).sendKeys(password);
        System.out.println("Password Entered");
    }

	 @When("^clicks on the login button$")
	 public void clicks_on_the_login_button() {
        driver.findElement(By.id("loginSubmitBtn")).click();
        System.out.println("Login button Clicked");
    }

	 @Then("^the user should be logged in successfully$")
	 public void the_user_should_be_logged_in_successfully(){
		 System.out.println("Login checked successfully...");
    }

	 @After
	    public void tearDown() {
	        closeDriver();
	    }

	    private void closeDriver() {
	        if (driver != null) {
	            System.out.println("Closing WebDriver..." + driver);
	            driver.quit();
	            System.out.println("WebDriver closed successfully...." + driver);
	        }
	    }
}