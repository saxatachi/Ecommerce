from rest_framework.routers import DefaultRouter
from shop.views import AddressViewSet
router = DefaultRouter()
router.register(r'', AddressViewSet,base_name='address')
urlpatterns = router.urls
