<h1 align="center">Serenity</h1>

<p align="center">A guide on the prerequisites and execution of the Serenity test</p>

<h2>Prerequisites</h2>

<ol>
  <li>Java version 11</li>
  
  
  <li>Configure the environment variable for Java</li>
  
  
  <li>Maven with JUnit framework support</li>
  

</ol>
<h2>Configuration</h2>
<ol>
 <li>Replace the credentials in <code>pcloudySerenityDriver.java</code> inside the 'test' directory with the
                    appropriate values for `clientName`, `apiKey`, `email`, `baseUrl`.</li>
 <li>From <code>serenity.properties</code> change the value of `browserName` ,  `browserVersion` , `os` , `osName`</li>
 <li>As many as parallel value increases in <code>serenity.properties</code> need to increase the Parallel Classes inside the package <code>com.pCloudy.cucumber</code> with the prefix keyword  `Parallel`</li>
  
</ol>
<h2>Execution</h2>
<p>To run the script, use the following command in the terminal:</p>

 ```bash
mvn clean
mvn verify -P parallel
 ```



