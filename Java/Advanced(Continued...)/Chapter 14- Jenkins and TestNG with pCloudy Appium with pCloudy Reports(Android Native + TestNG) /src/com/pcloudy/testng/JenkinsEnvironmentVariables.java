package com.pcloudy.testng;

import java.util.Map.Entry;

public class JenkinsEnvironmentVariables {

	public static void printEnvironmentVariables() {
		System.out.println("=========================================");
		for (Entry<String, String> env : System.getenv().entrySet()) {
			if (env.getKey().startsWith("pCloudy"))
				System.out.println(env.getKey() + " : " + env.getValue());
		}
		System.out.println("=========================================");
	}

	public static String getApiEndpoint() {
		return System.getenv("pCloudy_CloudEndpoint");
	}

	public static String get_pCloudy_UserName() {
		return System.getenv("pCloudy_Username");
	}

	public static String get_pCloudy_ApiKey() {
		return System.getenv("pCloudy_APIKey");
	}

	public static String getApplication() {
		return System.getenv("pCloudy_AppPath");
	}

	public static int getDuration() {
		return Integer.parseInt(System.getenv("pCloudy_Duration"));
	}

	public static String[] getDevicesFullNames() {
		return System.getenv("pCloudy_Devices").split(",");
	}

}
