from rest_framework import status
from rest_framework.response import Response
from core.abstract.viewsets import AbstractViewSet
from core.auth.permissions import UserPermission
from core.license_plate.models import LicensePlate
from core.license_plate.serializers import LicensePlateSerializer


class LicensePlateViewSet(AbstractViewSet):
    http_method_names = ('post', 'get', 'put', 'delete', 'patch')
    permission_classes = (UserPermission,)
    serializer_class = LicensePlateSerializer

    queryset = LicensePlate.objects.all()

    def get_queryset(self):
        camera_pk = self.kwargs.get('camera_pk')
        queryset = super().get_queryset()
        queryset = queryset.filter(camera__public_id=camera_pk)
        return queryset

    def get_object(self):
        obj = LicensePlate.objects.get_object_by_public_id(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        # Disallow updating the 'camera' field
        if 'camera' in request.data:
            return Response({'detail': 'Editing of the camera field is not allowed.'}, status=status.HTTP_400_BAD_REQUEST)
        return super().update(request, *args, **kwargs)