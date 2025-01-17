package com.pCloudy;

import java.net.URL;
import java.util.Iterator;

import net.thucydides.core.environment.SystemEnvironmentVariables;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import net.thucydides.core.util.EnvironmentVariables;
import net.thucydides.core.webdriver.DriverSource;
import io.appium.java_client.android.AndroidDriver;

public class PcloudyTestSerenityDriver implements DriverSource {

	public WebDriver newDriver()  {
		
EnvironmentVariables environmentVariables = SystemEnvironmentVariables.createEnvironmentVariables();
		
		String environment ="single";
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
		capabilities.setCapability("pCloudy_ApplicationName", "pCloudyAppiumDemo.apk");
		capabilities.setCapability("pCloudy_DurationInMinutes", 10);
		capabilities.setCapability("automationName", "uiautomator2");
		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		capabilities.setCapability("appiumVersion", "1.22.0");
		capabilities.setCapability("appPackage", "com.pcloudy.appiumdemo");
		capabilities.setCapability("appActivity", "com.ba.mobile.LaunchActivity");
	
		try {
			String url = "https://device.pcloudy.com/appiumcloud/wd/hub";
			System.out.println(capabilities);
			return new AndroidDriver(new URL(url), capabilities);
			
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}

	public boolean takesScreenshots() {
		return false;
	}
}
