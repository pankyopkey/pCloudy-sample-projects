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
    void DemoApp() {
      $(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept']"))
      .click();
      System.out.println("Accept Button clicked");

      $(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/flightButton']"))
      .click();
      System.out.println("Flight Button clicked");

      $(By.xpath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerfrom']"))
      .click();
      System.out.println("from selected");

      $(By.xpath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Bangalore, India (BLR)']"))
      .click();
      System.out.println("From city selected");

      $(By.xpath("//android.widget.Spinner[@resource-id='com.pcloudy.appiumdemo:id/spinnerto']"))
      .click();
      System.out.println("To selected");

      $(By.xpath("//android.widget.CheckedTextView[@resource-id='android:id/text1' and @text='Pune, India (PNQ)']"))
      .click();
      System.out.println("To city selected");

      $(By.xpath("//android.widget.RadioButton[@resource-id='com.pcloudy.appiumdemo:id/singleTrip']"))
      .click();
      System.out.println("Single Trip Selected");

      $(By.xpath("//android.widget.TextView[@resource-id='com.pcloudy.appiumdemo:id/txtdepart']"))
      .click();
      System.out.println("Depart selected");

      $(By.xpath("//android.widget.Button[@resource-id='android:id/button1' and @text='OK']"))
      .click();
      System.out.println("Ok clicked");

      $(By.xpath("//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/searchFlights']"))
      .click();
      System.out.println("Search flight Button clicked");
    }
  }
