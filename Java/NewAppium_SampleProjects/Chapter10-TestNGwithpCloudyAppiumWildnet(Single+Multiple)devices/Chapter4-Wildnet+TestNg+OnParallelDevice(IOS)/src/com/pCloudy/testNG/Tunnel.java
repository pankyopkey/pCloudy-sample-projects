package com.pCloudy.testNG;



import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.openqa.selenium.Capabilities;

import java.io.FileReader;
import org.testng.annotations.BeforeSuite;

public class Tunnel {
	
	
	 @BeforeSuite
	 public  void setup() 
	 {
	        JSONObject jsonParams = readJsonParams("src/resources/config.json");
	        String pCloudy_Username = (String) jsonParams.get("pCloudy_Username");
	        String pCloudy_ApiKey = (String) jsonParams.get("pCloudy_ApiKey");
	        String baseUrl = (String) jsonParams.get("baseUrl");
	        Tunnel.connection(pCloudy_Username, pCloudy_ApiKey, baseUrl);
	    }

	 

	// Read the parameter from the json
	  public static JSONObject readJsonParams(String filePath) {
	        JSONParser parser = new JSONParser();
	        JSONObject jsonParams = null;

	        try {
	            
	            Object obj = parser.parse(new FileReader(filePath));
	            jsonParams = (JSONObject) obj;
	        } catch (IOException | ParseException e) {
	            e.printStackTrace();
	        }

	        return jsonParams;
	    }

	  public static void connection(String username, String apikey, String cloudUrl) {
		     String osName = System.getProperty("os.name");
		    System.out.println("Operating System: " + osName);

		    String platform = "";
		    String executableUrl = "";

		    if (osName.toLowerCase().contains("linux")) {
		        platform = "Linux-Wildnet";
		        executableUrl = "https://content.pcloudy.com/executables/utilities/WildNet_Executables/pCloudyWildNetLinux_v2.2";
		    } else if (osName.toLowerCase().contains("mac")) {
		        platform = "Mac-Wildnet";
		        executableUrl = "https://content.pcloudy.com/executables/utilities/WildNet_Executables/pCloudyWildNetMac_v2.2";
		    } else if (osName.toLowerCase().contains("windows")) {
		        platform = "Windows-Wildnet";
		        executableUrl = "https://content.pcloudy.com/executables/utilities/WildNet_Executables/pCloudyWildNetWindows_v2.2.exe";
		    } else {
		        System.out.println("Unsupported Operating System in connection : " + osName);
		        return;
		    }

		    checkAndDownloadFile(platform, executableUrl);

		    if (osName.contains("Linux")){
		        runLinuxCommands(platform, username, apikey, cloudUrl);
		    } 
		    else if (osName.contains("Mac")) {
			        runMacCommands(platform, username, apikey, cloudUrl);
			   }
		   else if (osName.contains("Windows")) {
		        runWindowsCommands(platform, username, apikey, cloudUrl);
		    }
		}

	  
	  private static void runMacCommands(String fileName, String username, String apikey, String cloudUrl) {
		    try {
		    	 // Set execute permission for the file
		             String chmodCommand = "chmod 777 ./Wildnet-JAR/" + fileName;
		              Process chmodProcess = Runtime.getRuntime().exec(chmodCommand);
		              chmodProcess.waitFor();
		       
		        String[] command;
		            	 command = new String[]{"open", "-na", "Terminal", "--args", "./Wildnet-JAR/" + fileName + " -i " + username + " -k " + apikey + " -u " + cloudUrl};  
		        Process process = new ProcessBuilder(command).inheritIO().start();
		        process.waitFor();
		    } catch (IOException | InterruptedException e) {
		        e.printStackTrace();
		    }
		}
	  
	  
 private static void runLinuxCommands(String fileName, String username, String apikey, String cloudUrl) {
     try {
         // Set execute permission for the file
         String chmodCommand = "chmod 777 ./Wildnet-JAR/" + fileName;
         Process chmodProcess = Runtime.getRuntime().exec(chmodCommand);
        chmodProcess.waitFor();
        // Run the command
         String command;
         command = "gnome-terminal -- bash -c './Wildnet-JAR/" + fileName + " -i " + username + " -k " + apikey + " -u " + cloudUrl + "; exec bash'";
         
         Process process = new ProcessBuilder("bash", "-c", command).inheritIO().start();
         process.waitFor();
     } catch (IOException | InterruptedException e) {
        e.printStackTrace();
     }
 }


 private static void runWindowsCommands(String fileName,String username, String apikey, String cloudUrl) {
     try {
         // Run the command
         String command = "cmd.exe /c start .\\Wildnet-JAR\\" + fileName + " -i " + username + " -k " + apikey + " -u " + cloudUrl;
         Process process = Runtime.getRuntime().exec(command);
         process.waitFor();
     } catch (IOException | InterruptedException e) {
         e.printStackTrace();
     }
 }
 
 public static void checkAndDownloadFile(String fileName, String downloadLink) {
     String rootDirectory = System.getProperty("user.dir");
     String targetDirectory = rootDirectory + File.separator + "Wildnet-JAR";
     String filePath;
     
     // Special handling for Windows case
     if (fileName.equalsIgnoreCase("Windows-Wildnet")) {
         filePath = targetDirectory + File.separator + "Windows-Wildnet.exe";
     } else {
         filePath = targetDirectory + File.separator + fileName;
     }

     // Create the target directory if it doesn't exist
     File targetDir = new File(targetDirectory);
     if (!targetDir.exists()) {
         if (targetDir.mkdirs()) {
             System.out.println("Created directory: " + targetDirectory);
         } else {
             System.out.println("Failed to create directory: " + targetDirectory);
         }
     }

     // Check if the file exists in the target directory
     if (!isFileExists(filePath)) {
         // Download the file in the target directory
         System.out.println("Downloading file: " + fileName);
         try {
         	
             downloadFile(downloadLink, filePath);
             System.out.println("File " + fileName + " downloaded successfully.");
         } catch (IOException e) {
             System.out.println("Error downloading file: " + fileName);
             e.printStackTrace();
         }
     } else {
         System.out.println("File " + fileName + " already exists in the target directory.");
     }
 }


 public static boolean isFileExists(String filePath) {
     File file = new File(filePath);
     return file.exists();
 }

 public static void downloadFile(String downloadLink, String filePath) throws IOException {
     URL url = new URL(downloadLink);
     ReadableByteChannel rbc = Channels.newChannel(url.openStream());

     String fileWithExtension = filePath;
     try (FileOutputStream fos = new FileOutputStream(fileWithExtension)) {
         fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
     }
     System.out.println("File " + fileWithExtension + " downloaded successfully.");
 }
 
 public static void validateWildNetCapability(Capabilities capabilities) {
     // Check if pCloudy_WildNet capability is not set
     if (!capabilities.asMap().containsKey("pCloudy_WildNet")) {
         System.out.println("⚠️ Warning: pCloudy_WildNet capability is not set.");
     } else {
         // Check the value of pCloudy_WildNet capability
         switch (String.valueOf(capabilities.getCapability("pCloudy_WildNet"))) {
             case "true":
                 // pCloudy_WildNet is set to true
                 break;
             case "false":
                 System.out.println("⚠️ Warning: pCloudy_WildNet capability is set to false.");
                 break;
             default:
                 System.out.println("⚠️ Warning: Invalid value for pCloudy_WildNet capability.");
         }
     }
 }
}

