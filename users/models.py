from django.contrib.auth.models import AbstractUser
from django.db import models

# Custom user model
class User(AbstractUser):
    # Add any additional fields you want for the user
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(unique=True)  # Email should be unique

    # Optional: Add a profile picture field
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    # Add any other custom fields for your app, for example:
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    # Override the __str__ method to display a user's username
    def __str__(self):
        return self.username

    # Optionally, add custom methods for user-specific logic
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
