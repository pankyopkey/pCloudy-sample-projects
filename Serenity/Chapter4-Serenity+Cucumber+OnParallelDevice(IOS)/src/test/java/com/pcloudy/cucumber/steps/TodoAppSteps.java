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
    

	  
	    @Given("^the user is on the login screen$")
	    public void the_user_is_on_the_login_screen() {
	    	System.out.println("Useer In login page");
	    }


	    @When("^the user enters the email-id \"([^\"]*)\"$")
	    public void the_user_enters_the_email_id(String arg1) {
	    	System.out.println("Email : "+arg1);
	    	stepExecutor.email(drivers);
	    }

	    @When("^the user enters the password \"([^\"]*)\"$")
	    public void the_user_enters_the_password(String arg1) {
	    	System.out.println("Password : "+arg1);
	    	stepExecutor.password(drivers);
	    }

	    @When("^clicks on the login button$")
	    public void clicks_on_the_login_button() {
	    	stepExecutor.loginClick(drivers);
	    }

	    @Then("^the user should be logged in successfully$")
	    public void the_user_should_be_logged_in_successfully() {
	    	System.out.println("Sucessfully login Done");
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




























