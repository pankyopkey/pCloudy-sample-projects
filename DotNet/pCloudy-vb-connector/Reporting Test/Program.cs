using ssts.util;
using ssts.util.pCloudy;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace ConsoleApplication2
{
    class Program
    {
        static void Main(string[] args)
        {
            testDeviceUnlock();

            pCloudyClient client = new pCloudyClient("https://device.pcloudy.com") ;
            String authToken = client.authenticateUser("anshuman.chatterjee@sstsinc.com", "qngf3bgv6h8pg2r8xm78xvxz");
            var p = client.getAvailableApps(authToken);
            var time = p[0].UploadedOn_UTC;

            SingleRunReport report = new SingleRunReport();
            report.addComment("Report on");
            report.addComment("Asus Zenfone laser");

            report.addStep("TestStep-1","Arguments",null,ExecutionResult.Pass);
            report.addStep("TestStep-2", "Other Arguments", "output", null, ExecutionResult.Fail);

            report.Header = "pCloudy";
            report.Footer = "@Copyright pCloudy.sstsinc.com";

            FileInfo reportOut = new FileInfo(Path.Combine(Environment.CurrentDirectory, "Reports", report.Header + ".html"));
            if(reportOut.Directory.Exists==false)
                reportOut.Directory.Create();

            HtmlFilePrinter printer = new HtmlFilePrinter(reportOut);
            printer.printSingleRunReport(report);
            Console.WriteLine(reportOut.FullName);
            Console.ReadLine();
        }

        static void testDeviceUnlock()
        {
            pCloudyClient client = new pCloudyClient("https://dell.pcloudy.com");
            String authToken = client.authenticateUser("jaymit.shah@sstsinc.com", "sxnnbnh96qcdytpsyp94tw9b");
            var apps = client.getAvailableApps(authToken);
            var device = client.chooseSingleDevice(authToken, "android");
            var bookedDevice = client.bookDevice(authToken, TimeSpan.FromMinutes(15), device, BookingType.Manual);

            while (true)
            {
                var width = Convert.ToInt32(device.resolution.Split('x')[0]);
                var height = Convert.ToInt32(device.resolution.Split('x')[1]);

                client.tryOpeningScreenLock(authToken, bookedDevice.rid, "test123", width, height);

                if (1!=2-1)
                {
                    break;
                }

            }
            
            client.releaseInstantAccessBooking(authToken, bookedDevice);
        }
    }
}
