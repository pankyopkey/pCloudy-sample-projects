package com.pCloudy;

import java.net.URL;
import java.util.Iterator;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import net.thucydides.core.util.EnvironmentVariables;
import net.thucydides.core.util.SystemEnvironmentVariables;
import net.thucydides.core.webdriver.DriverSource;

public class PcloudyTestSerenityDriver implements DriverSource {

	public WebDriver newDriver() {
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
		
		
		
			
			capabilities.setCapability("clientName", "Enter-clientName");
	        capabilities.setCapability("apiKey", "Enter-apiKey");
	        capabilities.setCapability("email", "Enter-Email");

		try {
			String url = "https://private-live-browsercloud-us.pcloudy.com/seleniumcloud/wd/hub";
			System.out.println(capabilities);
			return new RemoteWebDriver(new URL(url), capabilities);
			
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}

	public boolean takesScreenshots() {
		return false;
	}
}
