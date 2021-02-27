from oscar.core.loading import get_class

from rest_framework import serializers
from oscarapi.serializers import checkout, product
from oscarapi.utils.settings import overridable
from oscar.core.loading import get_model
from oscarapi.serializers.utils import (
    OscarModelSerializer,
    OscarHyperlinkedModelSerializer,
    UpdateListSerializer,
    UpdateForwardManyToManySerializer,
)
Product = get_model("catalogue", "Product")
ProductReview = get_model("reviews", "ProductReview")
Selector = get_class("partner.strategy", "Selector")

class ProductReviewSerializer(OscarHyperlinkedModelSerializer):
    # reviews = serializers.HyperlinkedIdentityField(view_name="users")
    class Meta:
        model = ProductReview
        fields = ("product","title","user","total_votes","score","body")

class ChildProductSerializer(product.ChildProductserializer):
    price = serializers.SerializerMethodField()
    availability = serializers.SerializerMethodField()
    reviews = ProductReviewSerializer(many=True)
    class Meta(product.ChildProductserializer.Meta):
        fields=('url','title','id','price','availability','recommended_products','reviews','parent','images')
    def get_price(self, instance):
        request = self.context.get("request")
        strategy = Selector().strategy(request=request, user=request.user)

        ser = checkout.PriceSerializer(
            strategy.fetch_for_product(instance).price,
            context={'request': request})
        return ser.data
    def get_availability(self,instance):
        request = self.context.get("request")
        strategy = Selector().strategy(request=request, user=request.user)
        ser = product.AvailabilitySerializer(
            strategy.fetch_for_product(instance).availability,
            context={'request': request}
        )
        return ser.data
class ProductLinkSerializer(product.ProductLinkSerializer):
    price = serializers.SerializerMethodField() 
    availability = serializers.SerializerMethodField()
    children = ChildProductSerializer(many=True, required=False)
    reviews = ProductReviewSerializer(many=True)
    
    class Meta(product.ProductLinkSerializer.Meta):
        fields = ('url','id','children','categories','price','parent','title','attributes','reviews','options','images','description','structure','availability','recommended_products')
        
    def get_price(self, instance):
        request = self.context.get("request")
        strategy = Selector().strategy(request=request, user=request.user)

        ser = checkout.PriceSerializer(
            strategy.fetch_for_product(instance).price,
            context={'request': request})
        return ser.data
    
    def get_availability(self,instance):
        request = self.context.get("request")
        strategy = Selector().strategy(request=request, user=request.user)
        ser = product.AvailabilitySerializer(
            strategy.fetch_for_product(instance).availability,
            context={'request': request}
        )
        return ser.data


class OptionSerializer(product.OptionSerializer):
    class Meta(product.OptionSerializer.Meta):
        fields= ('url','name')

# class ProductAttributeValueSerializer(product.ProductAttributeValueSerializer):
#     pop = serializers.SerializerMethodField()
#     code = serializers.SerializerMethodField()
#     class Meta(product.ProductAttributeValueSerializer.Meta):
#         fields=('name','code','pop')
#     def get_pop(self,instance):
#         return 10
#     def get_code(self,instance):
#         return 4

#class BaseProductSerializer(product.BaseProductSerializer):
    # "Base class shared by admin and public serializer"
    # attributes = ProductAttributeValueSerializer(
    #     many=True, required=False, source="attribute_values"
    # )
    # product = serializers.
    # proba = serializers.SerializerMethodField()
    # categories = product.CategoryField(many=True, required=False)
    # product_class = serializers.SlugRelatedField(
    #     slug_field="slug", queryset=product.ProductClass.objects, allow_null=True
    # )
    # options = OptionSerializer(many=True, required=False)
    # recommended_products = serializers.HyperlinkedRelatedField(
    #     view_name="product-detail",
    #     many=True,
    #     required=False,
    #     queryset=Product.objects.filter(
    #         structure__in=[Product.PARENT, Product.STANDALONE]
    #     ),
    # )
    # def proba(self, instance):
    #     return 18
    # def validate(self, attrs):
    #     if "structure" in attrs and "parent" in attrs:
    #         if attrs["structure"] == Product.CHILD and attrs["parent"] is None:
    #             raise serializers.ValidationError("child without parent")
    #     if "structure" in attrs and "product_class" in attrs:
    #         if attrs["product_class"] is None and attrs["structure"] != Product.CHILD:
    #             raise serializers.ValidationError(
    #                 ("product_class can not be empty for structure %(structure)s")
    #                 % attrs
    #             )

    #     return super(BaseProductSerializer, self).validate(attrs)

    # class Meta:
    #     fields = ('__all__')


# class ProductAttributeSerializer(product.ProductAttributeSerializer):
#     url = serializers.HyperlinkedIdentityField(
#         view_name="admin-productattribute-detail"
#     )
#     pop = serializers.SerializerMethodField()
#     class Meta(product.ProductAttributeSerializer.Meta):
#         fields=('pop','url') 
#     def get_pop(self,instance):
#         return 10
class ProductSerializer(product.ProductSerializer):
    "Serializer for public api with strategy fields added for price and availability"
    url = serializers.HyperlinkedIdentityField(view_name="product-detail")
    price = serializers.SerializerMethodField() 
    availability = serializers.SerializerMethodField() 
    reviews = ProductReviewSerializer(many=True)
    # images = ProductImageSerializer(many=True, required=False)
    # children = ChildProductserializer(many=True, required=False)

    stockrecords = serializers.HyperlinkedIdentityField(
        view_name="product-stockrecords", read_only=True
    )
    def get_price(self, instance):
        request = self.context.get("request")
        strategy = Selector().strategy(request=request, user=request.user)

        ser = checkout.PriceSerializer(
            strategy.fetch_for_product(instance).price,
            context={'request': request})
        return ser.data
    
    def get_availability(self,instance):
        request = self.context.get("request")
        strategy = Selector().strategy(request=request, user=request.user)
        ser = product.AvailabilitySerializer(
            strategy.fetch_for_product(instance).availability,
            context={'request': request}
        )
        return ser.data



    class Meta(product.ProductSerializer.Meta):
        
        fields = overridable(
            "OSCARAPI_PRODUCTDETAIL_FIELDS",
            default=(
                "url",
                "upc",
                "id",
                "title",
                "reviews",
                "description",
                "structure",
                "date_created",
                "date_updated",
                "recommended_products",
                "attributes",
                "categories",
                "product_class",
                "images",
                "price",
                "availability",
                "stockrecords",
                "options",
                "children",
                "parent",
                "categories"
            ),
        )

