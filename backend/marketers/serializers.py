from rest_framework import serializers
from .models import Marketer


class MarketerSerializer(serializers.ModelSerializer):
    marketed_mobiles = serializers.StringRelatedField(many=True)

    class Meta:
        model = Marketer
        fields = "__all__"
