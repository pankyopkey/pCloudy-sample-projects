package com.pCloudy.cucumber.steps;

import com.pCloudy.cucumber.pages.TodoApp;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class TodoAppSteps {
    TodoApp todo;
    
    
    @Given("^the user has accepted the terms and conditions$")
    public void the_user_has_accepted_the_terms_and_conditions() throws InterruptedException {
      todo.acceptTermsAndCondition();
      System.out.println("Accept Button clicked");
    }


    @When("^the user clicks on the Flight button$")
    public void the_user_clicks_on_the_Flight_button() throws InterruptedException {
       todo.flightButton();
       System.out.println("Flight Button");
    }

    @When("^the user selects 'Bangalore, India \\(BLR\\)' from the departure location$")
    public void the_user_selects_Bangalore_India_BLR_from_the_departure_location() throws InterruptedException{
       todo.fromLocation();
       System.out.println("From Location Selected");
    }

    @When("^the user selects 'Pune, India \\(PNQ\\)' as the destination$")
    public void the_user_selects_Pune_India_PNQ_as_the_destination() throws InterruptedException{
        todo.toLocation();
        System.out.println("To Location Selected");
    }

    @When("^the user chooses a one-way trip$")
    public void the_user_chooses_a_one_way_trip() throws InterruptedException{
       todo.oneWayTrip();
       System.out.println("One Way Trip");
    }

    @When("^the user selects the departure time$")
    public void the_user_selects_the_departure_time() throws InterruptedException{
       todo.departTime();
       System.out.println("Departure Time");
    }

    @Then("^clicks on the search flights button$")
    public void clicks_on_the_search_flights_button() throws InterruptedException{
       todo.searchFlight();
       System.out.println("Flight Search");
    }
    

    
}