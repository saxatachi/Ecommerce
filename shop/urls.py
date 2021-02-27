from rest_framework.routers import DefaultRouter
from .views import UserViewSet,ProductReviewSet,DefaultRecommendationSet
router = DefaultRouter()
router.register(r'',DefaultRecommendationSet,base_name='users')
urlpatterns = router.urls
