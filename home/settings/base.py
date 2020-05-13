import os
from oscar.defaults import *
#BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY = '-05sgp9!deq=q1nltm@^^2cc+v29i(tyybv3v2t77qi66czazj'
DEBUG = True
ALLOWED_HOSTS = []
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
STATIC_TMP = os.path.join(BASE_DIR, 'static')
os.makedirs(STATIC_TMP, exist_ok=True)
os.makedirs(STATIC_ROOT, exist_ok=True)
print(BASE_DIR)
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
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
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

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    
}
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_EMAIL_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'username'
ACCOUNT_EMAIL_VERIFICATION = 'none'
AUTH_USER_MODEL = 'shop.User'

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'shop.serializers.UserSerializer',
    'TOKEN_SERIALIZER': 'shop.serializers.TokenSerializer'
}
REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'shop.serializers.CustomRegisterSerializer'
}
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
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:9000",
    "127.0.0.1"
]

