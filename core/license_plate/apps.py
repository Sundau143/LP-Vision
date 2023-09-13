from django.apps import AppConfig


class LicensePlateConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core.license_plate'
    label = 'core_license_plate'

    def ready(self):
        import core.signals

