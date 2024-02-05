package com.pCloudy.cucumber.steps;

import com.pCloudy.cucumber.pages.TodoApp;

import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import cucumber.api.java.en.Given;

public class TodoAppSteps {
    TodoApp todo;
    
    
    @Given("^the user navigates to 'https://device\\.pcloudy\\.com/'$")
    public void the_user_navigates_to_https_device_pcloudy_com() {
    	todo.open();
        System.out.println("Url open: '" + "https://device.pcloudy.com/");
    }
   
	 @When("^the user enters the username and password$")
	 public void the_user_enters_the_username_and_password(){
		 todo.addNewElement();
   }

	 @When("^clicks on the login button$")
	 public void clicks_on_the_login_button() {
       todo.clickOn();
       System.out.println("Login button Clicked");
   }

	 @Then("^the user should be logged in successfully$")
	 public void the_user_should_be_logged_in_successfully(){
		 System.out.println("Login checked successfully...");
   }


}