package com.pCloudy.cucumber;

import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

import com.pCloudy.PcloudyTestSerenityTest;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(features = "src/test/resources/features/pcloudyDemo.feature", tags = "@User_Login")
public class ParallelDevice2 extends PcloudyTestSerenityTest {
}
