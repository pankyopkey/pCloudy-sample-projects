package com.pcloudy.cucumber.steps;


import org.openqa.selenium.WebDriver;
import com.pcloudy.DriverConfiguration;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.When;
import cucumber.api.java.Before;
import cucumber.api.java.After;
import java.util.List;
public class TodoAppSteps {

	  private static List<WebDriver> drivers;
	  private static StepExecutor stepExecutor = new StepExecutor();

	    @Before
	    public void setUpFromJSON() {
	        drivers = DriverConfiguration.initializeDriversFromJSON("src/test/resources/config.json");
	       
	    }
    
	    
//	    Steps definations
	    
	    @Given("^the user navigates to 'https://device\\.pcloudy\\.com/'$")
	    public void the_user_navigates_to_https_device_pcloudy_com() {
	    	stepExecutor.navigate(drivers);
	    }


	    @When("^the user enters the username 'test@testname\\.com'$")
	    public void the_user_enters_the_username_test_testname_com() {
	    	stepExecutor.username(drivers);
	    }

	    @When("^the user enters the password 'testmunk'$")
	    public void the_user_enters_the_password_testmunk() {
	    	stepExecutor.password(drivers);
	    }

	    @When("^clicks on the login button$")
	    public void clicks_on_the_login_button() {
	    	stepExecutor.loginButton(drivers);
	    }
	    
	   

	    

    @After
    public void tearDown() {
         closeDrivers();
    }
    
    private static void closeDrivers() {
        if (drivers != null) {
            for (WebDriver driver : drivers) {
                if (driver != null) {
                    System.out.println("Closing WebDriver..." + driver);
                    driver.quit();
                    System.out.println("WebDriver closed successfully...." + driver);
                }
            }
        }
    }

  
}
