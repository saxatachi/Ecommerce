from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.urls import include, path
from django.contrib import admin
from django.apps import apps
from shop import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = static (settings.MEDIA_URL, document_root = settings.MEDIA_ROOT) + [
    # path('api/', include(apps.get_app_config("oscarapicheckout").urls[0])), # Must be before oscar_api.urls
    path('api-auth/', include('shop.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('user/',include('user.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('items/',include('items.urls')),
    path('admin/', admin.site.urls),
    path('default/',include('shop.urls')),
    path('address/',include('address.urls')),
    path('ratings/',include('ratings.urls')),
    path('default/',views.DefaultRecommendationSet.as_view({'get': 'list'})),
    path('adres/',views.AddressViewSet.as_view()),
    path('it/',views.ItemListView.as_view()),
    path('charge/',views.charge,name="charge"),
    path('success/<str:args>/',views.successMsg,name="success"),
    path('i18n/', include('django.conf.urls.i18n')),
    path('', include(apps.get_app_config('oscar').urls[0])),
    path("api/", include("oscarapi.urls"),name='api'),
    path('paypal/',views.paypal,name="paypal"),
    path('paypalcapture/',views.paypalcapture,name="paypal"),
    path('api/user/',include("user.urls"),name='registration'),
    
    
    # path("api/", include("oscarapi.urls")),
    
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]
# + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)


