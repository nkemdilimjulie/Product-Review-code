from django.contrib import admin
from .models import Marketer


@admin.register(Marketer)
class MarketerAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "company", "link")
    search_fields = ("name", "company")
