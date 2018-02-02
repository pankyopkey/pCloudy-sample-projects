package main;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.naming.OperationNotSupportedException;

import org.openqa.selenium.remote.DesiredCapabilities;

import com.ssts.pcloudy.Connector;
import com.ssts.pcloudy.Version;
import com.ssts.pcloudy.appium.PCloudyAppiumSession;
import com.ssts.pcloudy.dto.appium.booking.BookingDtoDevice;
import com.ssts.pcloudy.dto.device.MobileDevice;
import com.ssts.util.reporting.MultipleRunReport;
import com.ssts.util.reporting.SingleRunReport;
import com.ssts.util.reporting.printers.HtmlFilePrinter;

import io.appium.java_client.remote.MobileBrowserType;
import testcases.TestSuite;

public class EntryPoint_Web {

	public static String BROWSER = MobileBrowserType.CHROME;

	public static int REPEATITION = 1;
	public static int BOOKINGDURATION = 6 * REPEATITION;

	public static String PLATFORM = "android";
	public static File WORKING_DIRECTORY = new File("Reports");

	public static void main(String arr[]) throws Exception {
		Boolean use_pCloudy = true;

		if (use_pCloudy) {
			String apiEndpoint = "https://device.pcloudy.com";
			String email_id = Your_pCloudy_username;
			String apiKey = Your_pCloudy_APIKey;

			init_pCloudyAppiumDriver(apiEndpoint, email_id, apiKey);

		} else {
			throw new OperationNotSupportedException();
		}

		System.out.println(" #####################################################################");
		System.out.println("                      ----------------------- ");
		System.out.println("                        TestCase completed");
		System.out.println("                    You may Check Screenshots now");
		System.out.println("                      ----------------------- ");
		System.out.println(" #####################################################################");
	}

	private static void init_pCloudyAppiumDriver(String apiEndpoint, String userName, String apiKey) throws Exception {

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

		List<MobileDevice> selectedDevices = con.chooseDevices(authToken, PLATFORM, new Version("5.*.*"),new Version("7.*.*"), 3);
		
		// List<MobileDevice> selectedDevices = con.chooseDevices(authToken, PLATFORM, new Version(4, 3, 0), new Version(10, 2, 2), 20);

		String sessionName = "AppiumNative-" + selectedDevices.get(0).display_name;
		if (selectedDevices.size() > 1)
			sessionName += " and " + (selectedDevices.size() - 1) + " others";
		System.out.println("Total devices booked: " + selectedDevices.size());
		BookingDtoDevice[] bookedDevices = con.AppiumApis().bookDevicesForAppium(authToken, selectedDevices, BOOKINGDURATION, sessionName);
		System.out.println("Devices booked...");

		System.out.println(" ----------------------- ");
		con.AppiumApis().initAppiumHubForBrowser(authToken, BROWSER);
		System.out.println(" ----------------------- ");

		URL endpoint = con.AppiumApis().getAppiumEndpoint(authToken);

		System.out.println("Appium Endpoint:    " + endpoint);

		System.out.println("Result Folder Path: " + con.AppiumApis().getAppiumReportFolder(authToken));

		System.out.println();
		URL reportFolderOnPCloudy = con.AppiumApis().getAppiumReportFolder(authToken);
		Thread.sleep(5000); // give some time to appium on mac to register to grid

		List<Thread> threadPools = new ArrayList<Thread>();

		for (int i = 0; i < bookedDevices.length; i++) {

			BookingDtoDevice aDevice = bookedDevices[i];

			DesiredCapabilities capabilities = new DesiredCapabilities();

			capabilities.setBrowserName(BROWSER);
			capabilities.setCapability("deviceName", aDevice.capabilities.deviceName);
			capabilities.setCapability("platformName", aDevice.capabilities.platformName);
			capabilities.setCapability("platformVersion", aDevice.version);

			if (PLATFORM.equalsIgnoreCase("ios")) {
				if (aDevice.getVersion().compareTo(new Version("9.3")) >= 0)
					capabilities.setCapability("automationName", "XCUITest");
				else
					throw new Exception("IosSafari automation based on Instruments is not supported. Please run on newer devices with XCUITest.");

				capabilities.setCapability("usePrebuiltWDA", true);
				capabilities.setCapability("acceptAlerts", true);
			}

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

			PCloudyAppiumSession pCloudySession = new PCloudyAppiumSession(con, authToken, aDevice);

			TestSuite TC = new TestSuite(endpoint, report, capabilities, pCloudySession);
			Thread t = new Thread(TC);
			t.setName(fullName);
			System.out.println("Thread started: " + fullName);
			threadPools.add(t);
			t.start();

			System.out.println();
		}

		for (Thread t : threadPools) {
			t.join();
			System.out.println("Thread Ended: " + t.getName());
		}
		con.revokeTokenPrivileges(authToken);

		System.out.println("Reports are creating........");

		File consolidatedReport = new File(WORKING_DIRECTORY, "Consolidated Report.html");
		HtmlFilePrinter printer = new HtmlFilePrinter(consolidatedReport);
		printer.printConsolidatedSingleRunReport(multipleReport);

		System.out.println("All Threads ended. Now you can view the report");
		System.out.println();

		System.out.println("CONSOLIDATED REPORT PATH:" + consolidatedReport.getAbsolutePath());

	}

}
