from rest_framework.permissions import BasePermission, SAFE_METHODS
from core.camera.models import Camera


class UserPermission(BasePermission):
    def has_object_permission(self, request, view, obj):

        if request.user.is_anonymous:
            return request.method in SAFE_METHODS

        if view.basename in ["camera"]:
            if request.method in ['GET']:
                return bool(request.user.is_superuser or request.user == obj.owner)
            if request.method in ['DELETE', 'PUT', 'POST', 'PATCH']:
                return bool(request.user.is_superuser)

        if view.basename in ["camera-license_plate"]:
            if request.method in ['GET', 'PUT', 'DELETE']:
                return bool(request.user.is_superuser or request.user == obj.camera.owner)
            if request.method in ['POST']:
                return bool(request.user.is_superuser)

            return bool(request.user and request.user.is_authenticated)

        return False

    def has_permission(self, request, view):

        if view.basename in ["camera"]:
            return bool(request.user and request.user.is_authenticated)

        if view.basename in ["camera-license_plate"]:
            camera_pk = view.kwargs.get('camera_pk')
            camera = Camera.objects.get(public_id=camera_pk)
            # extremely dangerous thing
            # TODO change after I figure out, how to manage access tokens on Raspberry
            if request.method in 'POST':
                return True

            if request.method in ['PATCH', 'GET']:
                return bool(request.user.is_superuser or camera.owner == request.user)

            return bool(request.user.is_superuser or request.user and request.user.is_authenticated and camera.owner == request.user)

        if view.basename in ["cameras-by-id"]:
            if request.method in ['GET']:
                return bool(request.user.is_authenticated and request.user.is_superuser)

        return False


class UserProfilePermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if view.basename in ["user"]:
            if request.method in ['GET', 'PUT', 'PATCH']:
                return bool(request.user.is_superuser or request.user == obj)
            if request.method in 'DELETE':
                return bool(request.user.is_superuser)

                return False

    #def has_permission(self, request, view):
    #    if view.basename in ["user"]:
    #        if request.method in 'GET':
    #            return bool(request.user.is_superuser)
