package com.pcloudy;



import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.openqa.selenium.WebDriver;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DriverConfiguration {

    public static List<WebDriver> initializeDriversFromJSON(String jsonFilePath) {
        List<Map<String, String>> configurations = loadConfigurationsFromJSON(jsonFilePath);

        if (configurations == null || configurations.isEmpty()) {
            System.out.println("No configurations found in JSON file.");
            return null;
        }

        System.out.println("Configurations: " + configurations);

        List<WebDriver> drivers = new ArrayList<>();

        for (Map<String, String> config : configurations) {
            String os = config.get("os");
            String osVersion = config.get("osVersion");
            String browserName = config.get("browserName");
            String browserVersions = config.get("browserVersions");

            WebDriver driver = setUp(os, osVersion, browserName, browserVersions);
            drivers.add(driver);
        }

        return drivers;
    }

    private static List<Map<String, String>> loadConfigurationsFromJSON(String jsonFilePath) {
    	  JSONParser jsonParser = new JSONParser();

	        try (FileReader reader = new FileReader(jsonFilePath)) {
	            // Parse the JSON file
	            Object obj = jsonParser.parse(reader);

	            // Cast the parsed object to a JSONArray
	            JSONArray jsonArray = (JSONArray) obj;

	            List<Map<String, String>> configurations = new ArrayList<>();

	            // Iterate through each JSON object in the array
	            for (Object jsonElement : jsonArray) {
	                JSONObject jsonObject = (JSONObject) jsonElement;

	                // Extract values from each JSON object
	                String os = (String) jsonObject.get("os");
	                String osVersion = (String) jsonObject.get("osVersion");
	                String browserName = (String) jsonObject.get("browserName");
	                String browserVersions = (String) jsonObject.get("browserVersions");

	                // Create a map with the extracted values
	                Map<String, String> configMap = Map.of(
	                        "os", os,
	                        "osVersion", osVersion,
	                        "browserName", browserName,
	                        "browserVersions", browserVersions
	                );

	                // Add the map to the list of configurations
	                configurations.add(configMap);
	            }

	            return configurations;
	        } catch (IOException | org.json.simple.parser.ParseException e) {
	            e.printStackTrace();
	            throw new RuntimeException("Error loading configurations from JSON file", e);
	        }
    }

    private static WebDriver setUp(String os, String osVersion, String browserName, String browserVersions) {
        System.out.println("Setup: " + os + " " + osVersion + " " + browserName + " " + browserVersions);

        System.out.println("Initializing WebDriver..." + os);
        pcloudySerenityDriver driverProvider = new pcloudySerenityDriver();
        try {
            WebDriver driver = driverProvider.prepareTest(os, osVersion, browserName, browserVersions);
            System.out.println("Driver initialized..." + driver);
            if (driver == null) {
                throw new IllegalStateException("WebDriver initialization failed");
            }
            return driver;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error initializing WebDriver", e);
        }
    }
}
