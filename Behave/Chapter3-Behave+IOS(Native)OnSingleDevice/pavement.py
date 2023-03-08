from paver.easy import *
from paver.setuputils import setup
import threading, os, platform

# setup(
#     name = "behave-browserstack",
#     version = "0.1.0",
#     author = "BrowserStack",
#     author_email = "support@browserstack.com",
#     description = ("Behave Integration with BrowserStack"),
#     license = "MIT",
#     keywords = "example behave appium browserstack",
#     url = "https://github.com/browserstack/behave-appium-app-browserstack",
#     packages=['features']
# )

def run_behave_test():
    sh('behave features/first_test.feature')

@task
@consume_nargs(1)
def run(args):
    if args[0] == 'first_test':
        run_behave_test()
    else:
        print("Wrong paver task given")