namespace NUnitParallelRunner
{
    using NUnit.Framework;
    using System;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Remote;
    using OpenQA.Selenium.Appium.Android;
    using System.Drawing.Imaging;

    [TestFixture("Samsung")]
    [TestFixture("Sony")]
    [Parallelizable(ParallelScope.Fixtures)]


    public class Program
    {
        AndroidDriver<AndroidElement> driver;
        private String deviceName;
        private object driverAndroid;


        public Program(String deviceName)
        {

            this.deviceName = deviceName;
      
        }

        [SetUp]
        public void SetUp()
        {
            Console.WriteLine("Connecting to Appium server");
            DesiredCapabilities capabilities = new DesiredCapabilities();
            capabilities.SetCapability("pCloudy_Username", "Enter your Email-id");
            capabilities.SetCapability("pCloudy_ApiKey", "Enter your API Key");
            capabilities.SetCapability("pCloudy_ApplicationName", "pCloudyAppiumDemo.apk");
            capabilities.SetCapability("pCloudy_DeviceManafacturer", deviceName);
            //capabilities.SetCapability("pCloudy_DeviceFullName", "Samsung_GalaxyS9_Android_8.0.0");
            //capabilities.SetCapability("pCloudy_DeviceVersion", "6.0.1");
            //capabilities.SetCapability("pCloudy_DeviceManafacturer", "Samsung");
            capabilities.SetCapability("newCommandTimeout", 600);
            capabilities.SetCapability("pCloudy_DurationInMinutes", "10");
            capabilities.SetCapability("launchTimeout", 90000);
            capabilities.SetCapability("platformName", "Android");
            driver = new AndroidDriver<AndroidElement>(new Uri("https://device.pcloudy.com/appiumcloud/wd/hub"), capabilities, TimeSpan.FromSeconds(600));
            System.Threading.Thread.Sleep(50000);
        }


        [TestCase]
        public void LoginPage()
        {
            TestScreenShot();
            //Click on Accept button
            driver.FindElement(By.Id("com.pcloudy.appiumdemo:id/accept")).Click();
            TestScreenShot();

            //Click on flight button
            driver.FindElement(By.XPath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/flightButton']")).Click();
            TestScreenShot();

            //Select from location
            driver.FindElement(By.XPath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerfrom']")).Click();
            TestScreenShot();

            driver.FindElement(By.XPath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Bangalore, India (BLR)']")).Click();
            TestScreenShot();

            //Select to location
            driver.FindElement(By.XPath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerto']")).Click();
            TestScreenShot();

            driver.FindElement(By.XPath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Pune, India (PNQ)']")).Click();
            TestScreenShot();

            //Select one way trip
            driver.FindElement(By.XPath("//android.widget.RadioButton[@resource-id='com.pcloudy.appiumdemo:id/singleTrip']")).Click();
            TestScreenShot();

            //Select departure time
            driver.FindElement(By.XPath("//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/txtdepart']")).Click();
            TestScreenShot();

            driver.FindElement(By.XPath("//android.widget.Button[@resource-id='android:id/button1' and @text='OK']")).Click();
            TestScreenShot();

            //Click on search flights button
            driver.FindElement(By.XPath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/searchFlights']")).Click();
            TestScreenShot();
        }

        [TearDown]
        public void End()
        {

            if (driver != null) driver.Quit();
        }

        //Capture Screenshots
        public void TestScreenShot()
        {
            ITakesScreenshot screenshotDriver = driver as ITakesScreenshot;
            Screenshot screenshot = screenshotDriver.GetScreenshot();
            String file = "./screenshots" + "snapshot" + "_" + DateTime.Now.ToString("dd_MMMM_hh_mm_ss_fff_tt") + ".png";
            screenshot.SaveAsFile(file, ScreenshotImageFormat.Png);
        }
    }
}

