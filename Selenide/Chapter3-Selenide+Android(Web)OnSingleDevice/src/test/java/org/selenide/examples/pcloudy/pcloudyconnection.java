package org.selenide.examples.pcloudy;

import com.codeborne.selenide.WebDriverProvider;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.WebDriver;

import javax.annotation.CheckReturnValue;
import javax.annotation.Nonnull;
import javax.annotation.ParametersAreNonnullByDefault;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import org.openqa.selenium.remote.DesiredCapabilities;

@ParametersAreNonnullByDefault
public class pcloudyconnection implements WebDriverProvider {
    @Override
    @CheckReturnValue
    @Nonnull
    public WebDriver createDriver(Capabilities capabilities) {
        DesiredCapabilities cap = new DesiredCapabilities();

        cap.setBrowserName("chrome");
        cap.setCapability("pCloudy_Username", "Enter-Email");
		cap.setCapability("pCloudy_ApiKey", "Enter-API-Key");
		cap.setCapability("pCloudy_DurationInMinutes", 10);
		cap.setCapability("pCloudy_DeviceFullName", "GOOGLE_Pixel3_Android_12.0.0_a6091");
		cap.setCapability("platformName", "Android");
        cap.setCapability("pCloudy_DeviceManafacturer","Google");
		cap.setCapability("newCommandTimeout", 600);
		cap.setCapability("launchTimeout", 90000);
		cap.setCapability("automationName", "uiautomator2");
        cap.setCapability("pCloudy_EnableVideo" , "true");

        try {
            return new AndroidDriver(new URL("https://device.pcloudy.com/appiumcloud/wd/hub"), cap);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }

    
}
