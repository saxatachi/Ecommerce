import os
from oscar.defaults import *
from django.utils.translation import gettext_lazy as _

#BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY = '-05sgp9!deq=q1nltm@^^2cc+v29i(tyybv3v2t77qi66czazj'
DEBUG = True
ALLOWED_HOSTS = ['*']
# OSCARAPI_USERADDRESS_FIELDS = ['id','title','country']
# OSCARAPI_PRODUCT_FIELDS = ["url","upc","id","title",'price','structure','children','rating']
# OSCARAPI_PRODUCT_FIELDS = ['__all__']
# OSCARAPI_PRODUCT_ATTRIBUTE_VALUE_FIELDS= ['product','code','value','name']
# OSCARAPI_CHILDPRODUCTDETAIL_FIELDS = ['url','price','availability']
#OSCARAPI_CHILDPRODUCTDETAIL_FIELDS=['parent','availability','id','url','price','rating']
#OSCARAPI_CHILDPRODUCTDETAIL_FIELDS='__all__'
OSCARAPI_OVERRIDE_MODULES = ["home.mycustomapi"]
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
print(STATIC_ROOT)
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
STATIC_TMP = os.path.join(BASE_DIR, 'static')
os.makedirs(STATIC_TMP, exist_ok=True)
os.makedirs(STATIC_ROOT, exist_ok=True)
MEDIA_URL = '/media/'
#MEDIA_ROOT = r'C:\Users\Michal\django-react-boilerplate\home\media'
STATIC_URL = '/static/'
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'shop',
    'django_filters',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'corsheaders',
    'rest_auth',
    'rest_auth.registration',
    'rest_framework',
    'rest_framework.authtoken',
    'django.contrib.flatpages',

    'oscar',
    'oscar.apps.analytics',
    'oscar.apps.checkout',
    'oscar.apps.address',
    'oscar.apps.shipping',
    'oscar.apps.catalogue',
    'oscar.apps.catalogue.reviews',
    'oscar.apps.partner',
    'oscar.apps.basket',
    'oscar.apps.payment',
    'oscar.apps.offer',
    'oscar.apps.order',
    'oscar.apps.customer',
    'oscar.apps.search',
    'oscar.apps.voucher',
    'oscar.apps.wishlists',
    'oscar.apps.dashboard',
    'oscar.apps.dashboard.reports',
    'oscar.apps.dashboard.users',
    'oscar.apps.dashboard.orders',
    'oscar.apps.dashboard.catalogue',
    'oscar.apps.dashboard.offers',
    'oscar.apps.dashboard.partners',
    'oscar.apps.dashboard.pages',
    'oscar.apps.dashboard.ranges',
    'oscar.apps.dashboard.reviews',
    'oscar.apps.dashboard.vouchers',
    'oscar.apps.dashboard.communications',
    'oscar.apps.dashboard.shipping',
    'oscarapi',
    # 3rd-party apps that oscar depends on
    'widget_tweaks',
    'haystack',
    'treebeard',
    'sorl.thumbnail',
    'django_tables2',
    'oscarapicheckout',
]

MIDDLEWARE = [
    
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'oscar.apps.basket.middleware.BasketMiddleware',
    'django.contrib.flatpages.middleware.FlatpageFallbackMiddleware',
]

ROOT_URLCONF = 'home.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.media',
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'oscar.apps.search.context_processors.search_form',
                'oscar.apps.checkout.context_processors.checkout',
                'oscar.apps.customer.notifications.context_processors.notifications',
                'oscar.core.context_processors.metadata',
                
            ],
        },
    },
]

LANGUAGE_CODE = 'pl'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATICFILES_DIRS = [os.path.join(BASE_DIR, 'build/static')]

# MEDIA_ROOT = r'C:\Users\Michal\django-react-boilerplate\home\media'

SITE_ID = 1

# REST_FRAMEWORK = {
#     'DEFAULT_FILTER_BACKENDS': (
#         'django_filters.rest_framework.DjangoFilterBackend',
        
#     ),
#     'DEFAULT_PERMISSION_CLASSES': (
#         'rest_framework.permissions.AllowAny',
#     ),
    
#     'DEFAULT_AUTHENTICATION_CLASSES': (
#         'rest_framework.authentication.TokenAuthentication',
#     ),
    
# }
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_EMAIL_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'username'
ACCOUNT_EMAIL_VERIFICATION = 'none'
AUTH_USER_MODEL = 'shop.User'
OSCARAPI_USER_FIELDS = ['first_name','last_name','username','email']
OSCAR_ALLOW_ANON_CHECKOUT = True
# REST_AUTH_SERIALIZERS = {
#     'USER_DETAILS_SERIALIZER': 'shop.serializers.UserSerializer',
#     'TOKEN_SERIALIZER': 'shop.serializers.TokenSerializer'
# }
# REST_AUTH_REGISTER_SERIALIZERS = {
#     'REGISTER_SERIALIZER': 'shop.serializers.CustomRegisterSerializer'
# }
HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.simple_backend.SimpleEngine',
    },
}
# SESSION_COOKIE_SAMESITE = None
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = [
    "https://example.com",
    "https://sub.example.com",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:9000",
    "127.0.0.1"
]

OSCAR_DASHBOARD_NAVIGATION += [
    {
        'label': _('Strona administratora'),
        'icon': 'icon-dashboard',
        'url_name': 'admin:index',
        # 'access_fn': lambda user, url_name, url_args, url_kwargs: user.is_staff,
    }
]
OSCAR_DASHBOARD_NAVIGATION += [
    {
        'label': _('Strona administratora'),
        'icon': 'icon-dashboard',
        'url_name': 'admin:index',
        # 'access_fn': lambda user, url_name, url_args, url_kwargs: user.is_staff,
    }
]
OSCAR_DASHBOARD_NAVIGATION += [
    {
        'label': 'Domyślne Produkty',
        'icon': 'icon-dashboard',
        'children': [
            {
                'label': _('Domyślne produkty'),
                'url_name': 'admin:index',
            },
         ]
        
        # 'access_fn': lambda user, url_name, url_args, url_kwargs: user.is_staff,
    }
]
# Needed by oscarapicheckout
ORDER_STATUS_PENDING = 'Pending'
ORDER_STATUS_PAYMENT_DECLINED = 'Payment Declined'
ORDER_STATUS_AUTHORIZED = 'Authorized'

# Other statuses
ORDER_STATUS_SHIPPED = 'Shipped'
ORDER_STATUS_CANCELED = 'Canceled'

# Pipeline Config
OSCAR_INITIAL_ORDER_STATUS = ORDER_STATUS_PENDING
OSCARAPI_INITIAL_ORDER_STATUS = ORDER_STATUS_PENDING
OSCAR_ORDER_STATUS_PIPELINE = {
    ORDER_STATUS_PENDING: (ORDER_STATUS_PAYMENT_DECLINED, ORDER_STATUS_AUTHORIZED, ORDER_STATUS_CANCELED),
    ORDER_STATUS_PAYMENT_DECLINED: (ORDER_STATUS_AUTHORIZED, ORDER_STATUS_CANCELED),
    ORDER_STATUS_AUTHORIZED: (ORDER_STATUS_SHIPPED, ORDER_STATUS_CANCELED),
    ORDER_STATUS_SHIPPED: (),
    ORDER_STATUS_CANCELED: (),
}

OSCAR_INITIAL_LINE_STATUS = ORDER_STATUS_PENDING
OSCAR_LINE_STATUS_PIPELINE = {
    ORDER_STATUS_PENDING: (ORDER_STATUS_SHIPPED, ORDER_STATUS_CANCELED),
    ORDER_STATUS_SHIPPED: (),
    ORDER_STATUS_CANCELED: (),
}
API_ENABLED_PAYMENT_METHODS = [
    {
        'method': 'oscarapicheckout.methods.Cash',
        'permission': 'oscarapicheckout.permissions.StaffOnly',
    },
    # {
    #     'method': 'some.other.methods.CreditCard',
    #     'permission': 'oscarapicheckout.permissions.Public',
    # },
]