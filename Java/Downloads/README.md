<h1 style="display:flex;flex-direction:row;align-items: center;"><a target="_blank" rel="noopener noreferrer" href="https://www.pcloudy.com"><img src="/images/pcloudy.png" style="max-width:100%;"></a><span>pCloudy Appium Sample Projects</span></h1>

## About [pCloudy](https://www.pcloudy.com)

pCloudy platform provides single click access to real Android and IOS devices directly from your browser. Use these real Mobile Devices to click-and-perform Manual Testing and Automation Testing for your App. Integrate our platform with CI for continuous Automation Testing and test your App on multiple real Mobile Devices with every change of your App.

pCloudy is a popular mobile testing platform integrated with Appium script which enables you to automate test of mobile apps as well.

Read more here https://www.pcloudy.com

# Downloads

Download pCloudy-Connector-Jar from above link(in github)


=========== How to install pCloudy-Java-Connector.jar in local Maven Repository =============



Problem: This jar is not in Maven. So we need to install it locally in our Maven Repo,
so that other projects can reference it as a Maven Dependency



https://stackoverflow.com/questions/1164043/maven-how-to-include-jars-which-are-not-available-in-reps-into-a-j2ee-project



Steps:
----------- 

1. Download the required Jar
2. Open Terminal
3. cd to the directory which contains the Jar (Downloads Folder?)
4. Run the below command

###################################

mvn install:install-file -Dfile=pCloudy-java-connector-11.0.3-jar-with-dependencies.jar -DgroupId=pCloudy-java-connector -DartifactId=pCloudy-java-connector -Dversion=11.0.3 -Dpackaging=jar

###################################

5. Once the above step is completed and the jar is installed in your Maven, please add the following dependancy in your Maven Project

<dependency>
<groupId>pCloudy-java-connector</groupId>
<artifactId>pCloudy-java-connector</artifactId>
<version>11.0.3</version>
</dependency>

6. You should now be able to use the 'Connector' class in your project




