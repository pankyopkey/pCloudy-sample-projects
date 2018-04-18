using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Remote;
using ssts.util.pCloudy.AppiumAPIs;
using ssts.util.pCloudy.DTO.appium;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace pCloudyNUnitTestProject
{

    [TestFixture]
    [Parallelizable(ParallelScope.All)]
    public class TestCases
    {

        static TimeSpan BOOKINGDURATION = TimeSpan.FromMinutes(10);
        static String appPath = "com.ba.mobile.apk";
        static Version minimumVersion = new Version(5, 1, 1);
        static Version maximumVersion = new Version(8, 0, 0);
        static int maxDeviceCount = 2;
        public static List<PCloudyAppiumSession> pCloudySessions = new List<PCloudyAppiumSession>();


        public static String[] init()
        {
            log("Called init");
            List<String> list = new List<String>();

            var con = new ssts.util.pCloudy.pCloudyClient("https://device.pcloudy.com");
            String authToken = con.authenticateUser("kuldeep.kala@sstsinc.com", "3vngzzzghz267t5b2qqz3r5r");
            log("AuthToken: " + authToken);

            log("-------------------------------");

            log("maxDeviceCount:" + maxDeviceCount);
            var selectedDevices = con.getAvailableDevices(authToken, BOOKINGDURATION, "android", minimumVersion, maximumVersion, maxDeviceCount).ToList();

            log("Total Devices Booked: " + selectedDevices.Count);
            String sessionName = "NUnit Appium-" + System.DateTime.Now;

            FileInfo fileToBeuploaded = new FileInfo(appPath);

            var alreadyUploadedApp = con.getApplicationIfUploaded(authToken, fileToBeuploaded.Name);
            if (alreadyUploadedApp == null)
            {
                Console.Out.WriteLine("Uploading App :  " + appPath);
                var uploadedApp = con.uploadApp(authToken, fileToBeuploaded,
                    x =>
                    {
                        log("Uploaded: " + x + "%");
                    }
                 );

                log("App uploaded...");
                alreadyUploadedApp = new ssts.util.pCloudy.DTO.pDriveFileDTO();
                alreadyUploadedApp.file = uploadedApp.File;

            }

            log("-------------------------------");
            var bookedDevices = con.bookDevicesForAppium(authToken, selectedDevices, BOOKINGDURATION, sessionName);
            log("Devices Booked....");
            log("-------------------------------");


            con.initAppiumHubForApp(authToken, alreadyUploadedApp);
            var endpoint = con.getAppiumEndpoint(authToken);
            log("Appium Endpoint: " + endpoint);
            log("Result Folder Path: " + con.getAppiumReportFolder(authToken));


            foreach (BookingDtoDevice itm in bookedDevices)
            {
                PCloudyAppiumSession appiumSession = new PCloudyAppiumSession(con, authToken, itm);
                pCloudySessions.Add(appiumSession);

                //context.appiumEndpoint = endpoint;
                list.Add(appiumSession.getDeviceName());
            }


            return list.ToArray();
        }

        [TestCaseSource("init")]
        [Test]
        public void runAppiumTestCase2(String deviceName)
        {

            var appiumSession = (from itm in TestCases.pCloudySessions where itm.getDeviceName() == deviceName select itm).Single();

            var capabilities = new DesiredCapabilities();

            capabilities.SetCapability("deviceName", appiumSession.bookingDto.capabilities.deviceName);
            capabilities.SetCapability("browserName", appiumSession.bookingDto.capabilities.browserName);
            capabilities.SetCapability("platformName", "Android");
            capabilities.SetCapability("appActivity", "com.ba.mobile.LaunchActivity");
            capabilities.SetCapability("appPackage", "com.ba.mobile");

            Uri appiumEndpoint = appiumSession.con.getAppiumEndpoint(appiumSession.authToken);
            try
            {

                log(appiumSession.bookingDto.manufacturer + " " + appiumSession.bookingDto.model);
                throw new Exception("Will do this later");
                AndroidDriver<AndroidElement> driver = new AndroidDriver<AndroidElement>(appiumEndpoint, capabilities, TimeSpan.FromMinutes(120));

                log("Created the driver object: " + appiumSession.bookingDto.model);
                //////////////////////////////////////////////
                //////////////////////////////////////////////
                //////////////////////////////////////////////
                //////////////////////////////////////////////
                //                                    ////////
                //     Your TestScripts Goes Here     ////////
                //                                    ////////
                //////////////////////////////////////////////
                //////////////////////////////////////////////
                //////////////////////////////////////////////
                //////////////////////////////////////////////


                Keywords keywords = new Keywords(driver, appiumSession);
                keywords.ObjectClick(By.Id("android:id/button1"), "Accept Button");
                keywords.ObjectClick(By.Id("android:id/button1"), "OK Button");
                keywords.ObjectClick(By.Id("com.ba.mobile:id/flightButton"), "BookFlight MenuItem");
                keywords.ObjectClick(By.Id("com.ba.mobile:id/departure_airport"), "Combo Departure From");
                keywords.typetext(By.Id("com.ba.mobile:id/search"), "Bengaluru");
                keywords.ObjectClick(By.Id("com.ba.mobile:id/airport"), "CityName");
                keywords.typetext(By.Id("com.ba.mobile:id/search"), "New Delhi");
                keywords.ObjectClick(By.Id("com.ba.mobile:id/airport"), "CityName");
                keywords.ObjectClick(By.Id("com.ba.mobile:id/singleTrip"), "Radio Button");
                keywords.ObjectClick(By.Id("com.ba.mobile:id/depart_date_button"), "Departure DatePicker");


                // Take Screenshot from Appium Driver
                var screenshot = driver.GetScreenshot();
                String fileName = "Screen-" + Guid.NewGuid() + ".png";
                screenshot.SaveAsFile(fileName, System.Drawing.Imaging.ImageFormat.Png);

                log("Appium Driver Screenshot is at: " + fileName);
            }
            finally
            {
                appiumSession.releaseSessionNow();
                log("Session Released");
            }
        }


        [TearDown]
        public void cleanup()
        {

        }



        static void log(String s)
        {
            try
            {
                using (StreamWriter logFile = File.AppendText("log.txt"))
                {
                    logFile.WriteLine(s);
                }
                TestContext.Out.WriteLine(s);
                Console.WriteLine(s);
            }
            catch (Exception ex)
            {
                //this method throws error during discovery
            }
        }
    }
}