<h1 align="center">OxygenHQ Test Script Execution</h1>

<p align="center">A guide on the prerequisites and execution of the OxygenHQ test script.</p>

<h2>Prerequisites</h2>

<ol>
  <li>Node.js and NPM</li>
  <p>Install Node.js and NPM on your system. It is recommended to use version 14 </p>
  
  <li>Project Setup</li>
  <p>Clone or download the project to your local system. Open the terminal and navigate to the downloaded project folder.</p>
  
  <li>Install Project Dependencies</li>
  <p>Run the following command in the terminal to install the project dependencies:</p>
  
  ```bash
  npm install
```
</ol>
<h2>Configuration</h2>
<ol>
  <li>Update Email</li>
  <p>In the "oxygen.conf.js" file, locate the line containing "pCloudy_Username" and enter your email address as the value.</p>
  <li>Update API Key</li>
  <p>Similarly, find the line with "pCloudy_ApiKey" and replace "Enter your API Key" with your actual API key.</p>
</ol>
<h2>Execution</h2>
<p>To run the test, use the following command in the terminal:</p>

```bash
npm run oxygen
```
