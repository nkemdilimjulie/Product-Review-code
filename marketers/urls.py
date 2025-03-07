from django.urls import path
from .views import MarketerList

urlpatterns = [
    path("", MarketerList.as_view(), name="marketer-list"),
]
