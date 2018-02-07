
# Appium dotNet Integrations
As of now this contains only two sample projects:
1- Appium Native Test
## For automating Android Native Apps
2- Appium Web Test
## For both Chrome on Android as well as Safari of iOS.


1- You may open the solution file "Appium pClouty Test.sln"
2- Resolve the errors by providing your pCloudyEmail & pCloudyApiKey (you will get this from your Settings->API section in pCloudy website)
3- Right click on the AppiumWeb or AppiumNative project and 'Set as Startup Project'
4- Execute the project(or press F5)
5- Visual Studio should first fetch the dependancies from Nuget and then start the execution
6- Follow the instructions in the Console application to proceed

#pCloudy-vb-connector
Here the pCloudy-vb-connector is the project that is responsible to make REST calls to the pCloudy web apis and provide you a unified method of calling the apis as native .Net methods through code.
This project is maintained by pCloudy Team. You may want to build this as-is.