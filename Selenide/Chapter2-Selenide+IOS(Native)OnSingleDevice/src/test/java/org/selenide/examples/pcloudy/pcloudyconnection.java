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

        cap.setCapability("pCloudy_Username", "Enter-Email");
		cap.setCapability("pCloudy_ApiKey", "Enter-API-Key");
		cap.setCapability("pCloudy_ApplicationName", "TestmunkDemo_Resigned1675153426.ipa");
		cap.setCapability("pCloudy_DurationInMinutes", 10);
		cap.setCapability("pCloudy_DeviceFullName", "APPLE_iPhone14Plus_iOS_16.0.3_1bff0");
		cap.setCapability("pCloudy_DeviceManafacturer", "Apple");
		cap.setCapability("platformVersion", "16.0.3");
		cap.setCapability("platformName", "ios");
		cap.setCapability("newCommandTimeout", 600);
		cap.setCapability("launchTimeout", 90000);
		cap.setCapability("automationName", "XCUITest");
		cap.setCapability("bundleId", "com.pcloudy.TestmunkDemo");
        cap.setCapability("acceptAlerts", true);
        cap.setCapability("pCloudy_EnableVideo" , "true");

        try {
            return new AndroidDriver(new URL("https://device.pcloudy.com/appiumcloud/wd/hub"), cap);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }

    
}
