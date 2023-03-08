import time
from appium.webdriver.common.mobileby import MobileBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from behave import *
from selenium.webdriver.common.by import By
#from hypothesis import given


@given(u'Browser open')
def step_impl(context):
    pass
@then(u'URL open')
def step_impl(context):
    context.browser.get('https://device.pcloudy.com/')
    time.sleep(5)
    

