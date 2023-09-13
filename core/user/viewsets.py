from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from core.abstract.viewsets import AbstractViewSet
from core.user.serializers import UserSerializer, ChangePasswordSerializer
from core.user.models import User
from core.auth.permissions import UserProfilePermission


class UserViewSet(AbstractViewSet):
    http_method_names = ('patch', 'get', 'delete', 'put')
    permission_classes = (IsAuthenticated, UserProfilePermission)
    serializer_class = UserSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.exclude(is_superuser=True)

    def get_object(self):
        obj = User.objects.get_object_by_public_id(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if old_password and new_password:
            if not instance.check_password(old_password):
                return Response({'old_password': 'Old password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

            instance.set_password(new_password)
            instance.save()

        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)






