from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from core.abstract.serializers import AbstractSerializer
from core.camera.models import Camera
from core.user.models import User


class CameraSerializer(AbstractSerializer):
    owner = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id')

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        return instance

    class Meta:
        model = Camera
        # List of all the fields that can be included in a
        # request or a response
        fields = ['id', 'owner', 'name', 'model', 'location', 'status', 'broadcast',
                  'created', 'updated']
