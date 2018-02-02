using OpenQA.Selenium;
using OpenQA.Selenium.Remote;
using ssts.util.pCloudy.AppiumAPIs;
using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppiumAndroidExecution_dotNet
{
    class Keywords
    {
        private RemoteWebDriver driver;
        private PCloudyAppiumSession pCloudySession;

        public Keywords(RemoteWebDriver driver, PCloudyAppiumSession pCloudySession)
        {
            this.driver = driver;
            this.pCloudySession = pCloudySession;
        }

        public void log(string msg)
        {
            Console.Out.WriteLine(msg);
        }

        public void ObjectClick(OpenQA.Selenium.By by, String objectNameForReport)
        {
            try
            {
               var ele= driver.FindElement(by);
               ele.Click();
                log("Click an element");
               


            }
            catch (Exception e)
            {
                Console.Out.WriteLine(e.Message);
            }
        }

        public void typetext(OpenQA.Selenium.By by, String val)
        {
            try
            {
                var we = driver.FindElement(by);
                we.SendKeys(val);
                log("TypeText");
            }
            catch(Exception e)
            {
                Console.Out.WriteLine(e.Message);
            }
        }

        public void WaitForObject(OpenQA.Selenium.By by, TimeSpan waitTime)
        {
            DateTime startTime = DateTime.Now;
            var we = driver.FindElement(by);

            while (true)
            {

                try
                {
                    if (we.Displayed)
                    {
                        log("Wait for Object");

                        return;
                    }
                }
                catch (NoSuchElementException e)
                {

                    var timeDiff = DateTime.Now - startTime;

                    if (timeDiff >= waitTime)
                    {
                        Console.Out.WriteLine("Object not found in the defined time");
                        break;
                    }
                    
                }
            }
        }

        private String getSnapshot()
        {
            try
            {
                
                string folder = @"c:\Reports";
                string pathString = System.IO.Path.Combine(folder, "Snapshots");
                System.IO.Directory.CreateDirectory(pathString);


      
             log("Taking screenshot");

                if (pCloudySession == null) {
                    Screenshot screenshot = driver.GetScreenshot();
                    screenshot.SaveAsFile("pathString", ImageFormat.Png);
                    File.Copy("screenshot", "pathString");
                       
                }
                else
                {
                    FileInfo tmpFile = pCloudySession.takeScreenShot();
                    File.Copy("tmpFile", "pathString");
                }
                return pathString;

               
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
    
}
