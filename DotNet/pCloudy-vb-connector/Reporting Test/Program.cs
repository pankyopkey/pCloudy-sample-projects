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
    }
}
