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

	  @Given("the user has accepted the terms and conditions")
	  public void the_user_has_accepted_the_terms_and_conditions() {
		  driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept']")).click();
		  System.out.println("Accept button clicked");
		
	  }

	  @When("the user clicks on the Flight button")
	  public void the_user_clicks_on_the_flight_button() {
		  driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/flightButton']")).click();
		  System.out.println("Flight button clicked");
	  }

	@When("^the user selects 'Bangalore, India \\(BLR\\)' from the departure location$")
	  public void the_user_selects_from_the_departure_location() {
		  driver.findElement(By.xpath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerfrom']")).click();
		  driver.findElement(By.xpath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Bangalore, India (BLR)']")).click();
		  System.out.println("Depart from : Banglore");
	  }

	@When("^the user selects 'Pune, India \\(PNQ\\)' as the destination$")
	  public void the_user_selects_as_the_destination() {
		  driver.findElement(By.xpath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerto']")).click();
	      driver.findElement(By.xpath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Pune, India (PNQ)']")).click();
	      System.out.println("Arrival at : Pune");

		  
	  }

	@When("^the user chooses a one-way trip$")
	  public void the_user_chooses_a_one_way_trip() {
		  driver.findElement(By.xpath("//android.widget.RadioButton[@resource-id='com.pcloudy.appiumdemo:id/singleTrip']")).click();
		  System.out.println("Selected one-way Trip");
	  }

	@When("^the user selects the departure time$")
	  public void the_user_selects_the_departure_time() {
		  driver.findElement(By.xpath("//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/txtdepart']")).click();
          driver.findElement(By.xpath("//android.widget.Button[@resource-id='android:id/button1' and @text='OK']")).click();
          System.out.println("Depart time");
	  }
	@Then("^clicks on the search flights button$")
	  public void clicks_on_the_search_flights_button() {
		  driver.findElement(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/searchFlights']")).click();
		  System.out.println("Search flight");
		  
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