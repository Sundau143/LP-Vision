from django.conf.urls.static import static
from django.urls import path
from rest_framework import routers
from rest_framework_nested import routers
from core.auth.viewsets import RefreshViewSet
from core.auth.viewsets.register import RegisterViewSet
from core.auth.viewsets.login import LoginViewSet
from core.user.viewsets import UserViewSet
from core.camera.viewsets import CameraViewSet
from core.license_plate.viewsets import LicensePlateViewSet

router = routers.SimpleRouter()

# ##############################################
# ################### USER #####################
# ##############################################

router.register(r'user', UserViewSet, basename='user')

# ##############################################
# ################### AUTH #####################
# ##############################################

router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# ##############################################
# ################## CAMERA ####################
# ##############################################

router.register(r'camera', CameraViewSet, basename='camera')
cameras_router = routers.NestedSimpleRouter(router, r'camera', lookup='camera')
cameras_router.register(r'license_plate', LicensePlateViewSet, basename='camera-license_plate')


# ##############################################
# ############## LICENSE PLATE #################
# ##############################################


urlpatterns = [
    *router.urls,
    *cameras_router.urls,
]



