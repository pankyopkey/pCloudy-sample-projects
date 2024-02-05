package com.pCloudy.cucumber.pages;

import org.openqa.selenium.support.FindBy;

import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.pages.PageObject;

public class TodoApp extends PageObject {
	
	  @FindBy(xpath="//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]")
	  WebElementFacade username;
	  
	  @FindBy(xpath="//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]")
	  WebElementFacade password;
	  
	  @FindBy(xpath="//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]")
	  WebElementFacade loginButton;
	  

    public void enterUsername(String userLogin) {
    	username.sendKeys(userLogin);
    	
    }
    
    public void enterPassword(String userPassword) {
    	username.sendKeys(userPassword);
    }
    
    public void clickLogin() {
    	loginButton.click();
    }  
}