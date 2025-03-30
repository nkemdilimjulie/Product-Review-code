from rest_framework import serializers
from .models import Mobiles


class MobileSerializer(serializers.ModelSerializer):
    marketers = serializers.StringRelatedField(many=True)

    class Meta:
        model = Mobiles
        fields = "__all__"
