package com.pcloudy.cucumber.steps;


import java.util.List;
import org.openqa.selenium.WebElement;
import com.pcloudy.DriverConfiguration;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.appium.java_client.AppiumDriver;
import cucumber.api.java.After;
import cucumber.api.java.Before;
;


public class TodoAppSteps {
	
	

	  private static List<AppiumDriver<WebElement>> drivers;
	  private static StepExecutor stepExecutor = new StepExecutor();

	    @Before
	    public void setUpFromJSON() {
	        drivers = DriverConfiguration.initializeDriversFromJSON("src/test/resources/config.json");
	       
	    }
    

	  
   
    
    @Given("the user has accepted the terms and conditions")
	  public void the_user_has_accepted_the_terms_and_conditions() {
    	stepExecutor.acceptButton(drivers);
    }
    
    
    

	  @When("the user clicks on the Flight button")
	  public void the_user_clicks_on_the_flight_button() {
		  stepExecutor.flightButton(drivers);
	  }
    
	  

	 @After
	    public void tearDown() {
	         closeDrivers();
	    }
	    
	    private static void closeDrivers() {
	        if (drivers != null) {
	            for (AppiumDriver<WebElement>  driver : drivers) {
	                if (driver != null) {
	                	 String deviceFullName = driver.getCapabilities().getCapability("pCloudy_DeviceFullName").toString();
	                    System.out.println("Closing WebDriver..." + deviceFullName);
	                    driver.quit();
	                    System.out.println("WebDriver closed successfully...." + deviceFullName);
	                }
	            }
	        }
	    }
	    
	    
	    
	    
}




























