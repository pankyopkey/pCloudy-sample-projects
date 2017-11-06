package com.ssts;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.remote.DesiredCapabilities;

import com.ssts.pcloudy.Connector;
import com.ssts.pcloudy.Version;
import com.ssts.pcloudy.appium.PCloudyAppiumSession;
import com.ssts.pcloudy.dto.appium.booking.BookingDtoDevice;
import com.ssts.pcloudy.dto.device.MobileDevice;
import com.ssts.pcloudy.dto.file.PDriveFileDTO;
import com.ssts.pcloudy.exception.ConnectError;
import com.ssts.util.reporting.ExecutionResult;
import com.ssts.util.reporting.MultipleRunReport;
import com.ssts.util.reporting.SingleRunReport;
import com.ssts.util.reporting.printers.HtmlFilePrinter;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;

public class BritishAirwaysAppium {

	public File ReportsFolder = new File("Reports");
	

	public static void main(String[] args) throws IOException, ConnectError, InterruptedException {

		BritishAirwaysAppium britishAirways = new BritishAirwaysAppium();
		britishAirways.runExecutionOnPCloudy();

		// TODO Auto-generated method stub

	}

	public void runExecutionOnPCloudy() throws IOException, ConnectError, InterruptedException {
		
		int deviceBookDurationTime= 10;
		
		Connector con = new Connector("https://device.pcloudy.com/api/");

		// User Authentication over pCloudy
		String authToken = con.authenticateUser(Your_pCloudy_Email,Your_pCloudy_APIKey);

		ArrayList<MobileDevice> selectedDevices = new ArrayList<>();
		// Populate the selected Devices here
		// selectedDevices.add(MobileDevice.getNew("Samsung_GalaxyE7_Android_5.1.1", 143, "GalaxyE7", "Galaxy E7", "android", "5.1.1", "Samsung"));

		// To select multiple devices manually, use either of these:
//		selectedDevices.addAll(con.chooseMultipleDevices(authToken, "android"));
		// selectedDevices.addAll(CloudyCONNECTOR.chooseSingleDevice(authToken, "android"));
	     selectedDevices.addAll(con.chooseDevices(authToken, "android", new Version("5.*.*"),new Version("7.*.*"), 4));

		String sessionName = selectedDevices.get(0).display_name + " Appium Session";
		// Book the selected devices in pCloudy
		BookingDtoDevice[] bookedDevices = con.AppiumApis().bookDevicesForAppium(authToken, selectedDevices, deviceBookDurationTime, sessionName);
		System.out.println("Devices booked successfully");

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
			System.out.println(" App already present. Not uploading... ");
		}

		con.AppiumApis().initAppiumHubForApp(authToken, alreadyUploadedApp);

		URL endpoint = con.AppiumApis().getAppiumEndpoint(authToken);
		System.out.println("Appium Endpoint: " + endpoint);

		URL reportFolderOnPCloudy = con.AppiumApis().getAppiumReportFolder(authToken);
		System.out.println("Report Folder: " + reportFolderOnPCloudy);

		List<Thread> allThreads = new ArrayList<Thread>();
		MultipleRunReport multipleReports = new MultipleRunReport();

		// Create multiple driver objects in multiple threads
		for (int i = 0; i < bookedDevices.length; i++) {
			BookingDtoDevice aDevice = bookedDevices[i];
			PCloudyAppiumSession pCloudySession = new PCloudyAppiumSession(con, authToken, aDevice);
			SingleRunReport report = new SingleRunReport();
			multipleReports.add(report);

			report.Header = aDevice.manufacturer + " " + aDevice.model + " " + aDevice.version;
			report.Enviroment.addDetail("NetworkType", aDevice.networkType);
			report.Enviroment.addDetail("Phone Number", aDevice.phoneNumber);
			report.HyperLinks.addLink("Appium Endpoint", endpoint);
			report.HyperLinks.addLink("pCloudy Result Folder", reportFolderOnPCloudy);

			Runnable testCase = getTestCaseClass(endpoint, aDevice, pCloudySession, report);
			Thread aThread = new Thread(testCase);
			aThread.start();
			allThreads.add(aThread);
		}

		for (Thread aThread : allThreads) {
			aThread.join();
		}

		con.revokeTokenPrivileges(authToken);

		File consolidatedReport = new File(ReportsFolder, "ConsolidatedReports.html");
		HtmlFilePrinter printer = new HtmlFilePrinter(consolidatedReport);
		printer.printConsolidatedSingleRunReport(multipleReports);
		System.out.println("Check the reports at : " + consolidatedReport.getAbsolutePath());

		System.out.println("Execution Completed...");
	}

	private Runnable getTestCaseClass(final URL endpoint, final BookingDtoDevice aDevice, final PCloudyAppiumSession pCloudySession, final SingleRunReport report) {
		// this will give a Thread Safe TestScript class.
		// You may also like to have this as a named class in a separate file

		return new Runnable() {

			@Override
			public void run() {
				File deviceFolder = new File(ReportsFolder, aDevice.manufacturer + " " + aDevice.model + " " + aDevice.version);
				File snapshotsFolder = new File(deviceFolder, "Snapshots");
				snapshotsFolder.mkdirs();
				try {
					DesiredCapabilities capabilities = new DesiredCapabilities();
					capabilities.setCapability("newCommandTimeout", 600);
					capabilities.setCapability("launchTimeout", 90000);
					capabilities.setCapability("deviceName", aDevice.capabilities.deviceName);
					capabilities.setCapability("browserName", aDevice.capabilities.deviceName);
					capabilities.setCapability("platformName", "Android");
					capabilities.setCapability("appPackage", "com.ba.mobile");
					capabilities.setCapability("appActivity", "com.ba.mobile.LaunchActivity");
					capabilities.setCapability("rotatable", true);
					AppiumDriver driver = new AndroidDriver(endpoint, capabilities);

					report.beginTestcase("TestCase BA");
					report.addStep("Launch App", capabilities.toString(), endpoint.toString(), ExecutionResult.Pass);

					report.addComment("--- Add your Test Scripts over here ---");
					// ###########################################
					// ###########################################
					// ###########################################
					// ###########################################
					// Your Test Script Goes Here
					// ###########################################
					// ###########################################
					// ###########################################
					// ###########################################
					// ###########################################

					File snapshotTmpFile = pCloudySession.takeScreenshot();
					File snapshotFile = new File(snapshotsFolder, snapshotTmpFile.getName());
					FileUtils.moveFile(snapshotTmpFile, snapshotFile);

					report.addStep("Take Screenshot", null, null, snapshotFile.getAbsolutePath(), ExecutionResult.Pass);

					

					report.addStep("Release Appium Session", null, null, ExecutionResult.Pass);

				} catch (ConnectError | IOException e) {
					report.addStep("Error Running TestCase", null, e.getMessage(), ExecutionResult.Fail);
					e.printStackTrace();
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					
					// release session now
					try {
						pCloudySession.releaseSessionNow();
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					HtmlFilePrinter printer = new HtmlFilePrinter(new File(deviceFolder, deviceFolder.getName() + ".html"));
					printer.printSingleRunReport(report);

				}
			}

		};
	}

}
