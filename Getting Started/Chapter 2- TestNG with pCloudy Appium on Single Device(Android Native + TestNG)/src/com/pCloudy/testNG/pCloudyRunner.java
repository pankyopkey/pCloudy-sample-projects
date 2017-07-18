package com.pCloudy.testNG;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import com.ssts.pcloudy.ConnectError;
import com.ssts.pcloudy.Connector;
import com.ssts.pcloudy.MobileDeviceFinder;
import com.ssts.pcloudy.appium.PCloudyAppiumSession;
import com.ssts.pcloudy.dto.appium.booking.BookingDtoDevice;
import com.ssts.pcloudy.dto.device.MobileDevice;
import com.ssts.pcloudy.dto.file.PDriveFileDTO;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;

public class pCloudyRunner {

	PCloudyAppiumSession pCloudySession;
	AppiumDriver<WebElement> driver;

	@BeforeTest
	public void setUpSuite() throws Exception {

		Connector con = new Connector("https://device.pcloudy.com/api/");

		// User Authentication over pCloudy
		String authToken = con.authenticateUser(Your_pCloudy_Username, Your_pCloudy_ApiKey);

		// Select apk in pCloudy Cloud Drive
		File fileToBeUploaded = new File("./com.ba.mobile.apk");
		PDriveFileDTO alreadyUploadedApp = con.getAvailableAppIfUploaded(authToken, fileToBeUploaded.getName());
		if (alreadyUploadedApp == null) {
			System.out.println("Uploading App: " + fileToBeUploaded.getAbsolutePath());
			PDriveFileDTO uploadedApp = con.uploadApp(authToken, fileToBeUploaded, false);
			System.out.println("App uploaded");
			alreadyUploadedApp = new PDriveFileDTO();
			alreadyUploadedApp.file = uploadedApp.file;
		} else {
			System.out.println("App already present. Not uploading... ");
		}

		ArrayList<MobileDevice> selectedDevices = new ArrayList<>();
		selectedDevices.add(con.chooseSingleDevice(authToken,"android"));

		// Book the selected devices in pCloudy
		String sessionName =  "Appium Session " + new Date();
		BookingDtoDevice bookedDevice = con.AppiumApis().bookDevicesForAppium(authToken, selectedDevices, 4, sessionName)[0];
		System.out.println("Devices booked successfully");

		con.AppiumApis().initAppiumHubForApp(authToken, alreadyUploadedApp);

		pCloudySession = new PCloudyAppiumSession(con, authToken, bookedDevice);

	}

	@BeforeMethod
	public void prepareTest() throws IOException, ConnectError, InterruptedException {

		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		capabilities.setCapability("deviceName", pCloudySession.getDto().capabilities.deviceName);
		capabilities.setCapability("browserName", pCloudySession.getDto().capabilities.deviceName);
		capabilities.setCapability("platformName", "Android");
		capabilities.setCapability("appPackage", "com.ba.mobile");
		capabilities.setCapability("appActivity", "com.ba.mobile.LaunchActivity");
		capabilities.setCapability("rotatable", true);

		URL appiumEndpoint = pCloudySession.getConnector().AppiumApis().getAppiumEndpoint(pCloudySession.getAuthToken());
		driver = new AndroidDriver<WebElement>(appiumEndpoint, capabilities);
	}

	@Test
	public void Test1() {

		driver.findElement(By.xpath("//android.widget.Button[@resource-id='android:id/button1' and @text='Accept']")).click();
	}

	@Test
	public void Test2() {

		driver.findElement(By.xpath("//android.widget.Button[@resource-id='android:id/button1' and @text='Accept']")).click();
	}

	@AfterMethod
	public void endTest() throws ConnectError, IOException {

		driver.quit();
	}

	@AfterTest
	public void tearDownSuite() throws Exception {

		pCloudySession.releaseSessionNow();
		pCloudySession.getConnector().revokeTokenPrivileges(pCloudySession.getAuthToken());
	}

}
