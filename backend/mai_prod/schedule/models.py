from django.db import models

# Create your models here.

class GroupLink(models.Model):

    class Meta:
        verbose_name = 'Link to group schedule'       
        verbose_name_plural = 'Links to group schedule'
        ordering = ['group_name'] 

    group_name = models.CharField(
        'group_name', 
        max_length=100
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
        verbose_name = 'Abstract group schedule'
        verbose_name_plural = 'Abstract groups schedule'
        ordering = ['group_name']
        abstract = True


    group_name = models.ForeignKey(
        GroupLink,
        on_delete=models.CASCADE,
        related_name='lessons'  
    )

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

    group_name = models.ForeignKey(
        GroupLink,
        on_delete=models.CASCADE,
        related_name='schedule_lessons'  
    )


class UserSchedule(AbstractSchedule):

    class Meta:
        verbose_name = 'User schedule'
        verbose_name_plural = 'Users schedule'

    user_name = models.CharField(
        'username',
        max_length=100,
        null=True,
    )