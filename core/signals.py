from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from core.camera.models import Camera
from core.license_plate.models import LicensePlate


@receiver(post_save, sender=Camera)
@receiver(post_delete, sender=Camera)
def update_user_cameras(sender, instance, **kwargs):
    user = instance.owner
    user.total_cameras = Camera.objects.filter(owner=user).count()
    user.save()


@receiver(post_save, sender=LicensePlate)
@receiver(post_delete, sender=LicensePlate)
def update_user_license_plates(sender, instance, **kwargs):
    user = instance.camera.owner
    user.total_license_plates = LicensePlate.objects.filter(camera__owner=user).count()
    user.save()
