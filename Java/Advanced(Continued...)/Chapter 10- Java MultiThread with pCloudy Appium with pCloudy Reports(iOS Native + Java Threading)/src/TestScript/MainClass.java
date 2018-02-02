package TestScript;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.openqa.selenium.remote.DesiredCapabilities;

import com.ssts.pcloudy.Connector;
import com.ssts.pcloudy.Version;
import com.ssts.pcloudy.appium.PCloudyAppiumSession;
import com.ssts.pcloudy.dto.appium.booking.BookingDtoDevice;
import com.ssts.pcloudy.dto.device.MobileDevice;
import com.ssts.pcloudy.dto.file.PDriveFileDTO;
import com.ssts.util.reporting.MultipleRunReport;
import com.ssts.util.reporting.SingleRunReport;
import com.ssts.util.reporting.printers.HtmlFilePrinter;

public class MainClass {

	public static int REPEATITION;
	public static int BOOKINGDURATION;

	public static File WORKING_DIRECTORY = new File("Reports");

	public static Boolean autoSelectDevices = true;

	public static void main(String args[]) throws Exception {

		System.out.println("<apiEndpoint> <email_id> <apiAuthKey> <AppPath> <Repeatition>");
		System.out.print("Received Args: ");
		for (String arg : args) {
			System.out.print(" " + arg);
		}

		System.out.println();

		Boolean use_pCloudy = true;

		System.out.println("Working Directory path:" + WORKING_DIRECTORY.getAbsolutePath());
		if (WORKING_DIRECTORY.exists() == false)
			WORKING_DIRECTORY.mkdirs();

		// 1. Make a suitable Appium Connection

		String[] deviceList = null;
		String appPath = "./TestmunkDemo.ipa"; // arr[3];

		REPEATITION = 1; // Integer.parseInt(arr[4]);
		BOOKINGDURATION = 5 * REPEATITION;
		if (use_pCloudy) {
			
			String apiEndpoint = "https://device.pcloudy.com";// arr[0];
			String emailID = Your_pCloudy_Email; // arr[1];
			String authKey = Your_pCloudy_APIKey; // arr[2];

			ProcessBuilder processbuilder = new ProcessBuilder();
			Map<String, String> envs = processbuilder.environment();
			String selectedDevices = envs.get("pCloudy_Devices");

			if (envs.get("pCloudy_Devices") != null) {
				deviceList = selectedDevices.split(",");
				System.out.println("Selected Devices: " + selectedDevices);
				for (int i = 0; i < deviceList.length; i++)
					System.out.println("Selected Devices List: " + deviceList[i]);
			} else {
				deviceList = new String[0];
			}
			try {
				init_pCloudyAppiumDriver(apiEndpoint, emailID, authKey, appPath, deviceList);

			} catch (Exception e) {
				e.printStackTrace();
			}

			// 2. Start the TestCases

		} else {
			init_LocalAppiumDriver("http://192.168.1.226:4723/wd/hub", appPath);
		}

	}

	private static void init_LocalAppiumDriver(String appiumEndPoint, String appPath) throws MalformedURLException {

		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability("newCommandTimeout", 600);
		// capabilities.setCapability("app", appPath);
		capabilities.setCapability("deviceName", "iOS");
		capabilities.setCapability("platformVersion", "9.2.1");
		capabilities.setCapability("platformName", "iOS");
		capabilities.setCapability("launchTimeout", Integer.valueOf(90000));
		capabilities.setCapability("bundleId", "com.pcloudy.TestmunkDemo");

		// capabilities.setCapability("automationName", "XCUITest");
		// capabilities.setCapability("automationName", "Appium");
		// capabilities.setCapability("xcodeConfigFile", "/Users/lalitjain/appium.xcconfig");
		SingleRunReport report = new SingleRunReport();
		String fullName = "Local Execution";
		report.Header = fullName;
		TestCase tc = new TestCase(report, capabilities, new URL(appiumEndPoint), null);
		tc.run();
	}

	private static void init_pCloudyAppiumDriver(String apiEndpoint, String userName, String apiKey, String appPath, String[] args) throws Exception {

		MultipleRunReport multipleReport = new MultipleRunReport();
		multipleReport.ProjectLogo = "http://www.sstsinc.com/assets/images/logo.png";

		// SSLUtilities.trustAllHostnames();
		// SSLUtilities.trustAllHttpsCertificates();

		System.out.println("Connecting to pCloudy Real Device Cloud...");
		Connector con = new Connector();

		con.setApiEndpoint(apiEndpoint);
		String authToken = con.authenticateUser(userName, apiKey);

		System.out.println(" ----------------------- ");
		System.out.println("pCloudy UserAPI Authenticated");
		System.out.println(" ----------------------- ");

		List<MobileDevice> selectedDevices = new ArrayList<MobileDevice>();

		if (args.length == 0) {
			if (autoSelectDevices)
				selectedDevices.addAll(con.chooseDevices(authToken, "iOS", new Version("9.3.*"), new Version("11.*.*"), 3));
			else
				selectedDevices.addAll(con.chooseMultipleDevices(authToken, "iOS"));
		} else {
			System.out.println("Added devices from Arguments");
			selectedDevices = con.chooseDevicesFromArrayOfFullNames(authToken, "ios", args);
		}
		System.out.println(" ----------------------- ");

		String sessionName = "AppiumNative-" + selectedDevices.get(0).display_name;
		if (selectedDevices.size() > 1)
			sessionName += " and " + (selectedDevices.size() - 1) + " others";

		System.out.println("Total devices booked: " + selectedDevices.size());
		BookingDtoDevice[] bookedDevices = con.AppiumApis().bookDevicesForAppium(authToken, selectedDevices, BOOKINGDURATION, sessionName);
		System.out.println("Devices booked...");

		System.out.println(" ----------------------- ");

		File fileToBeUploaded = new File(appPath);
		PDriveFileDTO alreadyUploadedApp = con.getAvailableAppIfUploaded(authToken, fileToBeUploaded.getName());
		if (alreadyUploadedApp == null) {
			System.out.println(" Uploading App ");
			PDriveFileDTO uploadedApp = con.uploadApp(authToken, new File(appPath));
			System.out.println("TestMunk App uploaded");
			alreadyUploadedApp = new PDriveFileDTO();
			alreadyUploadedApp.file = uploadedApp.file;
		} else {
			System.out.println("App already present. Not uploading... ");
		}

		System.out.println(" ----------------------- ");
		con.AppiumApis().initAppiumHubForApp(authToken, alreadyUploadedApp);
		System.out.println(" ----------------------- ");

		URL endpoint = con.AppiumApis().getAppiumEndpoint(authToken);

		System.out.println("Appium Endpoint:    " + endpoint);

		System.out.println("Result Folder Path: " + con.AppiumApis().getAppiumReportFolder(authToken));

		URL reportFolderOnPCloudy = con.AppiumApis().getAppiumReportFolder(authToken);

		List<Thread> threadPools = new ArrayList<Thread>();

		for (int i = 0; i < bookedDevices.length; i++) {
			BookingDtoDevice aDevice = bookedDevices[i];
			String bookedDeviceID = aDevice.capabilities.deviceName;
			// int bookedDeviceID = Integer.parseInt(aDevice.capabilities.deviceName);

			DesiredCapabilities capabilities = new DesiredCapabilities();
			capabilities.setCapability("newCommandTimeout", 600);
			capabilities.setCapability("launchTimeout", 90000);
			capabilities.setCapability("deviceName", aDevice.capabilities.deviceName);
			capabilities.setCapability("browserName", aDevice.capabilities.browserName);
			capabilities.setCapability("platformName", "iOS");
			capabilities.setCapability("bundleId", "com.pcloudy.TestmunkDemo");

			capabilities.setCapability("usePrebuiltWDA", false);
			capabilities.setCapability("acceptAlerts", true);

			if (aDevice.getVersion().compareTo(new Version("9.3")) >= 0)
				capabilities.setCapability("automationName", "XCUITest");
			else
				capabilities.setCapability("automationName", "Appium");

			SingleRunReport report = new SingleRunReport();
			String fullName = aDevice.manufacturer + "-" + aDevice.model + " " + aDevice.version;
			report.Header = fullName;
			report.ProjectLogo = "http://www.sstsinc.com/assets/images/logo.png";
			report.Enviroment.addDetail("Manufacturer", aDevice.manufacturer);
			report.Enviroment.addDetail("Model", aDevice.model);
			report.Enviroment.addDetail("Version", aDevice.version);
			report.Enviroment.addDetail("Platform", aDevice.os);
			report.Enviroment.addDetail("NetworkType", aDevice.networkType);
			report.Enviroment.addDetail("PhoneNumber", aDevice.phoneNumber);
			report.HyperLinks.addLink("pCloudy Data & Videos Link", reportFolderOnPCloudy);

			multipleReport.add(report);
			PCloudyAppiumSession sessionCloser = new PCloudyAppiumSession(con, authToken, aDevice);
			TestCase TC = new TestCase(report, capabilities, endpoint, sessionCloser);
			Thread t = new Thread(TC);
			t.setName(fullName);
			threadPools.add(t);
			t.start();

			Thread.sleep(15000);
		}

		for (Thread t : threadPools) {
			t.join();
			System.out.println("Thread Ended: " + t.getName());
		}

		con.revokeTokenPrivileges(authToken);

		System.out.println("Reports are creating........");
		// File consolidatedReport = new File("Reports/Consolidated Report.html");

		File consolidatedReport = new File(WORKING_DIRECTORY, "Consolidated Report.html");
		HtmlFilePrinter printer = new HtmlFilePrinter(consolidatedReport);
		printer.printConsolidatedSingleRunReport(multipleReport);

		System.out.println("All Threads ended. Now you can view the report");
		System.out.println('\n');

		System.out.println("CONSOLIDATED REPORT PATH:" + consolidatedReport.getAbsolutePath());

	}

}