package runner;

import org.testng.annotations.Test;
import cucumber.api.CucumberOptions;
import cucumber.api.testng.AbstractTestNGCucumberTests;

@CucumberOptions(features = { "src//test//java//features" }, 
				 glue = { "stepdefinations", "utility" }, 
				 plugin = { "pretty", "html:target/cucumber" }, 
				 tags = { "@appium" })

@Test
public class RunTest extends AbstractTestNGCucumberTests {
 //cucumber framework will execute this from the above defined @CucumberOptions annotations
}
