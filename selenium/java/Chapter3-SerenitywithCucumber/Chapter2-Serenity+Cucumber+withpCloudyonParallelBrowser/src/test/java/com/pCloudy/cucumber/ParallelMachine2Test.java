package com.pCloudy.cucumber;

import cucumber.api.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

import com.pCloudy.PcloudyTestSerenityTest;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(features = "src/test/resources/features/pcloudyDemo.feature")
public class ParallelMachine2Test extends PcloudyTestSerenityTest {
}
