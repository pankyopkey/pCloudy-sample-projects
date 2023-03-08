**<font color ="skyblue"><h2>Prerequisite and execution of the Test script in Behave</h2>**</font><br>

1. Need to install Python and PIP [Recomended latest version]<br><br>
2. Create a Virtual Environmrnt <a href="https://docs.python.org/3/library/venv.html">venv</a><br><br>
3. Copy all the file in the venv directory<br><br>
4. Run the following command to install all the dependencies <br><br>
    ```
    pip install -r requirement.txt
    ```
    <br>
5. Enter your "MailId" in ***pCloudy_Username="Enter your Email-id"*** in "config.json".<br><br>
6. Enter your "ApiKey" in ***pCloudy_ApiKey="Enter your API Key"*** in "config.json". <br><br>
6. Open the terminal where the project is located and run the script by running the following command in your terminal :<br><br>
    ```
    paver run SingleDevice
    ``` 