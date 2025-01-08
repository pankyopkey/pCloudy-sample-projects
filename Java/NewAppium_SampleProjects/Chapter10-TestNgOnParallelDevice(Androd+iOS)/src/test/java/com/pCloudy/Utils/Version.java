package com.pCloudy.Utils;

public class Version {

	public static boolean isVersionGreaterThanTwo(String version) {
        String[] versionParts = version.split("\\.");
        int majorVersion = Integer.parseInt(versionParts[0]);
        return majorVersion >= 2;
    }
	
}
