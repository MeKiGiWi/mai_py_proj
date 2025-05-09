from collections import defaultdict
from datetime import datetime, timedelta
from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from schedule.models import GroupLink, Schedule, UserSchedule, Notes
from .serializers import ScheduleSerializer, NoteSerializer
from .utils.normalize_fullname import normalize_fullname
from rest_framework.decorators import (
    api_view,
    permission_classes,
)

# Create your views here.

class ScheduleAPIView(APIView):
    permission_classes = [IsAuthenticated]

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
        
        start_date = input_date
        end_date = start_date + timedelta(days=14)
        
        query = Q(start_date__range=(start_date, end_date))

        # query filter
        if 'group_name' in params:
            group_id = get_object_or_404(GroupLink, group_name=params['group_name'])
            query &= Q(group_name_id__exact=group_id)

        if 'teacher' in params:
            query &= Q(teacher__iexact=params['teacher'])
        
        if 'place' in params:
            query &= Q(place__iexact=params['place'])
        
        grouped_data = defaultdict(dict)

        schedule = Schedule.objects.filter(query).order_by('start_date') # get schedule_data by filter
        serializer = ScheduleSerializer(schedule, many=True)
        for event in serializer.data:
            event_date = event['start_date']
            grouped_data[event_date] = event

        user_schedule = UserSchedule.objects.filter(query & Q(user_id=request.user.id)).order_by('start_date') # get userschedule_data by filter
        if user_schedule.exists():
            serializer = ScheduleSerializer(user_schedule, many=True)
            for event in serializer.data:
                event_date = event['start_date']
                grouped_data[event_date] = event # if we need to rewrite data
                # grouped_data[key].update( 
                #     {key: value for key, value in item.items() if value is not None}
                # )  # if we need to update data

            sorted_dates = sorted(grouped_data.keys())
            sorted_events = {event_date: grouped_data[event_date] for event_date in sorted_dates}


        return Response(sorted_events)


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


class NotesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request): # get notes by date and user
        date_str = request.query_params.get('date')

        if not date_str:
            return Response(
                {"error": "Параметр 'date' не передан"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        try:
            start_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response(
                {"error": "Неверный формат 'date', требуется 'YYYY-MM-DD'"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        end_date = start_date + timedelta(days=14)

        grouped_data = defaultdict(dict)

        notes = Notes.objects.filter(
            Q(note_date__range=(start_date, end_date)) 
            & Q(user_id=request.user.id)
        ).order_by('note_date') # get notes on 2 next weeks after start date

        if notes.exists():
            serializer = NoteSerializer(notes, many=True)
            for note in serializer.data:
                note_date = note['note_date']
                note_content = note['note_content']
                grouped_data[note_date] = note_content


        return Response(grouped_data)


    # def delete(self, request: Request): # delete note by exact time and user, if exists
    #     date_str = request.query_params.get('date')

    #     if not date_str:
    #         return Response(
    #             {"error": "Параметр 'date' не передан"},
    #             status=status.HTTP_400_BAD_REQUEST,
    #         )
        
    #     try:
    #         start_date = datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S')
    #     except ValueError:
    #         return Response(
    #             {"error": "Неверный формат 'date', требуется 'YYYY-MM-DD HH:MM:SS'"},
    #             status=status.HTTP_400_BAD_REQUEST,
    #         )

    #     note = get_object_or_404(Notes, note_date=start_date, user=request.user)
    #     note.delete()


    #     return Response(
    #         {"message": f"Заметка на {date_str} успешно удалена"},
    #         status=status.HTTP_200_OK
    #     )


    # def put(self, request: Request):
    #     pass

    # def post(self, request: Request):
    #     pass

    # def patch(self, request: Request):
    #     pass