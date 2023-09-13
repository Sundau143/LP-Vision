from rest_framework import status, viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from core.abstract.viewsets import AbstractViewSet
from core.auth.permissions import UserPermission
from core.camera.models import Camera
from core.camera.serializers import CameraSerializer
from core.user.models import User


class CameraViewSet(AbstractViewSet):
    http_method_names = ('post', 'get', 'put', 'delete', 'patch')
    permission_classes = (UserPermission,)
    serializer_class = CameraSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            queryset = Camera.objects.all()
        else:
            queryset = Camera.objects.filter(owner=user.id)
        return queryset

    def get_object(self):
        obj = Camera.objects.get_object_by_public_id(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

