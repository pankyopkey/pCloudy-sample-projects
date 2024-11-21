package com.pCloudy.cucumber.steps;

import com.pCloudy.cucumber.pages.TodoApp;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class TodoAppSteps {
    TodoApp todo;
    
    @Given("^the user is on the login screen$")
    public void the_user_is_on_the_login_screen() {
    	System.out.println("App launched");
    }
    
    @When("^the user enters the email-id \"([^\"]*)\"$")
    public void the_user_enters_the_email_id(String username) {
    	todo.enterUsername(username);
    	System.out.println("User Name Entered");
    }

    @When("^the user enters the password \"([^\"]*)\"$")
    public void the_user_enters_the_password(String password) {
    	todo.enterPassword(password);
    	System.out.println("Password Entered");
    }

    @When("^clicks on the login button$")
    public void clicks_on_the_login_button() {
    	todo.clickLogin();
    	System.out.println("Login CLicked");
    }

    @Then("^the user should be logged in successfully$")
    public void the_user_should_be_logged_in_successfully() {
    	System.out.println("App Login Checked");
    }   
}