package com.pCloudy.cucumber.pages;

import org.openqa.selenium.support.FindBy;

import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.pages.PageObject;

public class TodoApp extends PageObject {
	

	
    @FindBy(xpath= "//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept']")
    WebElementFacade acceptButton;
    
    @FindBy(xpath ="//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/flightButton']")
    WebElementFacade flightButton;
    
    @FindBy(xpath = "//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerfrom']")
    WebElementFacade fromLocation;
     @FindBy(xpath = "//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Bangalore, India (BLR)']")
    WebElementFacade fromLocation1;
    
    @FindBy(xpath = "//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerto']")
    WebElementFacade toLocation;
    @FindBy(xpath = "//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Pune, India (PNQ)']")
    WebElementFacade toLocation1;
    
    @FindBy(xpath = "//android.widget.RadioButton[@resource-id='com.pcloudy.appiumdemo:id/singleTrip']")
    WebElementFacade oneWayTrip;
    
    @FindBy(xpath = "//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/txtdepart']")
    WebElementFacade departTime;
    @FindBy(xpath = "//android.widget.Button[@resource-id='android:id/button1' and @text='OK']")
    WebElementFacade departTime1;
    
    @FindBy(xpath ="//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/searchFlights']")
    WebElementFacade searchFlightButton;
   

    public void acceptTermsAndCondition() {
    	acceptButton.click();
    	
    }
    
    public void flightButton() {
    	flightButton.click();
    }
    
    public void fromLocation() {
    	fromLocation.click();
    	fromLocation1.click();
    }
    
    public void toLocation() {
    	toLocation.click();
    	toLocation1.click();
    }
    
    public void oneWayTrip() {
    	oneWayTrip.click();
    }
    
    public void departTime() {
    	departTime.click();
    	departTime1.click();
    }

    public void searchFlight() {
    	searchFlightButton.click();
        
    }

    
}