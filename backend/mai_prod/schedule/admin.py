from django.contrib import admin
# Register your models here.

from .models import GroupLink

@admin.register(GroupLink)
class GroupLinkAdmin(admin.ModelAdmin):
    list_display = ('title', 'url')
    search_fields = ('title', 'url')