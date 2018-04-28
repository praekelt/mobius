from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):

    def handle(self, *args, **options):
        from django.contrib.auth import get_user_model()
        user, created = get_user_model().objects.get_or_create(username="admin", is_superuser=1, is_staff=1)
        if created:
            user.set_password("local")
            user.save()
