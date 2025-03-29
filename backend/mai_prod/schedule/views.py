from collections import defaultdict
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404
from schedule.models import GroupLink, Schedule
from django.utils import timezone
from .serializers import ScheduleSerializer
from .utils.normalize_fullname import normalize_fullname

# Create your views here.


class GroupScheduleAPIView(APIView):
    def get(self, request: Request):
        group_name = request.query_params.get("group")
        date_str = request.query_params.get("date")

        if not group_name or not date_str:
            return Response(
                {"error": "Параметры 'group' или 'date' не переданы"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        try:
            input_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response(
                {"error": "Неверный формат 'date', требуется 'YYYY-MM-DD'"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        group = get_object_or_404(GroupLink, group_name=group_name)
        
        start_date = input_date
        end_date = start_date + timedelta(days=14)
        schedule = Schedule.objects.filter(
            group_name=group,
            start_date__date__range=(start_date, end_date)
        )

        serializer = ScheduleSerializer(schedule, many=True)
        grouped_data = defaultdict(defaultdict)
        for item in serializer.data:
            key = item['start_date']
            for item_key in item:
                grouped_data[key][item_key] = item[item_key]
        return Response(grouped_data)


class MetricsAPIView(APIView):
    def get(self, request: Request):
        type = request.query_params.get("type")
        if not type:
            return Response(
                {"error": "Параметр 'type' не передан"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        if type == "group":
            metrics = GroupLink.objects.values_list('group_name', flat=True).distinct()
            metrics = sorted(list(metrics))
        elif type == "teacher":
            metrics = Schedule.objects.values_list('teacher', flat=True).distinct()
            metrics = sorted(list({normalize_fullname(x) for x in metrics if x is not None and not any(char.isdigit() for char in x)}))
        elif type == "place":
            metrics = Schedule.objects.values_list('place', flat=True).distinct()
            metrics = sorted(list({x for x in metrics if x is not None and (any(char == '-' for char in x) or x[0] == '-')}))
        elif type == "week-range":
            metrics = Schedule.objects.values_list('start_date', flat=True).distinct()
            metrics = [min(metrics), max(metrics)]
        return Response(metrics)