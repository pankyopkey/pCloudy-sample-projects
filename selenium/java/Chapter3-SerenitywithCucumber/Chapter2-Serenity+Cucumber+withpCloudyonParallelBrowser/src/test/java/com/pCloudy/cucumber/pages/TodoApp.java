package com.pCloudy.cucumber.pages;

import org.openqa.selenium.support.FindBy;

import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;
import net.thucydides.core.pages.PageObject;


@DefaultUrl("https://device.pcloudy.com/")
public class TodoApp extends PageObject {
    @FindBy(id = "userId")
    WebElementFacade username;
    @FindBy(id = "password")
    WebElementFacade password;
    @FindBy(id = "loginSubmitBtn")
    WebElementFacade loginButton;
   

    public void clickOn() {
    	loginButton.click();
    }

    public void addNewElement() {
    	username.sendKeys("test@pcloudy.com");
    	password.sendKeys("test1234");
        
    }

    
}