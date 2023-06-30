<h1 style="display:flex;flex-direction:row;align-items: center;">
  <a target="_blank" rel="noopener noreferrer" href="https://www.pcloudy.com">
    <img src="/images/pcloudy.png" style="max-width:100%;">
  </a>
  <span>pCloudy Appium Sample Projects</span>
</h1>

<h2>About <a href="https://www.pcloudy.com">pCloudy</a></h2>

<p>
  pCloudy platform provides single-click access to real Android and iOS devices directly from your browser.
  Use these real Mobile Devices to click-and-perform Manual Testing and Automation Testing for your App.
  Integrate our platform with CI for continuous Automation Testing and test your App on multiple real Mobile Devices with every change of your App.
</p>

<p>
  pCloudy is a popular mobile testing platform integrated with Appium script which enables you to automate the test of mobile apps as well.
</p>

<p>Read more <a href="https://www.pcloudy.com">here</a>.</p>

<h3>Python-Appium Script Execution</h3>

<p><strong>Installation Guide For Ubuntu Machine</strong></p>

<ol>
  <li>
    Download the project and install virtual environment. Create a venv in the directory. <br>
    to create a virtual environment: <a href="https://python.land/virtual-environments/virtualenv">venv</a>
  </li>
  <li>Download and install <strong>PyCharm</strong></li>
  <li>Install python:</li>
</ol>

<pre><code> sudo apt-get install python</code></pre>

<ol start="4">
  <li> Install pip</li>
</ol>

<pre><code>sudo apt-get install python-pip</code></pre>

<ol start="5">
  <li>Install Appium-Python-Client:</li>
</ol>

<pre><code>pip install Appium-Python-Client</code></pre>

<ol start="6">
  <li>Install Robot framework:</li>
</ol>

<pre><code> pip install robotframework</code></pre>

<ol start="7">
  <li>Install Robot framework Appium Library:</li>
</ol>

<pre><code>pip install robotframework-appiumlibrary </code></pre>

<ol start="8">
  <li>Install Robot framework Pabot:</li>
</ol>

<pre><code>pip install -U robotframework-pabot </code></pre>

<ol start="9">
  <li>Enter your <em>&lt;MailId&gt;</em> in the code file where specified:</li>
</ol>

<pre><code>pCloudy_Username="Enter your Email-id"</code></pre>

<ol start="10">
  <li>Enter your <em>&lt;ApiKey&gt;</em> in the code file where specified:</li>
</ol>

<pre><code>pCloudy_ApiKey="Enter your API Key"</code></pre>

<ol start="11">
  <li>Open the terminal in the project directory.</li>
  <li>Run the following command in the terminal:</li>
</ol>

<pre><code>pabot --argumentfile1 arg.txt SampleTestCase.txt</code></pre>

<ol start="12">
  <li>Optional Capabilities - Choose any one of the following options:</li>
</ol>

<ul>
  <li>Option 1: <code>pCloudy_DeviceManufacturer</code></li>
  <li>Option 2: <code>pCloudy_DeviceVersion</code></li>
  <li>Option 3: <code>pCloudy_DeviceFullName</code></li>
</ul>

<ol start="13">
  <li>Open the <em>arg.txt</em> file and change the value of the <em>automationName</em> variable based on the device version.</li>
</ol>
