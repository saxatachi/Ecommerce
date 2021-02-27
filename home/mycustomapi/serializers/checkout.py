from rest_framework import serializers
from oscarapi.serializers import checkout,product
from oscarapi.serializers.checkout import PriceSerializer
from oscar.core.loading import get_class
Selector = get_class("partner.strategy", "Selector")

class CountrySerializer(checkout.CountrySerializer):
    is_benelux_country = serializers.SerializerMethodField()
    def get_is_benelux_country(self, obj):
        return obj.iso_3166_1_a2.lower() in ("nl", "be", "lu")
class ChildProductserializer(product.ChildProductserializer):
    price = serializers.SerializerMethodField()
    availability = serializers.SerializerMethodField()
    class Meta(product.ChildProductserializer):
        fields=('url','price','availability','parent','price')
# class UserAddressSerializer(checkout.UserAddressSerializer):
#     country = serializers.SerializerMethodField()
    
#     class Meta(checkout.UserAddressSerializer.Meta):
#         fields = ('id','title','url')
#     def get_country(self,instance):
#         request = self.context.get("request")
#         strategy = Selector().strategy(request=request, user=request.user)
#         ser = checkout.CountrySerializer(
#             strategy.fetch_for_product(instance).country,
#             context= {'request': request})
#         return ser.data