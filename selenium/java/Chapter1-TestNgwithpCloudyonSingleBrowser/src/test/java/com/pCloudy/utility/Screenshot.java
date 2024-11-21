package com.pCloudy.utility;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.apache.commons.lang3.RandomStringUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.io.FileHandler;
import org.openqa.selenium.remote.RemoteWebDriver;


public class Screenshot {

    String folder_name;
    DateFormat df;


    public void captureScreenShots(RemoteWebDriver driver) throws IOException {
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = currentDateTime.format(formatter);
        String randomName = RandomStringUtils.randomAlphanumeric(4);
        String  screenshotName = randomName + formattedDateTime;
        folder_name = "screenshot";
        File f = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);

        new File(folder_name).mkdir();

        String file_name = screenshotName + ".png";

        FileHandler.copy(f, new File(folder_name + "/" + file_name));
    }

}