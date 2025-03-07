from django.urls import path
from .views import MobileList

urlpatterns = [
    path("", MobileList.as_view(), name="mobile-list"),
]
