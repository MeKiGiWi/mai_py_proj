from django.db import models
from django.contrib.auth.models import User, AbstractUser

# Create your models here.

class UserProfile(models.Model):
    class Meta:
        ordering = ['user']

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    credentials = models.JSONField(
        'credentials',
        null=True,
    )


class CustomUser(AbstractUser):

    class Meta:
        verbose_name = 'Custom user'
        verbose_name_plural = 'Custom users'

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name="customuser_set",
        related_query_name="customuser",
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name="customuser_set",
        related_query_name="customuser",
    )    

    credentials = models.JSONField(
        'credentials',
        null=True,
    )