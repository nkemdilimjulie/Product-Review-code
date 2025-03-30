from rest_framework import generics
from .models import Reviews
from .serializers import ReviewSerializer


class ReviewList(generics.ListCreateAPIView):
    queryset = Reviews.objects.all()
    serializer_class = ReviewSerializer
