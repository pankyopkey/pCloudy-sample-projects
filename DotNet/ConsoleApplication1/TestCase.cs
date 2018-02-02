using OpenQA.Selenium;
using OpenQA.Selenium.Remote;
using ssts.util.pCloudy.AppiumAPIs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace ConsoleApplication1
{
    class TestCase
    {

        Uri endpoint = null;
        DesiredCapabilities capabilities = null;


        PCloudyAppiumSession sessionCloser = null;

        public TestCase(Uri endpoint, DesiredCapabilities capabilities, PCloudyAppiumSession sessionCloser)
        {
            this.endpoint = endpoint;

            this.capabilities = capabilities;
            this.sessionCloser = sessionCloser;
        }


        public void run() {
            try
            {
                for (int i = 1; i <= Program.REPEATITION; i++)
                {
                    try
                    {
                        this.test_Google();
                    }
                    catch (Exception e)
                    {
                        Console.Error.WriteLine(e.Message);
                    }

                }
                try
                {
                    if (sessionCloser != null)
                        sessionCloser.releaseSessionNow();
                }
                catch (Exception e)
                {
                    log(e.Message);
                }

            }
           finally
            {
                Console.Out.WriteLine("Block ended");
            }
        }

        private void log(string p)
        {
            Console.Out.WriteLine(p);
        }



        public void test_Google()
        {
            Keywords keywords = new Keywords(this.sessionCloser);
            try
            {
                keywords.initRemoteWebDriver(this.endpoint, this.capabilities, "https://google.com");

                keywords.WaitForObject(By.Name("q"), TimeSpan.FromSeconds(10));

                keywords.ObjectClick(By.Name("q"), "Google Search TextBox");

                keywords.typetext(By.Name("q"), "pCloudy");

                keywords.ObjectClick(By.Name("btnG"), "Search Button");


                keywords.navigateTo("https://device.pcloudy.com");

                keywords.typetext(By.Id("userId"), "good.user@domain.com");

                keywords.typetext(By.Id("password"), "pa$$w*rd");

                keywords.ObjectClick(By.Id("loginSubmitBtn"), "Login Button");

                keywords.WaitForObject(By.Id("loginErrMsg"), TimeSpan.FromSeconds(10));


                keywords.navigateTo("https://www.gmail.com");
                Console.Out.WriteLine("----------");

            }
            finally
            {
                keywords.quit();

            }
        }

    }
}