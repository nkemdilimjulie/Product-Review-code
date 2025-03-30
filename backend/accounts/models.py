from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    """Accounts: One-To-Many with Reviews"""
    name = models.CharField(max_length=100, null=True, blank=True)
    favorite_mobiles = models.ManyToManyField(
        "mobiles.Mobiles", related_name="fans"
    )  # Many-to-Many

    def __str__(self):
        return self.username
