from django.core.management.base import BaseCommand
import subprocess

class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('app_name', nargs='+', type=str)

    def handle(self, *args, **options):
        callString = "cd %s && npm run build" % options["app_name"][0]
        try:
            subprocess.check_call(callString, shell=True)
        except subprocess.CalledProcessError:
            print "Error: specified app name does not exist"
