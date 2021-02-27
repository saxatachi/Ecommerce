from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from oscarapi.utils.settings import overridable
User = get_user_model()

def field_length(fieldname):
    field = next(field for field in User._meta.fields if field.name == fieldname)
    return field.max_length

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = overridable(
            "OSCARAPI_USER_FIELDS", default=(User.USERNAME_FIELD, "id", "date_joined")
        )
class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(
         max_length=field_length(User.USERNAME_FIELD), required=True
     )
    first_name = serializers.CharField(
         max_length=field_length(User.USERNAME_FIELD), required=True
     )
    last_name = serializers.CharField(
         max_length=field_length(User.USERNAME_FIELD), required=True
     )
    email = serializers.EmailField()
    password = serializers.CharField(max_length=field_length("password"), required=True)
    password2 = serializers.CharField(max_length=field_length("password"), required=True)

    class Meta:
        model=User
        fields= ['__all__']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def save(self):
        user = User(
            first_name = self.validated_data['first_name'],
            last_name = self.validated_data['last_name'],
            email=self.validated_data['email'],
            username = self.validated_data['username'],

        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError("Nie działa")
        user.set_password(password)
        user.save()
        return user
class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'email'
        ]

class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)