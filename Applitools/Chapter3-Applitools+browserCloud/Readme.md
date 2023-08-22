<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Applitools Visual Testing Execution Guide</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <header style="color: #fff; text-align: center; padding: 1rem 0;">
        <h1 style="margin: 0; font-size: 1.5rem;">Applitools Visual Testing Execution Guide</h1>
        <em style="font-style: italic;">A comprehensive guide to the prerequisites and execution of Applitools Visual Testing</em>
    </header>
    <div style="max-width: 800px; margin: 2rem auto; padding: 0 1rem;">
        <h2>Prerequisites</h2>
        <ol style="padding-left: 1.5rem;">
            <li><strong>Applitools Account</strong><br>
                An Applitools account is essential for running visual tests. If you don't have an account, sign up at <a href="https://applitools.com/">Applitools</a>.</li>
            <li><strong>Node.js</strong><br>
                Ensure that Node.js is installed on your system. We recommend using Node.js version 16 or above for optimal compatibility.</li>
            <li><strong>NPM (Node Package Manager)</strong><br>
                NPM is needed to manage project dependencies. If you don't have it, install it alongside Node.js.</li>
            <li><strong>Project Setup</strong><br>
                Clone or download the project repository to your local machine. </li>
            <li><strong>Install Dependencies</strong><br>
                Open your terminal and navigate to the project directory. Install the necessary project dependencies by executing the following command:<br>
                <code>npm install</code></li>
        </ol>
        <h2>Configuration</h2>
        <ol style="padding-left: 1.5rem;">
            <li><strong>Update Email</strong><br>
                In the <code>config/config.js</code> file, locate the line containing <code>pCloudy_Username</code> and replace it with your email address.</li>
            <li><strong>Update API Key</strong><br>
            Similarly, find the lines with <code>pCloudy_ApiKey</code> and <code>apiKey</code>. Replace <code>Enter-API-Key</code> with your actual pCloudy API key. Also, replace <code>Enter-Applitools-API-KEY</code> with your Applitools API key.<br>
                If you're unsure about how to obtain the Applitools API key, refer to the <a href="https://applitools.com/docs/topics/overview/obtain-api-key.html">Applitools API Key Guide</a>.</li><br>
                <li>Similarly you can update your <code>appName</code> & <code>testName</code></li><br>
                <li>In your test script <code> pCloudyDemo.test.js</code> update the <code>Enter-username</code> & <code>Enter-Password</code> field with your actual pCloudy usename and Password</li>
        </ol>
        <h2>Execution</h2>
        <p>To run the visual testing script, follow these steps:</p>
        <ol style="padding-left: 1.5rem;">
            <li>Open your terminal.</li>
            <li>Navigate to the project directory using the <code>cd</code> command.</li>
            <li>Execute the following command to initiate the test:<br>
                <code>npm run test</code></li>
        </ol>
        <h2>Output</h2>
        <p>The test results will be accessible via your Applitools account dashboard. Log in to your Applitools account to view the visual testing output and analyze any discrepancies.</p>
        <p>With these steps completed, you're all set to perform Applitools Visual Testing and ensure the visual integrity of your application across different devices and screen sizes.</p>
    </div>
</body>
</html>
