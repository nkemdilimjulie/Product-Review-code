from django.db import models


class Marketer(models.Model):
    """Marketers: One-To-Many with Mobiles"""
    name = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    link = models.CharField(max_length=255)

    def __str__(self):
        return self.name
