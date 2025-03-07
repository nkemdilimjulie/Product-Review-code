from django.contrib import admin
from .models import Mobiles


@admin.register(Mobiles)
class MobilesAdmin(admin.ModelAdmin):
    list_display = ("ean", "brand", "model", "description")
    search_fields = ("brand", "model", "ean")
    filter_horizontal = ("marketers",)  # For Many-to-Many fields
