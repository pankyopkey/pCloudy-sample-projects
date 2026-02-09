# DualDriver Appium + Selenium TestNG with pCloudy

This project initializes both a pCloudy **Selenium** (browser) driver and a pCloudy **Appium** (device/app) driver at test startup, stores them in **ThreadLocal** for thread-safe access, and lets test methods use either driver via `DriverManager.getSeleniumDriver()` or `DriverManager.getAppiumDriver()`.

## Prerequisites

- Java 8+
- Maven 3.x
- pCloudy account (for Selenium cloud browser and Appium cloud device)

## Setup

1. **pCloudy credentials**
   - **Selenium (browser)**: In `pCloudySeleniumDriver.java`, replace `"Enter-Email"`, `"Enter-ApiKey"`, and `"Enter-Client-name"` in the `createDriver()` call (or when calling the overloaded `createDriver(userName, accessKey, clientName, ...)` from `BaseRunner`).
   - **Appium (device)**: In `pCloudyAppiumDriver.java`, replace `"Enter your email-id"` and `"Enter your API Key"` (or pass them into `createAndroidDriver(userName, apiKey)` from `BaseRunner`).

2. **App for Appium**
   - The Appium flow uses the pCloudy demo app `pCloudyAppiumDemo.apk`. Ensure it is uploaded to your pCloudy app repository or use the same app name your account has.

## How to run

From the project root:

```bash
mvn test
```

Or run the suite via your IDE using `testng.xml`.

## Project structure

| File | Purpose |
|------|--------|
| `DriverManager.java` | ThreadLocal storage and getters for Selenium and Appium drivers; `removeDrivers()` for teardown |
| `pCloudySeleniumDriver.java` | Builds pCloudy `RemoteWebDriver` for browser testing |
| `pCloudyAppiumDriver.java` | Builds pCloudy `AppiumDriver` (Android) for device/app testing |
| `BaseRunner.java` | `@BeforeMethod`: create both drivers and set in DriverManager; `@AfterMethod`: quit both and remove from ThreadLocal |
| `DualDriverTest.java` | Sample tests using `getSeleniumDriver()` and/or `getAppiumDriver()` |
| `testng.xml` | TestNG suite for `DualDriverTest` |

## Using the drivers in tests

- Extend `BaseRunner` so drivers are created and stored before each test method.
- In a test method:
  - **Selenium only**: `WebDriver driver = DriverManager.getSeleniumDriver();` then use `driver.get(...)`, `driver.findElement(...)`, etc.
  - **Appium only**: `AppiumDriver driver = DriverManager.getAppiumDriver();` then use `driver.findElement(By.xpath(...))`, etc.
  - **Both**: Call both getters and use each driver where needed (e.g. open a URL with Selenium, then perform app actions with Appium).

## ThreadLocal

Each TestNG thread has its own Selenium and Appium driver instances. When you switch to `parallel="methods"` or `parallel="tests"` in `testng.xml`, ThreadLocal keeps drivers isolated per thread and avoids cross-thread use.
