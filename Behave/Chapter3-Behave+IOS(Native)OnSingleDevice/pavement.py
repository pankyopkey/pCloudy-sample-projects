from paver.easy import *
from paver.setuputils import setup
import threading, os, platform


def run_behave_test():
    sh('behave features/first_test.feature')

@task
@consume_nargs(1)
def run(args):
    if args[0] == 'first_test':
        run_behave_test()
    else:
        print("Wrong paver task given")