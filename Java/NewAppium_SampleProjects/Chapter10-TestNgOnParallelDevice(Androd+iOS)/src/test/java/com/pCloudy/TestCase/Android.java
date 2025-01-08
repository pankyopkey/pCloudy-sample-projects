package com.pCloudy.TestCase;

import java.io.IOException;
import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.pCloudy.Utils.ScreenShot;

import io.appium.java_client.AppiumDriver;

public class Android {



	public static void flightBooking(AppiumDriver driver) throws IOException, InterruptedException {
		
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

		WebElement acceptButton,
		flightButton,
		fromLocation,
		bangloreCity,
		toLocation,
		puneCity,
		oneWayTrip,
		departureTime,
		okay,
		searchFlight;

		//Click accept Button
		acceptButton= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept']")));
		acceptButton.click();


		//Click on Flight button
		flightButton= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/flightButton']")));
		flightButton.click();


		//Select from location
		fromLocation= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerfrom']")));
		fromLocation.click();
		bangloreCity= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Bangalore, India (BLR)']")));
		bangloreCity.click();
		ScreenShot.captureScreenShots(driver);

		//Select to location
		toLocation= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerto']")));
		toLocation.click();
		puneCity= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Pune, India (PNQ)']")));
		puneCity.click();

		//Select one way trip
		oneWayTrip= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//android.widget.RadioButton[@resource-id='com.pcloudy.appiumdemo:id/singleTrip']")));
		oneWayTrip.click();
		ScreenShot.captureScreenShots(driver);

		//Select departure time
		departureTime= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/txtdepart']")));
		departureTime.click();
		okay= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//android.widget.Button[@resource-id='android:id/button1' and @text='OK']")));
		okay.click();

		//Click on search flights button
		searchFlight= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/searchFlights']")));
		searchFlight.click();

	}

}
