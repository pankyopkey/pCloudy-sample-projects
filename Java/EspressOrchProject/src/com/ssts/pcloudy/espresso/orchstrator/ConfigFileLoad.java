package com.ssts.pcloudy.espresso.orchstrator;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

public class ConfigFileLoad {

	Properties prop = new Properties();

	static ConfigFileLoad instance = new ConfigFileLoad();

	public static ConfigFileLoad getInstance() {
		return instance;
	}

	private ConfigFileLoad() {
		InputStream input = null;
		File file = new File("config.properties");
		try {
			input = new FileInputStream(file.getAbsolutePath());
			prop.load(input);
			input.close();
		} catch (Exception ex) {

		}
	}

	public String get_pCloudyEndpoint() {
		return prop.getProperty("pCloudyEndpoint");
	}

	public String get_pCloudyUserName() {
		return prop.getProperty("pCloudyUsername");
	}

	public String get_pCloudyApiKey() {
		return prop.getProperty("pCloudyApiKey");
	}
	
	public int get_Duration(){
		return Integer.parseInt(prop.getProperty("DurationInMinutes"));
	}

	public String get_DeviceIds() {
		return prop.getProperty("DeviceIds");

	}

	public String get_ApplicationPath() {
		return prop.getProperty("ApkFilePath");

	}

	public String get_TestApkPath() {
		return prop.getProperty("TestApkPath");
	}
	
	public String get_OrchApkPath(){
		return prop.getProperty("OrchstratorApkPath");
	}
	
	public String get_ServiceApkPath(){
		return prop.getProperty("ServiceApkPath");
	}
	
	public String get_TestSuites(){
		return prop.getProperty("Suites");
	}
	
	public String get_TestRunner(){
		return prop.getProperty("TestRunner");
	}
	
	public String get_cycleName(){
		return prop.getProperty("TestCycleName");
	}

}
