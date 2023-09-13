from rest_framework import serializers
from core.abstract.serializers import AbstractSerializer
from core.license_plate.models import LicensePlate
from core.camera.models import Camera


class LicensePlateSerializer(AbstractSerializer):
    camera = serializers.SlugRelatedField(queryset=Camera.objects.all(), slug_field='public_id')

    def update(self, instance, validated_data):
        if not instance.edited:
            validated_data['edited'] = True

        validated_data.pop('camera', None)

        instance = super().update(instance, validated_data)
        return instance


    class Meta:
        model = LicensePlate
        # List of all the fields that can be included in a
        # request or a response
        fields = ['id', 'camera', 'text', 'country', 'region', 'frame',
                  'created', 'updated']

        read_only_fields = ["edited", "camera"]



