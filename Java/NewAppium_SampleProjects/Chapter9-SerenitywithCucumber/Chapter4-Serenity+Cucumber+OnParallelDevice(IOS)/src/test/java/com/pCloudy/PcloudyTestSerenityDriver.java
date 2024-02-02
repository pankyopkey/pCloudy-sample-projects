package com.pCloudy;

import java.net.URL;
import java.util.Iterator;

import org.openqa.selenium.remote.DesiredCapabilities;
import net.thucydides.core.util.EnvironmentVariables;
import net.thucydides.core.util.SystemEnvironmentVariables;
import net.thucydides.core.webdriver.DriverSource;
import io.appium.java_client.AppiumDriver;
import org.openqa.selenium.WebElement;
import io.appium.java_client.ios.IOSDriver;

public class PcloudyTestSerenityDriver implements DriverSource {

	public AppiumDriver<WebElement> newDriver() {
EnvironmentVariables environmentVariables = SystemEnvironmentVariables.createEnvironmentVariables();
		
		String environment = System.getProperty("environment");
		DesiredCapabilities capabilities = new DesiredCapabilities();
		
		Iterator it = environmentVariables.getKeys().iterator();
		while (it.hasNext()) {
			String key = (String) it.next();

			 if (environment != null && key.startsWith("environment." + environment)) {
				
				capabilities.setCapability(key.replace("environment." + environment + ".", ""),
						environmentVariables.getProperty(key));
			}
		}
		
		capabilities.setCapability("pCloudy_Username", "Enter-Email");
		capabilities.setCapability("pCloudy_ApiKey", "Enter-apiKey");
		capabilities.setCapability("pCloudy_ApplicationName", "TestmunkDemo_Resigned1706469571.ipa");
		capabilities.setCapability("pCloudy_DurationInMinutes", 10);
		capabilities.setCapability("automationName", "XCUITest");
		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		capabilities.setCapability("appiumVersion", "1.22.0");
		capabilities.setCapability("bundleId", "com.pcloudy.TestmunkDemo");
		try {
			String url = "https://private-live.pcloudy.com/appiumcloud/wd/hub";
			System.out.println(capabilities);
			return new IOSDriver(new URL(url), capabilities);
			
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}

	public boolean takesScreenshots() {
		return false;
	}
}
