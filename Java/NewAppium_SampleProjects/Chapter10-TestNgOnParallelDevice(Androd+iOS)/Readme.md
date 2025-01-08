<h1 style="display:flex;flex-direction:row;align-items: center;">
    <a target="_blank" rel="noopener noreferrer" href="https://www.pcloudy.com">
        <img src="../../../images/newpCloudyLogo.webp" style="max-width:100%;">
    </a>
    <span>pCloudy Appium Sample Projects</span>
</h1>

## About [pCloudy](https://www.pcloudy.com)

pCloudy platform provides easy access to a varied range of browsers and their versions directly from your desktop or computer system. You can access different browsers through our Browser Cloud Lab to perform cross-browser testing through Live or Automation Testing of your Web-Apps or websites. You can also integrate our platform with CI for continuous Automation Testing and test your Web-Apps on multiple browser versions with every change of your Web-App.

pCloudy is an expert mobile & web app testing platform integrated with Selenium scripts, which enable you to automate your web testing effortlessly.

Read more [here](https://www.pcloudy.com/scale-cross-browser-testing-with-browser-cloud/?utm_source=topbar&utm_medium=website&utm_term=p&utm_campaign=website).

### Steps to Run the Project

1. Clone the project.
2. Open the `Driver` class file located inside `com.pCloudy.testNG` package and update the following details:
    - `username`
    - `apiKey`
    - `baseUrl`
    - `androidApplicationName`
    - `androidAppPackage`
    - `androidAppactivity`
    - `iosApplicationName`
    - `iosBundleId`
3. Open the terminal.
4. Navigate to the root directory containing the `pom.xml` file.
5. Run the command: `mvn clean`.
6. Run the command: `mvn test`.
7. Another option to run the `Runner` class located inside `com.pCloudy.testNG` using the `testNG` extension

### Additional Information
- Provide the device name and Appium version you want to run in the `testng.xml` file.

For more details, please refer to the [link](https://www.pcloudy.com/docs/running-appium-scripts-2).
