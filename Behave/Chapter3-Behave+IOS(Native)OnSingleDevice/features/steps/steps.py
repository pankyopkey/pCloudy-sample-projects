import time
from appium.webdriver.common.mobileby import MobileBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from behave import *


@given(u'The app is launched')
def step_impl(context):
    pass
@then(u'Username Entered')
def step_impl(context):
    search_input = WebDriverWait(context.browser, 30).until(
        EC.element_to_be_clickable((MobileBy.XPATH,"//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]"))
    )
    search_input.send_keys("test@pclody.com")
@then(u'Password Entered')
def step_impl(context):
    search_input = WebDriverWait(context.browser, 30).until(
        EC.element_to_be_clickable((MobileBy.XPATH,"//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]"))
    )
    search_input.send_keys("test1234")
@then(u'Login Button clicked')
def step_impl(context):
    search_input = WebDriverWait(context.browser, 30).until(
        EC.element_to_be_clickable((MobileBy.XPATH,"//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]"))
    )
    search_input.click()

