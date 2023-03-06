**<font color ="Blue"><h2>Prerequisite and execution of the Test script in Nightwatch</h2>**</font><br>
Step-1: You will need to have Node.js installed on your machine. (Recommended version 16 or above)<br><br>
Step-2: You will need to have NPM installed on your machine<br><br>
Step-3: Create a simple test folder by running following cmd: $ mkdir webdriverio-test<br><br>
Step-4: Install & configure WebdriverIO by running following cmd in the new directory which is created (webdriverio-test): npm init wdio .<br><br>
Step-5: While configuring **Mocha framework** & **Allure Reporter** should be installed & base url : **https://device.pcloudy.com** <br><br>
Step 6: Copy the *wdio.iOS.parallel.conf.js* file and *test* directory in the new directoy *webdriverio-test* and remove *wdio.conf.js* <br><br>
Step-7: Enter your <MailId> in ***pCloudy_Username="Enter your Email-id"*** in "wdio.iOS.parallel.conf.js". <br><br>
Step-8: Enter your <ApiKey> in ***pCloudy_ApiKey="Enter your API Key"*** in "wdio.iOS.parallel.conf.js". <br><br>
Step-9: Run the script with the following cmd: ***npx wdio run ./wdio.iOS.parallel.conf.js*** <br><br>
Step-10: Optional Capabilities : Can choose anyone of the below-:<br><br>
Option1: pCloudy_DeviceManafacturer<br>
Option2: pCloudy_DeviceVersion<br>
Option3: pCloudy_DeviceFullName<br><br>


**<font color ="red"><h2>Prerequisite for allure report </h2>**</font><br>

1. **Java** should be installed in the machine and Environment varialbe should be configure
2. Run the command to install **allure-connamdline** : npm install -g allure-commandline --save-dev<br>
     Note : Make sure to run the command as an Administrator
3. To display the report in your localhost run the following command : allure generate [allure_output_dir] && allure open
     * Replace the  [allure_output_dir] to the **allure-result** directory
