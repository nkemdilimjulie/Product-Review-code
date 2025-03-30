from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    favorite_mobiles = serializers.StringRelatedField(many=True)

    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "name", "favorite_mobiles"]
