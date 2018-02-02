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




