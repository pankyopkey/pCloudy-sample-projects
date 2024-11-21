package com.pCloudy;

import java.net.URL;
import java.util.HashMap;
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
        
        HashMap<String, Object> pcloudyOptions = new HashMap<String, Object>();
        Iterator it = environmentVariables.getKeys().iterator();
        String browserName = null;
        
        while (it.hasNext()) {
            String key = (String) it.next();
        
            if (environment != null && key.startsWith("environment." + environment)) {
              
                if (key.equals("environment." + environment + ".browserName")) {
                    browserName = environmentVariables.getProperty(key);  
                } else {
                    pcloudyOptions.put(key.replace("environment." + environment + ".", ""),
                            environmentVariables.getProperty(key));
                }
            }
        }

        pcloudyOptions.put("userName", "Enter-userName");
        pcloudyOptions.put("accessKey", "Enter-Access-Key");
        pcloudyOptions.put("clientName", "Enter-client-name");
        pcloudyOptions.put("local", false);
        pcloudyOptions.put("seleniumVersion", "3.141.59"); 
        
        capabilities.setCapability("pcloudy:options", pcloudyOptions);

        if (browserName != null) {
            capabilities.setCapability("browserName", browserName);
        }
        
        try {
            String url = "https://browser.device.pcloudy.com/seleniumcloud/wd/hub";
            System.out.println("\n" + capabilities + "\n");
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




