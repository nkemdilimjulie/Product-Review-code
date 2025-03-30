from rest_framework import generics
from .models import Marketer
from .serializers import MarketerSerializer
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render


class MarketerList(generics.ListCreateAPIView):
    queryset = Marketer.objects.all()
    serializer_class = MarketerSerializer

# @csrf_protect
# def my_view(request):
#     if request.method == "POST":
#         # Process your POST request here
#         pass
#     return render(request, 'your_template.html')
