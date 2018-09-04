<h1 style="display:flex;flex-direction:row;align-items: center;"><a target="_blank" rel="noopener noreferrer" href="https://www.pcloudy.com"><img src="/pankyopkey/pCloudy-sample-projects/raw/master/images/pcloudy.png" style="max-width:100%;"></a><span>pCloudy Appium Sample Projects</span></h1>

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
