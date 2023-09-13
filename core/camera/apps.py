from django.apps import AppConfig

class CameraConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core.camera'
    label = 'core_camera'

    def ready(self):
        import core.signals
