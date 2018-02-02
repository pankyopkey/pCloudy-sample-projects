using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ssts.util.pCloudy;
using System.IO;
using OpenQA.Selenium.Remote;
using System.Threading;
using ssts.util.pCloudy.AppiumAPIs;

namespace AppiumAndroidExecution_dotNet
{
    class Program
    {
        const int BOOKINGDURAITON = 5;
        const String appPath = "com.ba.mobile.apk";

        static void Main(string[] args)
        {
            log("Welcome to pCloudy c# Sample Project");
            var con = new ssts.util.pCloudy.pCloudyClient("https://device.pcloudy.com");
            String authToken = con.authenticateUser(yourEmailId, yourApiKey);
            log("AuthToken: " + authToken);

            log("-------------------------------");


            var selectedDevices = con.chooseMultipleDevices(authToken, "android");
            log("Total Devices Booked: " + selectedDevices.Count);
            String sessionName = "AppiumNative-" + selectedDevices.First().display_name;
            if (selectedDevices.Count > 1)
                sessionName += " and " + (selectedDevices.Count - 1) + " others";


            log("-------------------------------");
            var bookedDevices = con.bookDevicesForAppium(authToken, selectedDevices, TimeSpan.FromMinutes(BOOKINGDURAITON), sessionName);
            log("Devices Booked....");
            log("-------------------------------");


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
            else
            {

                log("App already present in Cloud Drive. Not uploading...");
            }
            con.initAppiumHubForApp(authToken, alreadyUploadedApp);
            var endpoint = con.getAppiumEndpoint(authToken);
            log("Appium Endpoint: " + endpoint);
            log("Result Folder Path: " + con.getAppiumReportFolder(authToken));


            List<Thread> threadPool = new List<Thread>();

            for (int i = 0; i < bookedDevices.Length; i++)
            {
                var aDevice = bookedDevices[i];
                String bookedDeviceID = aDevice.capabilities.deviceName;

                var capabilities = new DesiredCapabilities();

                capabilities.SetCapability("deviceName", bookedDeviceID);
                capabilities.SetCapability("browserName", bookedDeviceID);
                capabilities.SetCapability("platformName", "Android");
                capabilities.SetCapability("appActivity", "com.ba.mobile.LaunchActivity");
                capabilities.SetCapability("appPackage", "com.ba.mobile");

                PCloudyAppiumSession session = new PCloudyAppiumSession(con, authToken, aDevice);

                TestCase tc = new TestCase(endpoint, capabilities, session);

                var t = new Thread(new ThreadStart(tc.run));
                t.Start();
                threadPool.Add(t);
            }

            foreach(Thread t in threadPool){
                t.Join();
            }

            log("Press any key to exit..");
            Console.In.ReadLine();
        }


        static void log(string msg)
        {
            Console.Out.WriteLine(msg);
        }
    }
}
