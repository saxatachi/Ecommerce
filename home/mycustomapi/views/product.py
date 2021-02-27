from rest_framework import generics
from rest_framework.response import Response

from oscar.core.loading import get_class, get_model

from oscarapi.utils.categories import find_from_full_slug
from oscarapi.utils.loading import get_api_classes, get_api_class
from ..serializers.product import ProductLinkSerializer
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response

# from oscarapi.serializers import UserSerializer


# Selector = get_class("partner.strategy", "Selector")
# (
#     CategorySerializer,
#     ProductLinkSerializer,
#     ProductSerializer,
#     ProductStockRecordSerializer,
#     AvailabilitySerializer,
# ) = get_api_classes(
#     "serializers.product",
#     [
#         "CategorySerializer",
#         "ProductLinkSerializer",
#         "ProductSerializer",
#         "ProductStockRecordSerializer",
#         "AvailabilitySerializer",
#     ],
# )

PriceSerializer = get_api_class("serializers.checkout", "PriceSerializer")


__all__ = ("ProductList", "ProductDetail", "ProductPrice", "ProductAvailability")

Product = get_model("catalogue", "Product")
Category = get_model("catalogue", "Category")
StockRecord = get_model("partner", "StockRecord")

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductLinkSerializer

    def get_queryset(self):
        """
        Allow filtering on structure so standalone and parent products can
        be selected separately, eg::
            http://127.0.0.1:8000/api/products/?structure=standalone
        or::
            http://127.0.0.1:8000/api/products/?structure=parent
        """
        qs = super(ProductList, self).get_queryset()
        structure = self.request.query_params.get("structure")
        categories = self.request.query_params.get("categories")
        title = self.request.query_params.get("title")
        parent = self.request.query_params.get("parent")
        if categories is not None:
            category = Category.objects.all()
            fil = category.filter(name = categories)
            aha =Product.objects.filter().values('categories')
            return qs.filter(categories=fil[0].id)

        return qs
        

