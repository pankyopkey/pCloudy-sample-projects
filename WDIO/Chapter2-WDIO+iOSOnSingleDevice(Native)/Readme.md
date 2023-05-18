<h1 align="center">WebdriverIO Test Script Execution</h1>

<p align="center">A guide on the prerequisites and execution of the WebdriverIO test script.</p>

<h2>Prerequisites</h2>

<ol>
  <li>Node.js</li>
  <p>Make sure you have Node.js installed on your machine. It is recommended to use version 16 or above.</p>
  
  <li>NPM</li>
  <p>Ensure that NPM (Node Package Manager) is installed on your machine.</p>
  
  <li>Project Setup</li>
  <p>Clone or download the project to your local system.</p>
  
  <li>Install Dependencies</li>
  <p>Open the terminal and navigate to the project's downloaded path. Install the project dependencies by running the following command:</p>
  
  ```bash
  npm install
  ```
</ol>
<h2>Configuration</h2>
<ol>
  <li>Update Email</li>
  <p>In the "wdio.iOS.conf.js" file, locate the line containing "pCloudy_Username" and enter your email address as the value.</p>
  <li>Update API Key</li>
  <p>Similarly, find the line with "pCloudy_ApiKey" and replace "Enter your API Key" with your actual API key.</p>
</ol>
<h2>Execution</h2>
<p>To run the script, use the following command in the terminal:</p>

 ```bash
npm run wdio
 ```
<h2>Allure Report Prerequisites</h2>
<ol>
  <li>Java Installation</li>
  <p>Ensure that Java is installed on your machine and the environment variable is properly configured.</p>
</ol>
<h2>Viewing the Allure Report</h2>
<p>After executing the tests, generate the Allure report using the following command:</p>

```bash
allure generate [allure_output_dir] && allure open 
```
Replace [allure_output_dir] with the directory name where the Allure results are stored.



