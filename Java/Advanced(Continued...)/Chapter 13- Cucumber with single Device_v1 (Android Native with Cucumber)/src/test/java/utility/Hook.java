package utility;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;

import com.ssts.pcloudy.Connector;
import com.ssts.pcloudy.Version;
import com.ssts.pcloudy.appium.PCloudyAppiumSession;
import com.ssts.pcloudy.dto.appium.booking.BookingDtoDevice;
import com.ssts.pcloudy.dto.device.MobileDevice;
import com.ssts.pcloudy.dto.file.PDriveFileDTO;

import cucumber.api.java.After;
import cucumber.api.java.Before;
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;

public class Hook {

	static PCloudyAppiumSession pCloudySession;
	static AppiumDriver<WebElement> driver;
	int deviceBookDuration = 8;

	Boolean autoSelectDevices = true;

	@Before("@appium")
	public void setUpAppium() throws Exception {

		Connector con = new Connector("https://device.pcloudy.com/api/");

		// User Authentication over pCloudy
		String authToken = con.authenticateUser(YOUR_pCLOUDY_USERNAME, YOUR_PCLOUDY_API_KEY_HERE);

		// Select apk in pCloudy Cloud Drive
		File fileToBeUploaded = new File("./App/ApiDemos.apk");
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
		if (autoSelectDevices)
			selectedDevices.addAll(con.chooseDevices(authToken, "android", new Version("5.*.*"), new Version("7.*.*"), 1));
		else
			selectedDevices.add(con.chooseSingleDevice(authToken, "android"));

		// Book the selected devices in pCloudy
		String sessionName = "Appium Session " + new Date();
		BookingDtoDevice bookedDevice = con.AppiumApis().bookDevicesForAppium(authToken, selectedDevices, deviceBookDuration, sessionName)[0];
		System.out.println("Devices booked successfully");

		con.AppiumApis().initAppiumHubForApp(authToken, alreadyUploadedApp);

		pCloudySession = new PCloudyAppiumSession(con, authToken, bookedDevice);

		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability("newCommandTimeout", 600);
		capabilities.setCapability("launchTimeout", 90000);
		capabilities.setCapability("deviceName", pCloudySession.getDto().capabilities.deviceName);
		capabilities.setCapability("browserName", pCloudySession.getDto().capabilities.deviceName);
		capabilities.setCapability("platformName", "Android");
		capabilities.setCapability("appPackage", "io.appium.android.apis");
		capabilities.setCapability("appActivity", "io.appium.android.apis.ApiDemos");

		capabilities.setCapability("rotatable", true);

		URL appiumEndpoint = pCloudySession.getConnector().AppiumApis().getAppiumEndpoint(pCloudySession.getAuthToken());
		driver = new AndroidDriver<WebElement>(appiumEndpoint, capabilities);
	}

	@After
	public void tearDown() throws Exception {
		if (driver != null)
			driver.quit();

		if (pCloudySession != null)
			pCloudySession.releaseSessionNow();
	}

	public static AppiumDriver<WebElement> getDriver() {
		return driver;
	}
	
	public static PCloudyAppiumSession getPCloudySession() {
		return pCloudySession;
	}
}
