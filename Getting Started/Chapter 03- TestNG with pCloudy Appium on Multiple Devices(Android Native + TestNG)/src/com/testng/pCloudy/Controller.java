package com.testng.pCloudy;

import java.io.File;
import java.io.FileWriter;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.TestNG;
import org.testng.xml.XmlClass;
import org.testng.xml.XmlSuite;
import org.testng.xml.XmlTest;

import com.ssts.pcloudy.Connector;
import com.ssts.pcloudy.appium.PCloudyAppiumSession;
import com.ssts.pcloudy.dto.appium.booking.BookingDtoDevice;
import com.ssts.pcloudy.dto.device.MobileDevice;
import com.ssts.pcloudy.dto.file.PDriveFileDTO;

import io.appium.java_client.remote.MobileCapabilityType;

import com.ssts.pcloudy.Version;

public class Controller {

	public static Map<String, DeviceContext> allDeviceContexts = new HashMap<String, DeviceContext>();
	int deviceBookDuration = 10;
	Boolean autoSelectDevices = false;

	public static void main(String args[]) throws Exception {
		Controller runExecutionOnPCloudy = new Controller();
		runExecutionOnPCloudy.runTestNGTest();

		System.exit(0);
	}

	public void runTestNGTest() throws Exception {

		// Create an instance on TestNG
		TestNG myTestNG = new TestNG();

		// Create an instance of XML Suite and assign a name for it.
		XmlSuite mySuite = new XmlSuite();
		mySuite.setName("pCloudy Suite");
		mySuite.setParallel("tests");
		mySuite.setConfigFailurePolicy("continue");

		// Create a list which can contain the classes that you want to run.
		List<XmlClass> myClasses = new ArrayList<XmlClass>();
		myClasses.add(new XmlClass("com.testng.pCloudy.TestClass1"));
		myClasses.add(new XmlClass("com.testng.pCloudy.TestClass2"));

		// Create a list of XmlTests and add the Xmltest you created earlier to it.
		List<XmlTest> allDevicesTests = new ArrayList<XmlTest>();

		Connector con = new Connector("https://device.pcloudy.com/api/");
		// User Authentication over pCloudy
		String authToken = con.authenticateUser(Your_pCloudy_Email, Your_pCloudy_APIKey);
		ArrayList<MobileDevice> selectedDevices = new ArrayList<>();

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

		// Book the selected devices in pCloudy

		if (autoSelectDevices)
			selectedDevices.addAll(con.chooseDevices(authToken, "android", new Version("5.*.*"), new Version("7.*.*"), 3));
		else
			selectedDevices.addAll(con.chooseMultipleDevices(authToken, "android"));

		String sessionName = selectedDevices.get(0).display_name + " Appium Session";

		BookingDtoDevice[] bookedDevices = con.AppiumApis().bookDevicesForAppium(authToken, selectedDevices, deviceBookDuration, sessionName);
		System.out.println("Devices booked successfully");

		con.AppiumApis().initAppiumHubForApp(authToken, alreadyUploadedApp);
		URL endpoint = con.AppiumApis().getAppiumEndpoint(authToken);

		System.out.println("Appium Endpoint: " + endpoint);
		URL reportFolderOnPCloudy = con.AppiumApis().getAppiumReportFolder(authToken);
		System.out.println("Report Folder: " + reportFolderOnPCloudy);

		for (int i = 0; i < bookedDevices.length; i++) {
			BookingDtoDevice aDevice = bookedDevices[i];

			PCloudyAppiumSession pCloudySession = new PCloudyAppiumSession(con, authToken, aDevice);
			String uniqueName = aDevice.manufacturer + " " + aDevice.model + " " + aDevice.version;

			DesiredCapabilities capabilities = new DesiredCapabilities();
			capabilities.setCapability("newCommandTimeout", 600);
			capabilities.setCapability("launchTimeout", 90000);
			capabilities.setCapability("deviceName", aDevice.capabilities.deviceName);
			capabilities.setCapability("browserName", aDevice.capabilities.deviceName);
			capabilities.setCapability("platformName", "Android");
			capabilities.setCapability("appPackage", "com.ba.mobile");
			capabilities.setCapability("appActivity", "com.ba.mobile.LaunchActivity");
			capabilities.setCapability("rotatable", true);
			
			DeviceContext aDeviceContext = new DeviceContext(uniqueName);

			aDeviceContext.endpoint = endpoint;
			aDeviceContext.device = aDevice;
			aDeviceContext.pCloudySession = pCloudySession;
			aDeviceContext.capabilities = capabilities;

			allDeviceContexts.put(uniqueName, aDeviceContext);

			XmlTest aTestNgDeviceTest = new XmlTest(mySuite);
			aTestNgDeviceTest.setName("test_" + uniqueName);
			aTestNgDeviceTest.addParameter("myDeviceContext", uniqueName);

			aTestNgDeviceTest.setXmlClasses(myClasses);
			allDevicesTests.add(aTestNgDeviceTest);
		}
		mySuite.setThreadCount(bookedDevices.length);

		// add the list of tests to your Suite.
		mySuite.setTests(allDevicesTests);

		// Add the suite to the list of suites.
		List<XmlSuite> mySuites = new ArrayList<XmlSuite>();
		mySuites.add(mySuite);

		// Set the list of Suites to the testNG object you created earlier.
		myTestNG.setXmlSuites(mySuites);

		// Create TestNG.xml
		File file = new File("./TestNG" + System.currentTimeMillis() + ".xml");
		FileWriter writer = new FileWriter(file);
		writer.write(mySuite.toXml());
		writer.close();
		// invoke run() - this will run your class.
		myTestNG.run();

		con.revokeTokenPrivileges(authToken);

		System.out.println("Execution Completed...");

	}
}
