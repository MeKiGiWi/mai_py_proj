from django.contrib import admin
# Register your models here.

from .models import GroupLink

@admin.register(GroupLink)
class GroupLinkAdmin(admin.ModelAdmin):
    list_display = ('group_name', 'url')
    search_fields = ('group_name', 'url')