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
from django.db.models import Q 

# Create your views here.


class ScheduleAPIView(APIView):
    def get(self, request: Request):
        params = request.query_params
        date_str = params.get("date")

        if not date_str:
            return Response(
                {"error": "Параметр 'date' не передан"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        try:
            input_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response(
                {"error": "Неверный формат 'date', требуется 'YYYY-MM-DD'"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        required_params = {'group_name', 'teacher', 'place'}
        if not any(param in params for param in required_params):
            return Response(
                {"error": "Должен быть передан хотя бы один параметр помимо 'date'"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        query = Q()
        
        if 'group_name' in params:
            group = get_object_or_404(GroupLink, group_name=params['group_name'])
            query &= Q(group_name=group)
        
        if 'teacher' in params:
            query &= Q(teacher__iexact=params['teacher'])
        
        if 'place' in params:
            query &= Q(place__iexact=params['place'])
        
        start_date = input_date
        end_date = start_date + timedelta(days=14)
        
        schedule = Schedule.objects.filter(
            query,
            start_date__range=(start_date, end_date)
        ).order_by('start_date')

        serializer = ScheduleSerializer(schedule, many=True)
        grouped_data = defaultdict(defaultdict)
        for item in serializer.data:
            key = item['start_date']
            for item_key in item:
                grouped_data[key][item_key] = item[item_key]
        return Response(grouped_data)


class WeeksRangeAPIView(APIView):
    def get(self, request: Request):
        weeks_range = Schedule.objects.values_list('start_date', flat=True).distinct()
        weeks_range = [week.strftime('%Y-%m-%d') for week in weeks_range]
        weeks_range.sort()
        return Response([weeks_range[0], weeks_range[len(weeks_range) - 1]])