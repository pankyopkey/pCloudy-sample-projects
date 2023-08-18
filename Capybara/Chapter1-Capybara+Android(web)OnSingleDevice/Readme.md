<!DOCTYPE html>
<html>
<head>
    <title>Capybara Test Script Setup and Execution Guide</title>
</head>
<body>

<h1><font color="Blue">Prerequisite and Execution of the Test script in Capybara</font></h1>

<h2>Prerequisites</h2>

<ol>
    <li><strong>Install Ruby and Bundler:</strong> Make sure you have the latest version of Ruby and Bundler installed on your system.</li>
</ol>

<h2>Installation and Setup</h2>

<ol>
    <li>Run the following command to install the required packages listed in Gemfile:</li>
</ol>

<pre><code>bundle install</code></pre>

<h2>Configuration</h2>

<ol>
    <li><strong>Personal Info:</strong> In "features/support/pcloudy.rb", provide your personal details:
        <ul>
            <li><code>pCloudy_Username</code>: Your email address.</li>
            <li><code>pCloudy_ApiKey</code>: Your API key.</li>
        </ul>
    </li>
</ol>

<h2>Running the Test</h2>

<p>To execute the Capybara test script:</p>

<ol>
    <li>Open the terminal and navigate to the project directory.</li>
    <li>Run the following command:</li>
</ol>

<pre><code>bundle exec rake singleDevice</code></pre>


</body>
</html>
