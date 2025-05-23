from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser, User

# Create your models here.

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


class GroupLink(models.Model):

    class Meta:
        verbose_name = 'Link to group schedule'       
        verbose_name_plural = 'Links to group schedule'
        ordering = ['group_name'] 

    group_name = models.CharField(
        'group_name', 
        max_length=100,
    )

    url = models.URLField(
        'url',
        max_length=500,
        null=True,
    )

    def __str__(self):
        return self.group_name


class AbstractSchedule(models.Model):

    class Meta:
        ordering = ['group_name']
        abstract = True

    week = models.IntegerField(
        'week',
        blank=False,
    )

    lesson_name = models.CharField(
        'lesson_name',
        max_length=300,
    )

    lesson_type = models.CharField(
        'lesson_type',
        max_length=100,
    )

    teacher = models.CharField(
        'teacher',
        max_length=300,
        null=True,
    )

    place = models.CharField(
        'place',
        max_length=300,
        null=True,
    )

    start_date = models.DateTimeField(
        'start_date',
    )


class Schedule(AbstractSchedule):

    class Meta:
        verbose_name = 'Group schedule'
        verbose_name_plural = 'Groups schedule'
        ordering = ['group_name']


    group_name = models.ForeignKey(
        GroupLink,
        on_delete=models.CASCADE,
        related_name='lessons', 
    )


class Notes(models.Model):

    class Meta:
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='notes',
    )

    note_content = models.TextField(
        'note_content',
        max_length=300,
    )

    note_date = models.DateTimeField(
        'note_date',
    )


class UserSchedule(AbstractSchedule):

    class Meta:
        verbose_name = 'User schedule'
        verbose_name_plural = 'Users schedule'
        ordering = ['user']

    group_name = models.ForeignKey(
        GroupLink,
        on_delete=models.CASCADE,
        related_name='custom_lessons',
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='schedules',
    )