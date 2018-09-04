<h1 style="display:flex;flex-direction:row;align-items: center;"><a target="_blank" rel="noopener noreferrer" href="https://www.pcloudy.com"><img src="/images/pcloudy.png" style="max-width:100%;"></a><span>pCloudy Appium Sample Projects</span></h1>

## About [pCloudy](https://www.pcloudy.com)

pCloudy platform provides single click access to real Android and IOS devices directly from your browser. Use these real Mobile Devices to click-and-perform Manual Testing and Automation Testing for your App. Integrate our platform with CI for continuous Automation Testing and test your App on multiple real Mobile Devices with every change of your App.

pCloudy is a popular mobile testing platform integrated with Appium script which enables you to automate test of mobile apps as well.

Read more here https://www.pcloudy.com

### Python-Appium Script Execution
[Installation Guide For Ubuntu Machine]
Step-1: sudo apt-get install python(Recommended version 2.7)
Step-2: Download and install py-charm
Step-3: sudo apt-get install python-pip
Step-4: pip install Appium-Python-Client
Step-5: pip install robot-framework
Step-6: pip install robotframework-appiumlibrary
Step-7: pip install -U robotframework-pabot<https://github.com/mkorpela/pabot>
Step-8: Enter your <MailId> in ***pCloudy_Username="Enter your Email-id"***
Step-9: Enter your <ApiKey> in ***pCloudy_ApiKey="Enter your API Key"***
Step-10: Open Terminal where the project is located.
Step-10: Run the script with the following cmd: ***pabot --argumentfile1 arg.txt SampleTestCase.txt***
Step-11: Optional Capabilities : Can choose anyone of the below-:
Option1: pCloudy_DeviceManafacturer
Option2: pCloudy_DeviceVersion
Option3: pCloudy_DeviceFullName
Step-12: Go to arg.txt : Variable automationName can be change based on the device version.
