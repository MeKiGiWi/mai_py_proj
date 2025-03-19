from django.db import models

# Create your models here.

class GroupLink(models.Model):

    class Meta:
        verbose_name = 'Link to group schedule'       
        verbose_name_plural = 'Links to group schedule'
        ordering = ['title'] 

    title = models.CharField(
        'name', 
        max_length=30
    )

    url = models.URLField(
        'url',
        max_length=500,
        null=True,
    )


    def __str__(self):
        return self.title


