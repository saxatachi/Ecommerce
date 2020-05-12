from rest_framework.routers import DefaultRouter
from shop.views import ItemViewSet,UserViewSet
router = DefaultRouter()
router.register(r'',ItemViewSet,base_name='items')
urlpatterns = router.urls
