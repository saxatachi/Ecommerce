from rest_framework.routers import DefaultRouter
from shop.views import UserViewSet,ProductReviewSet
# RatingViewSet,

router = DefaultRouter()
router.register(r'', ProductReviewSet,base_name='rating')
urlpatterns = router.urls
