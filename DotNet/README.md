<h1 style="display:flex;flex-direction:row;align-items: center;"><a target="_blank" rel="noopener noreferrer" href="https://www.pcloudy.com"><img src="/images/pcloudy.png" style="max-width:100%;"></a><span>pCloudy Appium Sample Projects</span></h1>

## About [pCloudy](https://www.pcloudy.com)

pCloudy platform provides single click access to real Android and IOS devices directly from your browser. Use these real Mobile Devices to click-and-perform Manual Testing and Automation Testing for your App. Integrate our platform with CI for continuous Automation Testing and test your App on multiple real Mobile Devices with every change of your App.

pCloudy is a popular mobile testing platform integrated with Appium script which enables you to automate test of mobile apps as well.

Read more here https://www.pcloudy.com

## Appium dotNet Integrations
As of now this contains only two sample projects:
* ![Android][android] ![Native][native] Appium Native Test-For automating Android Native Apps
* ![Android][android] ![iOS][ios] ![Web][web]  Appium Web Test-For both Chrome on Android as well as Safari of iOS.

## Getting Started - How to run

* You may open the solution file "Appium pClouty Test.sln"
* Resolve the errors by providing your pCloudyEmail & pCloudyApiKey (you will get this from your Settings->API section in pCloudy website)
* Right click on the AppiumWeb or AppiumNative project and 'Set as Startup Project'
* Execute the project(or press F5)
* Visual Studio should first fetch the dependancies from Nuget and then start the execution
* Follow the instructions in the Console application to proceed

## About the *pCloudy-vb-connector* Project
Here the pCloudy-vb-connector is the project that is responsible to make REST calls to the pCloudy web apis and provide you a unified method of calling the apis as native .Net methods through code.
This project is maintained by pCloudy Team. You may want to build this as-is.



[android]:/images/android.png "Android"
[ios]:/images/apple.png "iOS"
[native]:/images/native.png "Native"
[web]:/images/web.png "Web"
