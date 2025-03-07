from rest_framework import generics
from .models import Marketer
from .serializers import MarketerSerializer


class MarketerList(generics.ListCreateAPIView):
    queryset = Marketer.objects.all()
    serializer_class = MarketerSerializer
