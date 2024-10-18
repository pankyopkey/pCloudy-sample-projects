package com.pCloudy.testNg;


import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;


public class Driver {

    RemoteWebDriver driver;
   
    
    public RemoteWebDriver createDriver() throws IOException{
    	
    	String cloudtHostname= "https://browser.device.pcloudy.com";
    	String seleniumCloud = "/seleniumcloud/wd/hub";
    	
    	DesiredCapabilities capabilities = new DesiredCapabilities();
    	
    	capabilities.setCapability("browserName", "chrome");
    	
    	HashMap<String, Object> pcloudyOptions = new HashMap<String, Object>();
    	pcloudyOptions.put("userName", "Enter-Email");
		pcloudyOptions.put("accessKey", "Enter-ApiKey");
		pcloudyOptions.put("clientName", "Enter-Client-name");
		pcloudyOptions.put("os", "Mac");
		pcloudyOptions.put("osVersion", "Ventura");
		pcloudyOptions.put("browserVersion", "120");  
        pcloudyOptions.put("local", false);
		pcloudyOptions.put("seleniumVersion", "3.141.59"); 
		capabilities.setCapability("pcloudy:options", pcloudyOptions);
		driver= new RemoteWebDriver(new URL(cloudtHostname+seleniumCloud), capabilities);
		
		return driver;
    }


	
}