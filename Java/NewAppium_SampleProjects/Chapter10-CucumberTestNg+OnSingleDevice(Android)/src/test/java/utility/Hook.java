package utility;
import java.net.URL;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import cucumber.api.java.After;
import cucumber.api.java.Before;
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;

public class Hook {

	static AppiumDriver<WebElement> driver;

	@Before("@appium")
	public void setUpAppium() throws Exception {

		DesiredCapabilities capabilities = new DesiredCapabilities();
		
		capabilities.setCapability("pCloudy_Username", "Your mail");
		capabilities.setCapability("pCloudy_ApiKey", "Your api");
		capabilities.setCapability("pCloudy_DurationInMinutes", 10);
		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		//capabilities.setCapability("pCloudy_DeviceManafacturer", deviceName);
		//capabilities.setCapability("pCloudy_DeviceVersion", deviceName);
		capabilities.setCapability("pCloudy_DeviceFullName", "ASUS_Zenfone3_Android_8.0.0_3406c");
		capabilities.setCapability("platformName", "Android");
		capabilities.setCapability("automationName", "uiautomator2");
		capabilities.setCapability("pCloudy_ApplicationName", "ApiDemos.apk");
		capabilities.setCapability("appPackage", "io.appium.android.apis");
		capabilities.setCapability("appActivity", "io.appium.android.apis.ApiDemos");
		driver = new AndroidDriver<WebElement>(new URL("https://device.pcloudy.com/appiumcloud/wd/hub"), capabilities);


		
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
