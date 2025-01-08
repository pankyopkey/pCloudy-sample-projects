package com.pCloudy.TestCase;

import java.io.IOException;
import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.pCloudy.Utils.ScreenShot;

import io.appium.java_client.AppiumDriver;

public class Ios {

	public static void loginPage(AppiumDriver driver) throws IOException, InterruptedException {

		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

		WebElement email,
		password,
		login;

		//Enter email-id
		email= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]")));
		email.sendKeys("test@testname.com");


		//Enter Password	
		password= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]")));
		password.sendKeys("testmunk");
		ScreenShot.captureScreenShots(driver);
		
		//Click on login button	
		login= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]")));
		login.click();
	}

}
