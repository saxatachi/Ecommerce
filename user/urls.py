from .views import UserViewSet,RegisterViewSet,UserCreateAPIView,hello_world,registration_view,Logout,ChangePasswordView
from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from shop.views import UserViewSet
urlpatterns = [
     
# url(r'^register/$',UserCreateAPIView.as_view(),name='register')
    url(r'^register/$',registration_view,name='register'),
    url(r'^logout/', Logout.as_view()),
    url(r'^change/',ChangePasswordView.as_view()),
    path('current/',UserViewSet,name='current')
]
# nie ruszac tego
# from rest_framework import routers
# router = routers.DefaultRouter()
# router.register('',UserViewSet)
# # router.register('register',UserCreateAPIView.as_view(),basename='register1')
# urlpatterns = router.urls