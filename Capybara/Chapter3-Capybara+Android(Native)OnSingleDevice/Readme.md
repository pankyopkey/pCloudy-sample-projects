**<font color ="Blue"><h2>Prerequisite and execution of the Test script in Capybara</h2>**</font><br>

1. Need to install Ruby and bundler [Recomended latest version]<br><br>

2. Run the below command to install the required packages which are available in Gemfile  <br><br>

    ```bash 
    bundle install
    ```
5. Enter your "MailId" in ***pCloudy_Username="Enter your Email-id"*** in "features/support/pcloudy.rb".<br><br>
6. Enter your "ApiKey" in ***pCloudy_ApiKey="Enter your API Key"*** in "features/support/pcloudy.rb". <br><br>
6. Open the terminal where the project is located and run the script by running the following command in your terminal :<br><br>
 ```bash 
    bundle exec rake singleDevice
``` 