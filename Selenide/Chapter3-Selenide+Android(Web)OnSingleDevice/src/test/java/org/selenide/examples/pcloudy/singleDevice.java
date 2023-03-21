  package org.selenide.examples.pcloudy;

  import com.codeborne.selenide.Configuration;
  import com.codeborne.selenide.WebDriverRunner;
  import org.junit.jupiter.api.BeforeEach;
  import org.junit.jupiter.api.Test;
  import org.openqa.selenium.By;
  import org.openqa.selenium.support.events.AbstractWebDriverEventListener;

  import static com.codeborne.selenide.Condition.text;
  import static com.codeborne.selenide.Selenide.$;
  import static com.codeborne.selenide.Selenide.closeWebDriver;
  import static com.codeborne.selenide.Selenide.open;
  import java.io.*;

  
  public class singleDevice {

    @BeforeEach
    void setUp() {
      closeWebDriver();
      Configuration.browserSize = null;
      Configuration.browser = pcloudyconnection.class.getName();
      WebDriverRunner.addListener(new AbstractWebDriverEventListener() {
      });

      open();
    }

    @Test
    void Chrome() {
      open("https://device.pcloudy.com/login");

        $(By.id("userId"))
        .sendKeys("test@pcloudy.com");
        System.out.println("Username Entered");

        $(By.id("password"))
        .sendKeys("teat@123");;
        System.out.println("Password clicked");

        $(By.id("loginSubmitBtn"))
        .click();
        System.out.println("Click on login");
    }
  }
