<!DOCTYPE html>
<html>
<head>
    <title>Nemo Test Script Setup and Execution Guide</title>
</head>
<body>

<h1><font color="Blue">Prerequisite and Execution of the Test script in Nemo</font></h1>

<h2>Prerequisites</h2>

<ol>
    <li><strong>Install Node.js and NPM:</strong> Make sure you have the latest version of Node.js and NPM installed on your system.</li>
</ol>

<h2>Installation and Setup</h2>

<ol>
    <li>Inside a new directory, run the following command to install required packages, including "Nemo", listed in package.json:</li>
</ol>

<pre><code>npm install</code></pre>

<h2>Configuration</h2>

<ol>
    <li><strong>Personal Info:</strong> In "nemo.config.js", provide your personal details:
        <ul>
            <li><code>pCloudy_Username</code>: Your email address.</li>
            <li><code>pCloudy_ApiKey</code>: Your API key.</li>
        </ul>
    </li>
</ol>

<h2>Running the Test</h2>

<p>To execute the Nemo test script:</p>

<ol>
    <li>Open the terminal and navigate to the project directory.</li>
    <li>Run the following command:</li>
</ol>

<pre><code>npx nemo nemo.config.js</code></pre>



</body>
</html>
