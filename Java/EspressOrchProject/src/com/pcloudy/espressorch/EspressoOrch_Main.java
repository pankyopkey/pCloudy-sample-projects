package com.pcloudy.espressorch;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ssts.pcloudy.Connector;
import com.ssts.pcloudy.dto.automation.AutomationIntrruptResponse.AutomationIntrruptResult;
import com.ssts.pcloudy.dto.automation.ScheduleAutomationResponse.ScheduleAutomationResult;
import com.ssts.pcloudy.dto.device.MobileDevice;
import com.ssts.pcloudy.dto.file.PDriveFileDTO;
import com.ssts.pcloudy.exception.ConnectError;

public class EspressoOrch_Main {
	static String deviceIds;
	static String authToken;
	static Connector con;

	@SuppressWarnings("unused")
	public static void main(String[] args) throws Exception {
		Runtime.getRuntime().addShutdownHook(new Thread() {
	        public void run() {
	            try {
	                Thread.sleep(200);
	                //System.out.println("Shutting down ...");
	                Cleanup_automation(authToken, deviceIds);

	            } catch (InterruptedException e) {
	                Thread.currentThread().interrupt();
	                e.printStackTrace();
	            } catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (ConnectError e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	        }
	    });
		String apiEndpoint = ConfigFileLoad.getInstance().get_pCloudyEndpoint();
		System.out.println("Api Endpoint: " + apiEndpoint);
		
		String userName = ConfigFileLoad.getInstance().get_pCloudyUserName();
		System.out.println("User Name: " + userName);
		
		String accessKey = ConfigFileLoad.getInstance().get_pCloudyApiKey();
		System.out.println("AccessKey: " + accessKey);

		int duration = ConfigFileLoad.getInstance().get_Duration();
		
				deviceIds 	= ConfigFileLoad.getInstance().get_DeviceIds();
		
		String cycleName 	= ConfigFileLoad.getInstance().get_cycleName();
		
		String apkPath 		= ConfigFileLoad.getInstance().get_ApplicationPath();
		
		String testApkPath 	= ConfigFileLoad.getInstance().get_TestApkPath();
		
		String orchApkPath 	= ConfigFileLoad.getInstance().get_OrchApkPath();
		
		String serviceApkPath = ConfigFileLoad.getInstance().get_ServiceApkPath();
		
		String testSuites 	= ConfigFileLoad.getInstance().get_TestSuites();
		
		String testRunner 	= ConfigFileLoad.getInstance().get_TestRunner();

		if(testRunner.isEmpty()) {
			System.out.println("TestRunner Can't be empty");
			System.exit(0);
		}
		
		System.out.println("testSuites: " + testSuites);
		System.out.println("TestRunner: " + testRunner);
		
		File apkFile = new File(apkPath);
		File testFile = new File(testApkPath);

		File orchFile = new File(orchApkPath);
		File serviceApk = new File(serviceApkPath);

		scheduleEspressoTest(apiEndpoint, userName, accessKey, duration, deviceIds, apkFile, testFile, orchFile, serviceApk, testSuites,cycleName, testRunner);
	}

	public static void Cleanup_automation(String authToken, String deviceIds) throws IOException, ConnectError {
		deviceIds = "\"" + deviceIds + "\"";
		//System.out.println("Automation force stop. "+deviceIds);
		AutomationIntrruptResult aiResult = con.AutomationAPIs().intrruptAutomation(authToken, deviceIds);
		System.out.println("Result "+aiResult.msg);
	}
	
	@SuppressWarnings("null")
	public static void scheduleEspressoTest(String endpoint, String userName, String accessKey, Integer duration, String deviceIds, File fileToUpload, File testFile, File orchFile, File serviceFile, String testSuites,
		String cycleName, String testRunner) throws Exception {

		con = new Connector(endpoint);

		authToken = con.authenticateUser(userName, accessKey);

		System.out.println("Authentication success.");

		System.out.println("Apk files upload in progress. Please wait!!");

		PDriveFileDTO orchDto = con.getAvailableAppIfUploaded(authToken, orchFile.getName());
		if (orchDto == null) {
			orchDto = con.uploadApp(authToken, orchFile, false);
		}

		PDriveFileDTO serviceApp = con.getAvailableAppIfUploaded(authToken, serviceFile.getName());
		if (serviceApp == null) {
			serviceApp = con.uploadApp(authToken, serviceFile, false);
		}

		PDriveFileDTO apkFileDto = con.getAvailableAppIfUploaded(authToken, fileToUpload.getName());

		if (apkFileDto == null) {
			apkFileDto = con.uploadApp(authToken, fileToUpload, false);
		} else {

			con.deleteFileFromCloud(authToken, apkFileDto.file, "data");

			apkFileDto = con.uploadApp(authToken, fileToUpload, false);
		}

		PDriveFileDTO testFileDto = con.getAvailableAppIfUploaded(authToken, testFile.getName());

		if (testFileDto == null) {
			testFileDto = con.uploadApp(authToken, testFile, false);
		} else {

			con.deleteFileFromCloud(authToken, testFileDto.file, "data");

			testFileDto = con.uploadApp(authToken, testFile, false);
		}
		System.out.println("Apk files uploaded successfully.");

		ScheduleAutomationResult espressoResult = con.AutomationAPIs().executeEspressoByOrch(authToken, duration, deviceIds, apkFileDto, testFileDto, orchDto, serviceApp, testSuites, cycleName, testRunner);

		System.out.println("Your Espresso test session has been scheduled sucessfully.");

		waitForAutomationCompleted(con, authToken, deviceIds, espressoResult.tid);
		//AutomationReportURL url = con.AutomationAPIs().getEspressoReportURL(authToken, espressoResult.tid);
		
		//System.out.println("Url Endpoint: "+con.getApiEndpoint());
		String[] splitedString =con.getApiEndpoint().split("api");

		System.out.println("Report URL: "+endpoint+"/execution_report/"+espressoResult.tid+"?key="+authToken);
		

	}

	public static void waitForAutomationCompleted(Connector con, String authToken, String devices, int tid) throws IOException, ConnectError, InterruptedException {
		String status = "";
		
		try
		{
			while (!status.equalsIgnoreCase("Completed")) {
				Thread.sleep(10000);
				status = con.AutomationAPIs().getAutomationStatus(authToken, tid, devices);
				System.out.println("Status: " + status);
			}
			
			
		}
		catch(Exception ex) {
			System.out.println("Error is "+ex.toString());
		}

	}

	public void espressoSchedule(String endpoint, String userName, String accessKey) throws IOException, ConnectError {
		Connector con = new Connector(endpoint);
		String authToken = con.authenticateUser(userName, accessKey);

		File fileToUpload = new File("/home/radmin/Downloads/com.ba.mobile.apk");

		PDriveFileDTO uploadedApp = con.getAvailableAppIfUploaded(authToken, fileToUpload.getName());
		if (uploadedApp == null) {
			System.out.println("Unable to find any app by name: " + fileToUpload.getName() + ". \nPress any key to re-upload");

			uploadedApp = con.uploadApp(authToken, fileToUpload);
			System.out.println("File uploaded again. Now it should have been 0 KB in Cloud Drive");
		}

	}

	public static List<MobileDevice> bookDevicesForEspressoOrch(String authToken, List<MobileDevice> devices, Integer durationInMnutes, String friendlySessionName, String platform,
			boolean skipNotAvailableDevices) throws ConnectError, IOException {
		// Connector con = new Connector();

		if (skipNotAvailableDevices) {
			MobileDevice[] availableDevices = con.getDevices(authToken, 10, platform, true);
			List<MobileDevice> availableDevicesList = new ArrayList<MobileDevice>(Arrays.asList(availableDevices));
			List<Integer> deviceIds = getMobileIds(devices);
			List<Integer> availableDevicesIds = getMobileIds(availableDevicesList);
			Map<Integer, MobileDevice> deviceMap = getdevicesMap(devices);
			deviceIds = intersection(deviceIds, availableDevicesIds);
			ArrayList<MobileDevice> finalDevicesList = new ArrayList<>();
			for (Integer currentAvailableDeviceIds : deviceIds) {
				finalDevicesList.add(deviceMap.get(currentAvailableDeviceIds));
			}
			List<MobileDevice> notAvailableDevicesList = intersection1(devices, finalDevicesList);
			if (notAvailableDevicesList.size() != 0) {
				for (int i = 0; i < notAvailableDevicesList.size(); i++) {
					System.out.println(notAvailableDevicesList.get(i).manufacturer + " " + notAvailableDevicesList.get(i).display_name + " is not available");
				}
			}

			devices = finalDevicesList;
		}
		return devices;
	}

	static List<Integer> getMobileIds(List<MobileDevice> list) {
		List<Integer> ids = new ArrayList<>();
		for (MobileDevice device : list) {
			ids.add(device.id);
		}
		return ids;
	}

	static Map<Integer, MobileDevice> getdevicesMap(List<MobileDevice> list1) {
		Map<Integer, MobileDevice> map = new HashMap<Integer, MobileDevice>();
		for (MobileDevice device : list1) {
			map.put(device.id, device);
		}
		return map;
	}

	public static <T> List<T> intersection(List<T> list1, List<T> list2) {
		List<T> list = new ArrayList<>();
		for (T t : list1) {
			if (list2.contains(t)) {
				list.add(t);
			}
		}
		return list;
	}

	public static <T> List<T> intersection1(List<T> list1, List<T> list2) {
		List<T> list = new ArrayList<>();
		for (T t : list1) {
			if (!list2.contains(t)) {
				list.add(t);
			}
		}
		return list;
	}

	private static List<MobileDevice> mobileDevices(String authToken, String deviceids) throws ConnectError, IOException {
		MobileDevice[] devices = con.getDevices(authToken, 5, "android", true);

		List<MobileDevice> selectedDevices = new ArrayList<MobileDevice>();

		String[] arr = deviceids.split(",");

		for (String id : arr) {
			MobileDevice device = devices[Integer.parseInt(id)];
			selectedDevices.add(device);
		}

		return selectedDevices;

	}

}
