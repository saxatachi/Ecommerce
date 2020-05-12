from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from .models import User,Item,Address,Rating
from rest_framework.authtoken.models import Token

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

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('__all__')
