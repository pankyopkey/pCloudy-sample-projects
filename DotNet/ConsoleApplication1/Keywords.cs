using OpenQA.Selenium;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.UI;
using ssts.util.pCloudy.AppiumAPIs;
using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;

namespace ConsoleApplication1
{
    class Keywords
    {
        private RemoteWebDriver driver;
        private PCloudyAppiumSession pCloudySession;

        public Keywords(PCloudyAppiumSession pCloudySession)
        {

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
                var ele = driver.FindElement(by);
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
            catch (Exception e)
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

                if (pCloudySession == null)
                {
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

        public void navigateTo(String Uri)
        {
            driver.Navigate().GoToUrl(Uri);
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            wait.Until(p => ((RemoteWebDriver)p).ExecuteScript("return document.readyState").Equals("complete"));

        }

        public void initRemoteWebDriver(Uri endpoint, DesiredCapabilities capabilities, String url)
        {
            int trialsLeft = 11;
            Exception firstException = null;
            // Thread.sleep(3000);
            while (trialsLeft > 0)
            {
                trialsLeft--;
                try
                {
                    driver = new RemoteWebDriver(endpoint, capabilities);

                    driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromSeconds(30));
                    driver.Manage().Timeouts().SetPageLoadTimeout(TimeSpan.FromSeconds(30));
                    // driver.manage().timeouts().setScriptTimeout(10, TimeUnit.SECONDS);
                    Thread.Sleep(1000);
                    this.navigateTo(url);
                    return;
                }
                catch (Exception ex)
                {
                    // report.addComment(ex.getMessage());
                    Thread.Sleep(1000);
                    if (firstException == null)
                        firstException = ex;

                    if (driver != null)
                        driver.Quit();
                }

            }

            // report.addStep("Open App", endpoint.toString(), firstException.toString(), ExecutionResult.Fail);
            throw firstException;

        }



        internal void quit()
        {
            if (this.driver != null)
                driver.Quit();
        }

        internal RemoteWebDriver getDriver()
        {
            return this.driver;
        }
    }

}

