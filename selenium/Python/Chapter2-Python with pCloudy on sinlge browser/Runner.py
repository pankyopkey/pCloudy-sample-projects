import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys



class LTAutomate(unittest.TestCase):
 
    def setUp(self):
        
        desired_cap = {
            'os' : "Windows", 
            'osVersion' : "8.1",
            'browserVersion' :  "84",
            'browserName': 'chrome',
            "clientName": "your Email ID", 
            "apiKey": "your Api key",
            "email": "your Email ID",
            
        }

        url = "https://prod-browsercloud-in.pcloudy.com/seleniumcloud/wd/hub"
        
       
        self.driver = webdriver.Remote(
            desired_capabilities=desired_cap,
            command_executor= url
        )

    
    def test_search_in_google(self):
       
        driver = self.driver
        print("Driver initiated sucessfully.  Navigate url")
        driver.get("https://www.google.com")

        print("Searching pcloudy on google.com ")
        time.sleep(8)
        elem = driver.find_element_by_name("q")
        elem.send_keys("pcloudy.com")
        elem.submit()

        print("Printing title of current page :"+driver.title)
        print("Requesting to mark test : pass")

    
    def tearDown(self):
        """
        Quit selenium driver
        """
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
