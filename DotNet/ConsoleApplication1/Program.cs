using OpenQA.Selenium.Remote;
using ssts.util.pCloudy.AppiumAPIs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;

namespace ConsoleApplication1
{
    class Program
    {
        public static String BROWSER = "Chrome";

        public static int REPEATITION = 1;
        public static int BOOKINGDURATION = 6 * REPEATITION;

        public static String PLATFORM = BROWSER.Equals("Chrome") ? "android" : "ios";


        static void Main(string[] args)
        {
            Boolean use_pCloudy = true;

            if (use_pCloudy)
            {
                String apiEndpoint = "https://device.pcloudy.com";
                String email_id = "abhilipsa.das@sstsinc.com";
                String apiKey = "6y5f7y69fzbg33ys5hyrxkc6";

                init_pCloudyAppiumDriver(apiEndpoint, email_id, apiKey);
            }
            else
            {
                throw new InvalidOperationException();
            }

            Console.Out.WriteLine("##############################");
            Console.Out.WriteLine("                    ----------------");
            Console.Out.WriteLine("                      TestCase Completed");
            Console.Out.WriteLine("                  You may Check Screenshots now  ");
            Console.Out.WriteLine("                   -------------------");
            Console.Out.WriteLine("##############################");

        }

        private static void init_pCloudyAppiumDriver(string apiEndpoint, string email_id, string apiKey)
        {

            Console.Out.WriteLine(" Connecting to pCloudy Real Device Cloud.....");
            var con = new ssts.util.pCloudy.pCloudyClient(apiEndpoint);


            String authToken = con.authenticateUser(email_id, apiKey);

            Console.Out.WriteLine("-----------------------");
            Console.Out.WriteLine("pcloudy UserAPI Authenticated");
            Console.Out.WriteLine("-----------------------");

            var selectedDevices = con.chooseMultipleDevices(authToken, PLATFORM);

            string sessionName = "AppiumNative-" + selectedDevices.First().display_name;
            if (selectedDevices.Count > 1)
                sessionName += " and" + (selectedDevices.Count - 1) + "others";
            Console.Out.WriteLine("Total Devices Booked : " + selectedDevices.Count);
            var bookedDevices = con.bookDevicesForAppium(authToken, selectedDevices, TimeSpan.FromMinutes(BOOKINGDURATION), sessionName);
            Console.Out.WriteLine("Devices Booked....");


            log("-------------------------------");
            con.initAppiumHubForBrowser(authToken, BROWSER);
            log("-----------------------------");


            var endpoint = con.getAppiumEndpoint(authToken);
            log("Appium Endpoint: " + endpoint);



            List<Thread> threadPool = new List<Thread>();

            for (int i = 0; i < bookedDevices.Length; i++)
            {
                var aDevice = bookedDevices[i];
                var capabilities = new DesiredCapabilities();

                capabilities.SetCapability("browserName", BROWSER);
                capabilities.SetCapability("deviceName", aDevice.capabilities.deviceName);
                capabilities.SetCapability("platformName", aDevice.capabilities.platformName);
                capabilities.SetCapability("platformVersion", aDevice.version);
                
                if (PLATFORM.Equals("ios"))
                {
                    if (aDevice.version.CompareTo(new Version("9.3")) >= 0)
                        capabilities.SetCapability("automationName", "XCUITst");
                    else
                        Console.Error.WriteLine("Ios Safari automation based on Instruments is not supported. Pleaserun on newer devices with XUITest ");

                    capabilities.SetCapability("usePrebuiltWDA", true);
                    capabilities.SetCapability("acceptAlerts", true);
                }


                
                PCloudyAppiumSession session = new PCloudyAppiumSession(con, authToken, aDevice);
                
                TestCase tc = new TestCase(endpoint, capabilities, session);

                var t = new Thread(new ThreadStart(tc.run));
                t.Start();
                threadPool.Add(t);
            }

            foreach (Thread t in threadPool)
            {
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
