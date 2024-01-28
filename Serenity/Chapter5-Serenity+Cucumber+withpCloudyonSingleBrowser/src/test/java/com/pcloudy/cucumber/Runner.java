package com.pcloudy.cucumber;

import com.pcloudy.pcloudySerenityTest;
import cucumber.api.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(features = "src/test/resources/features/pcloudyDemo.feature")
public class Runner extends pcloudySerenityTest {
}
