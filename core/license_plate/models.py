from uuid import uuid4

from django.db import models
from core.abstract.models import AbstractModel, AbstractManager
from lpr_backend import settings
import os


class LicensePlateManager(AbstractManager):
    pass


#def upload_to(instance, filename):
#    camera_uuid = instance.camera.public_id
#    folder_path = os.path.join('license_plates', camera_uuid)
#    unique_filename = f'{uuid4().hex}.{filename.split(".")[-1]}'
#    return os.path.join(folder_path, unique_filename)


class LicensePlate(AbstractModel):
    camera = models.ForeignKey(to="core_camera.Camera", on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    region = models.CharField(max_length=255)
    edited = models.BooleanField(default=False)
    #frame = models.ImageField(upload_to=upload_to, default=settings.MEDIA_URL + 'default_images/default_lp.png')
    frame = models.ImageField(upload_to='media/license_plates/', default=settings.MEDIA_URL+'default_images/default_lp.png')

    objects = LicensePlateManager()

    def __str__(self):
        return f"{self.camera.name}"

    class Meta:
        db_table = "'core.license_plate'"
