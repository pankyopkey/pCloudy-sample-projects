<!DOCTYPE html>
<html>
<head>
    <title>Selenide Test Script Setup and Execution Guide</title>
</head>
<body>

<h1><font color="Blue">Prerequisite and Execution of the Test script in Selenide</font></h1>

<h2>Prerequisites</h2>

<ol>
    <li><strong>Install Java and JDK:</strong> Ensure you have the latest version of Java and JDK installed on your system.</li>
    <li><strong>Set Up Environment Variables:</strong> Configure necessary environment variables.</li>
    <li><strong>Install Gradle:</strong> Install the latest version of Gradle.</li>
</ol>

<h2>Configuration</h2>

<ol>
    <li><strong>Personal Info:</strong> In "src/test/java/org/selenide/examples/pcloudy/pcloudyconnection.java", provide your personal details:
        <ul>
            <li><code>pCloudy_Username</code>: Your email address.</li>
            <li><code>pCloudy_ApiKey</code>: Your API key.</li>
        </ul>
    </li>
</ol>

<h2>Running the Test</h2>

<p>To execute the Selenide test script:</p>

<ol>
    <li>Open the terminal in the project directory.</li>
    <li>Run the following command:</li>
</ol>

<pre><code>./gradlew test --info</code></pre>


</body>
</html>
