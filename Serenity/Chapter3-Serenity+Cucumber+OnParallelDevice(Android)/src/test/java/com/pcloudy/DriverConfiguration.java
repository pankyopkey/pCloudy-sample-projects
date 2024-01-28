package com.pcloudy;



import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.openqa.selenium.WebElement;

import io.appium.java_client.AppiumDriver;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DriverConfiguration {

    public static List<AppiumDriver<WebElement>> initializeDriversFromJSON(String jsonFilePath) {
        List<Map<String, String>> configurations = loadConfigurationsFromJSON(jsonFilePath);

        if (configurations == null || configurations.isEmpty()) {
            System.out.println("No configurations found in JSON file.");
            return null;
        }

        System.out.println("Configurations: " + configurations);

        List<AppiumDriver<WebElement>> drivers = new ArrayList<>();

        for (Map<String, String> config : configurations) {
            String pCloudy_DeviceFullName = config.get("pCloudy_DeviceFullName");
            AppiumDriver<WebElement> driver = setUp(pCloudy_DeviceFullName);
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
	                String pCloudy_DeviceFullName = (String) jsonObject.get("pCloudy_DeviceFullName");
	                // Create a map with the extracted values
	                Map<String, String> configMap = Map.of(
	                        "pCloudy_DeviceFullName", pCloudy_DeviceFullName
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

    private static AppiumDriver<WebElement>  setUp(String pCloudy_DeviceFullName) {
        System.out.println("Setup: " + pCloudy_DeviceFullName);

        System.out.println("Initializing WebDriver..." + pCloudy_DeviceFullName);
        pcloudySerenityDriver driverProvider = new pcloudySerenityDriver();
        try {
        	AppiumDriver<WebElement> driver = driverProvider.prepareTest(pCloudy_DeviceFullName);
            System.out.println("Driver initialized..." + pCloudy_DeviceFullName);
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
