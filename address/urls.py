from rest_framework.routers import DefaultRouter
from shop.views import AddressViewSet,UserViewSet
router = DefaultRouter()
router.register(r'', UserViewSet,base_name='users')
urlpatterns = router.urls
