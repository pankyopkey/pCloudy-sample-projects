package com.testng.pCloudy;

import java.net.URL;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;

import com.ssts.pcloudy.appium.PCloudyAppiumSession;
import com.ssts.pcloudy.dto.appium.booking.BookingDtoDevice;

import io.appium.java_client.android.AndroidDriver;

public class DeviceContext {

	private String uniqueName;

	public DeviceContext(String uniqueName) {
		this.uniqueName = uniqueName;
	}

	public String getUniqueName() {
		return this.uniqueName;
	}

	public URL endpoint;
	public BookingDtoDevice device;
	public PCloudyAppiumSession pCloudySession;
	public DesiredCapabilities capabilities;
	public AndroidDriver<WebElement> driver;

}
