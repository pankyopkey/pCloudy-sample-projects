package utility;
import java.net.URL;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import cucumber.api.Scenario;
import cucumber.api.java.After;
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;

public class Hook {

	static AppiumDriver<WebElement> driver;
	Scenario ob;

	@Parameters({"deviceName"})
	@BeforeMethod()
	public void setUpAppium(String deviceName) throws Exception {

		DesiredCapabilities capabilities = new DesiredCapabilities();
		
		capabilities.setCapability("pCloudy_Username", "Your Email id");
		capabilities.setCapability("pCloudy_ApiKey", "Your Api key");
		capabilities.setCapability("pCloudy_DurationInMinutes", 10);
		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		//capabilities.setCapability("pCloudy_DeviceManafacturer", deviceName);
		//capabilities.setCapability("pCloudy_DeviceVersion", deviceName);
		capabilities.setCapability("pCloudy_DeviceFullName", deviceName);
		capabilities.setCapability("platformName", "Android");
		capabilities.setCapability("automationName", "uiautomator2");
		capabilities.setCapability("pCloudy_ApplicationName", "ApiDemos.apk");
		capabilities.setCapability("appPackage", "io.appium.android.apis");
		capabilities.setCapability("appActivity", "io.appium.android.apis.ApiDemos");
		driver = new AndroidDriver<WebElement>(new URL("https://device.pcloudy.com/appiumcloud/wd/hub"), capabilities);


		System.out.println("hlllllllllllppppppppppppppp");
	}

	@After
	public void tearDown() throws Exception {
		if (driver != null)
			driver.quit();

	}

	public static AppiumDriver<WebElement> getDriver() {
		return driver;
	}

}
