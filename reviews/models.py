from django.db import models
from django.conf import settings
from mobiles.models import Mobiles


class Reviews(models.Model):
    """Reviews: One-To-One and One-To-Many"""
    RATE_CHOICES = [(i, str(i)) for i in range(1, 6)]

    phone = models.ForeignKey(Mobiles, on_delete=models.CASCADE)  # One-to-Many
    body = models.TextField(max_length=500, blank=True, null=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL
    )  # One-to-Many
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    rate = models.IntegerField(choices=RATE_CHOICES, default=1)
    seller = models.CharField(max_length=50, null=True)
    price = models.PositiveIntegerField(blank=True, null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["author", "phone"], name="unique_review_per_author"
            )
        ]

    def __str__(self):
        return f"Review by {self.author} on {self.phone}"


class ReviewResponse(models.Model):
    review = models.OneToOneField(Reviews, on_delete=models.CASCADE)
    response_text = models.TextField()

    def __str__(self):
        return f"Response to Review {self.review.id}: {self.response_text[:50]}..."  # Shows first 50 characters of response
