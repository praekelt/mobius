from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):

    def handle(self, *args, **options):

        user, created = User.objects.get_or_create(username="admin", is_superuser=1, is_staff=1)
        if created:
            user.set_password("local")
            user.save()
