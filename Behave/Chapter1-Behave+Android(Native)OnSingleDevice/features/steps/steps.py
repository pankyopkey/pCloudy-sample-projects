import time
from appium.webdriver.common.mobileby import MobileBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from behave import *
#from hypothesis import given


@given(u'The app is launched')
def step_impl(context):
    pass
@then(u'Clicked accept button')
def step_impl(context):
    search_input = WebDriverWait(context.browser, 30).until(
        EC.element_to_be_clickable((MobileBy.ID, "com.pcloudy.appiumdemo:id/accept"))
    )
    search_input.click()
    time.sleep(5)
    # print("Accept button clicked")
@then(u'Fligt button is clicked')
def step_impl(context):
    search_input = WebDriverWait(context.browser, 30).until(
        EC.element_to_be_clickable((MobileBy.ID, "com.pcloudy.appiumdemo:id/flightButton"))
    )
    search_input.click()
    time.sleep(5)
    # print("Flight button is clicked")
