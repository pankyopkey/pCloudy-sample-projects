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
            report.addComment("report on");
            report.addComment("asus Zenfone laser");

            report.addStep("gghjjhk","ffjhgkj",null,ExecutionResult.Pass);
            report.addStep("vbjnkml", "fhjgjhk", "gfghmj", null, ExecutionResult.Fail);

            report.Header = "pcloudy";
            report.Footer = "@copyright pcloudy.ssts.inc";

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
