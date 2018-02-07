using ssts.util;
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
