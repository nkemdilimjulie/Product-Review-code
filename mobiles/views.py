from rest_framework import generics
from .models import Mobiles
from .serializers import MobileSerializer


class MobileList(generics.ListCreateAPIView):
    queryset = Mobiles.objects.all()
    serializer_class = MobileSerializer
