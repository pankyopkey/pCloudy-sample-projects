using OpenQA.Selenium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Remote;
using ssts.util.pCloudy.AppiumAPIs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppiumAndroidExecution_dotNet
{
    class TestCase
    {
        private Uri appiumEndpoint;
        private DesiredCapabilities capabilities;
        private PCloudyAppiumSession pCloudyAppiumSession;


        public TestCase(Uri appiumEndpoint, DesiredCapabilities capabilities, PCloudyAppiumSession pCloudyAppiumSession)
        {
            this.appiumEndpoint = appiumEndpoint;
            this.capabilities = capabilities;
            this.pCloudyAppiumSession = pCloudyAppiumSession;
        }

        public void run()
        {
            log("Creating the Android Driver Object");
            try
            {
                AndroidDriver<AndroidElement> driver = new AndroidDriver<AndroidElement>(appiumEndpoint, capabilities);
                log("Created the driver object");
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


                Keywords keywords = new Keywords(driver, this.pCloudyAppiumSession);
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
            catch (Exception ex)
            {
                log(ex.Message);
            }
            finally
            {
                // Take screenshot from pCloudy API 
                var ss = pCloudyAppiumSession.takeScreenShot();
                log("pCloudy API Screenshot is at: " + ss.FullName);

                pCloudyAppiumSession.releaseSessionNow();
                log("Released session after completion of Execution");
            }


        }


        void log(string msg)
        {
            Console.Out.WriteLine("  "  + this.pCloudyAppiumSession.bookingDto.model.PadRight(20) + msg);
        }

    }
}
