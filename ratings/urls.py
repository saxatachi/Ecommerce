from rest_framework.routers import DefaultRouter
from shop.views import RatingViewSet,UserViewSet
router = DefaultRouter()
router.register(r'', RatingViewSet,base_name='rating')
urlpatterns = router.urls
