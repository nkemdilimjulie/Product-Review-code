from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ("username", "email", "password")

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    favorite_mobiles = serializers.StringRelatedField(many=True)

    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "name", "favorite_mobiles"]
