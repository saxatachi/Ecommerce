from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from .models import User,Item,Address,DefaultRecommendation
from rest_framework.authtoken.models import Token
from oscar.core.loading import get_model
from oscarapi.serializers.utils import (
    OscarModelSerializer,
    OscarHyperlinkedModelSerializer,
    UpdateListSerializer,
    UpdateForwardManyToManySerializer,
)
ProductReview = get_model("reviews", "ProductReview")
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('street_address','apartment_address','country','username')
class UserSerializer(serializers.ModelSerializer):
    address = serializers.StringRelatedField(many=False)
    # address= AddressSerializer()
    class Meta:
        model= User
        fields = ('email','username','password','address')
class CustomRegisterSerializer(RegisterSerializer):
    class Meta:
        model= User
        fields = ('email','username','password')

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model=Token
        fields=('key','user')

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id','title','price','no_of_ratings','avg_rating','discount_price','category','label','slug','description','image')

# class RatingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Rating
#         fields = ('__all__')
class DefaultRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model= DefaultRecommendation
        fields = ('__all__')
    
    @classmethod
    def get_extra_actions(cls):
        return []
class ProductReviewSerializer(OscarHyperlinkedModelSerializer):
    class Meta:
        model = ProductReview
        fields = ("product","title","user","title",'body','score')
