from threading import Thread
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from concurrent.futures import ThreadPoolExecutor

#Your script will execute on each of the browser, device and OS combinations
caps=[{
            'os' : "Windows", 
            'osVersion' : "8.1",
            'browserVersion' :  "84",
            'browserName': 'chrome',
            "clientName": "sridatta.pani@sstsinc.com", 
            "apiKey": "z4kuNbkRoFB2ZBNJqT",
            "email": "sridatta.pani@sstsinc.com",
      },
      {
             'os' : "Windows", 
            'osVersion' : "8.1",
            'browserVersion' :  "76",
             'browserName': 'firefox',
            "clientName": "sridatta.pani@sstsinc.com", 
            "apiKey": "z4kuNbkRoFB2ZBNJqT",
            "email": "sridatta.pani@sstsinc.com",
      }]	 

#run_session function searches for 'BrowserStack' on google.com
def run_session(desired_cap):
  driver = webdriver.Remote(
      command_executor='https://prod-browsercloud-in.pcloudy.com/seleniumcloud/wd/hub',
      desired_capabilities=desired_cap)
  driver.get("https://www.google.com")
  elem = driver.find_element_by_name("q")
  elem.send_keys("pcloudy")
  elem.submit()
  print(driver.title)
  driver.quit()

#The `ThreadPoolExecutor` function takes `max_workers` as an argument which represents the number of threads in threadpool and execute multiple sessions on each of the thread as and when each session completes execution.
with ThreadPoolExecutor(max_workers=2) as executor:
	executor.map(run_session, caps)

