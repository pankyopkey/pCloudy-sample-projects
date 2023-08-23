# Behave Test Script Setup and Execution Guide

## Prerequisites

1. **Install Python and PIP:** Ensure you have the latest versions of Python and PIP installed.

2. **Create a Virtual Environment:** Set up a virtual environment using [venv](https://docs.python.org/3/library/venv.html).

3. **Copy Files:** Copy all project files into the virtual environment directory.

4. **Install Dependencies:** Install required dependencies with:

```
pip install -r requirements.txt
```
## Configuration

1. **Personal Info:** In "config.json", replace placeholders with your details:

   - `pCloudy_Username`: Your email address.
   - `pCloudy_ApiKey`: Your API key.

## Running the Test

Execute the JEST test script:

1. Navigate to the project directory in the terminal.

2. Run:

```bash 
paver run SingleDevice
``````
