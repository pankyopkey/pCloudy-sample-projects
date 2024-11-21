package com.pCloudy.testCases;

import java.io.IOException;
import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import com.pCloudy.utility.Screenshot;
import com.pCloudy.utility.TouchAndScroll;



public class DemoTest {
	
	Screenshot screenshot = new Screenshot();
	TouchAndScroll scroll = new TouchAndScroll();

	public void Test (RemoteWebDriver driver) throws IOException, InterruptedException{
		
		WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(20));
		
		WebElement searchBar,topicToClick,aboutUs,getAboutUs;
		
		driver.manage().window().maximize();
		
		driver.get("https://www.google.com/");
		Thread.sleep(1500);
		System.out.println("Url Opened");
		
		searchBar = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(("//*[@id=\"APjFqb\"]"))));
		searchBar.sendKeys("pcloudy");
		searchBar.sendKeys(Keys.ENTER);
		Thread.sleep(2000);
		System.out.println("Text Entered For Search");
		
		topicToClick = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(("//span[contains(., \"Web & Mobile App Testing , Codeless Automation, Pcloudy\")]"))));
		topicToClick.click();
		System.out.println("Topic Clicked");
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(("//strong/span[contains(text(), 'Unified App')]"))));

		scroll.verticalScrollForElement(driver);
		Thread.sleep(2000);
		
		aboutUs = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(("//a[contains(text(), 'About Us')]"))));
		screenshot.captureScreenShots(driver);
		aboutUs.click();
		System.out.println("About Us Clicked");
		
		
		getAboutUs = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(("//*[@id=\"page\"]/section[3]/div/div/div[2]"))));
		System.out.println(getAboutUs.getText());
		System.out.println("Got the text !!");
		screenshot.captureScreenShots(driver);
	}
	
}

