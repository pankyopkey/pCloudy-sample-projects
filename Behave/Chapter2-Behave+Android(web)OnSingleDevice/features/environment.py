from appium import webdriver
import os, json

config_file_path = os.path.join(os.path.dirname(__file__), '..', "config.json")
print("Path to the config file = %s" % (config_file_path))
with open(config_file_path) as config_file:
    CONFIG = json.load(config_file)



def before_feature(context, feature):
    desired_capabilities = CONFIG['capabilities']
    context.browser = webdriver.Remote(
        desired_capabilities=desired_capabilities,
        command_executor="https://device.pcloudy.com/appiumcloud/wd/hub"
    )

def after_feature(context, feature):
    # Invoke driver.quit() after the test is done to indicate to BrowserStack 
    # that the test is completed. Otherwise, test will appear as timed out on BrowserStack.
    context.browser.quit()