package com.SeleniumDriver;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.io.FileHandler;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class SeleniumRunner {
	

	WebDriver driver;
	DesiredCapabilities caps ;
	String folder_name;
	DateFormat df;

	@BeforeTest
	public void setUpSuite() throws Exception {

	}

	@Parameters({"os","osVersion","browserName","browserVersions"})
	@BeforeMethod
	public void prepareTest(String os,String osVersion,String browserName,String browserVersions) throws IOException, InterruptedException {

		if(browserName.contains("chrome")) {
			caps =  DesiredCapabilities.chrome();
		}
		else if (browserName.contains("ie")) {
			caps =  DesiredCapabilities.internetExplorer();
		}
		else if (browserName.contains("firefox")) {
			caps =  DesiredCapabilities.firefox();
		}
		else if (browserName.contains("edge")) {
			caps =  DesiredCapabilities.edge();
		}
		caps.setCapability("os", os);
		caps.setCapability("osVersion", osVersion);
		caps.setCapability("browserVersion",browserVersions);
		caps.setCapability("clientName", "Your Email adress");
		caps.setCapability("apiKey", "Your api key");
		caps.setCapability("email", "Your Email adress");
		driver = new RemoteWebDriver(new URL("https://prod-browsercloud-in.pcloudy.com/seleniumcloud/wd/hub"), caps);
	}


	@Test
	public void Test() throws Exception {

		WebDriverWait wait=new WebDriverWait(driver, 20);
		driver.manage().window().maximize();
		driver.get("http://sstsinc.com/");	

		WebElement contacts;
		contacts= wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class='navbar-collapse collapse floated']//a[contains(text(),'Contacts')]")));
		contacts.click();
		takeSnapShot();

		WebElement careers;
		careers=wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[contains(text(),'Careers')]")));
		careers.click();
		takeSnapShot();

		WebElement yourName;
		yourName=wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@id='name2']")));
		yourName.sendKeys("pCloudy");
		takeSnapShot();

		WebElement phone;
		phone=wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@id='Phone']")));
		phone.sendKeys("1234567");
		takeSnapShot();

		WebElement email;
		email=wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@id='email2']")));
		email.sendKeys("pCloudy@sstsinc.com");
		takeSnapShot();

	}


	@AfterMethod
	public void afterMethod() throws InterruptedException{

		driver.quit();

	}

	public void takeSnapShot() throws Exception{

		folder_name="screenshot";
		TakesScreenshot scrShot =((TakesScreenshot)driver);
		File f=scrShot.getScreenshotAs(OutputType.FILE);
		df=new  SimpleDateFormat("dd-MMM-yyyy__hh_mm_ssaa");
		//create dir with given folder name
		new File(folder_name).mkdir();
		//Setting file name
		String file_name=df.format(new Date())+".png";
		//copy screenshot file into screenshot folder.
		FileHandler.copy(f, new File(folder_name + "/" + file_name));

	}

}
