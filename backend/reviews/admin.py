from django.contrib import admin
from .models import Reviews, ReviewResponse


@admin.register(Reviews)
class ReviewsAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "phone", "rate", "created_at")
    search_fields = ("author__username", "phone__brand", "phone__model")
    list_filter = ("rate", "created_at")


@admin.register(ReviewResponse)
class ReviewResponseAdmin(admin.ModelAdmin):
    list_display = ("id", "review", "response_text")
