from django.db import models
from django.contrib.auth.models import User, AbstractUser

# Create your models here.

class UserProfile(models.Model):

    class Meta:
        verbose_name = 'User profile'
        verbose_name_plural = 'User profiles'
        ordering = ['user']

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    credentials = models.JSONField(
        'credentials',
        null=True,
    )