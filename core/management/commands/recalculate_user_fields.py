from django.core.management.base import BaseCommand
from core.user.models import User


class Command(BaseCommand):
    help = 'Recalculates the total_cameras and total_license_plates fields for all users'

    def handle(self, *args, **options):
        for user in User.objects.all():
            user.total_cameras = user.camera_set.count()
            user.total_license_plates = sum(camera.licenseplate_set.count() for camera in user.camera_set.all())
            user.save()

        self.stdout.write(self.style.SUCCESS('Fields recalculated successfully for all users.'))
