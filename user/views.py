from django.shortcuts import render
from .serializers import UserSerializer,RegisterSerializer,UserCreateSerializer,ChangePasswordSerializer
from rest_framework import viewsets
from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from rest_framework.response import Response
from oscarapi.utils.settings import overridable
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView,UpdateAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import logout
User = get_user_model()
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def get(self,request,format=None):
        print(request.user)

class Logout(APIView):
    def get(self, request, format=None):
        # using Django logout
        logout(request)
        return Response(status=status.HTTP_200_OK)
class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    def create(self,request,*args,**kwargs):
        user = User.objects.create(username =request.data['username'],email=request.data['email'],password =request.data['password'],first_name = request.data['first_name'],last_name = request.data['last_name'] )
        print(request.data['email'])
        print(username =request.data['username'])
        serializer = RegisterSerializer(user,many=False)
        return Response(serializer.data)
    def post(self, request, format=None):
        pass
@api_view(['POST',])
def registration_view(request):    
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['response'] = "sucesfully registered a new user"
            data['email'] = user.email
            data['username'] = user.username
        else:
            data = serializer.errors
        return Response(data)
    
@api_view(['POST'])
def hello_world(request):
    return Response({"message": "Hello, world!"})
    @classmethod
    def get_extra_actions(cls):
        return []
class UserCreateAPIView(CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()
    @classmethod
    def get_extra_actions(cls):
        return []

from rest_framework.permissions import IsAuthenticated   

class ChangePasswordView(UpdateAPIView):
        """
        An endpoint for changing password.
        """
        serializer_class = ChangePasswordSerializer
        model = User
        permission_classes = (IsAuthenticated,)

        def get_object(self, queryset=None):
            obj = self.request.user
            print(obj)
            return obj

        def update(self, request, *args, **kwargs):
            self.object = self.get_object()
            print("obiekt")
            print(self.object)
            serializer = self.get_serializer(data=request.data)
            print("serializer")
            print(serializer)
            if serializer.is_valid():
                # Check old password
                if not self.object.check_password(serializer.data.get("old_password")):
                    return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
                # set_password also hashes the password that the user will get
                self.object.set_password(serializer.data.get("new_password"))
                self.object.save()
                response = {
                    'status': 'success',
                    'code': status.HTTP_200_OK,
                    'message': 'Password updated successfully',
                    'data': []
                }

                return Response(response)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)