from rest_framework import serializers
from .models import Schedule, GroupLink


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupLink
        fields = ['group_name']

class ScheduleSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group_name.group_name')
    class Meta:
        model = Schedule
        fields = [
            'group_name',
            'lesson_name',
            'lesson_type',
            'teacher',
            'place',
            'start_date'
        ]