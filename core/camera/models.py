from django.db import models
from core.abstract.models import AbstractModel, AbstractManager


class CameraManager(AbstractManager):
    pass


class Camera(AbstractModel):
    owner = models.ForeignKey(to="core_user.User",
                              on_delete=models.CASCADE)

    name = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=30)
    broadcast = models.CharField(max_length=255)

    objects = CameraManager()

    def __str__(self):
        return f"{self.owner.name}"

    class Meta:
        db_table = "'core.camera'"
