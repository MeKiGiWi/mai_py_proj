from collections import defaultdict
from datetime import datetime, timedelta
from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from schedule.models import GroupLink, Schedule, UserSchedule, Notes, CycledEvents
from .serializers import ScheduleSerializer, NoteSerializer, CycledEventsSerializer
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
            input_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return Response(
                {"error": "Неверный формат 'date', требуется 'YYYY-MM-DD'"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        required_params = {"group_name", "teacher", "place"}
        if not any(param in params for param in required_params):
            return Response(
                {"error": "Должен быть передан хотя бы один параметр помимо 'date'"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        start_date = input_date
        end_date = start_date + timedelta(days=14)

        query = Q(start_date__range=(start_date, end_date))

        # query filter
        if "group_name" in params:
            group_id = get_object_or_404(GroupLink, group_name=params["group_name"])
            query &= Q(group_name_id__exact=group_id)

        if "teacher" in params:
            query &= Q(teacher__iexact=params["teacher"])

        if "place" in params:
            query &= Q(place__iexact=params["place"])

        grouped_data = defaultdict(dict)

        schedule = Schedule.objects.filter(query).order_by(
            "start_date"
        )  # get schedule_data by filter
        serializer = ScheduleSerializer(schedule, many=True)
        for event in serializer.data:
            event_date = event["start_date"]
            grouped_data[event_date] = event

        user_schedule = UserSchedule.objects.filter(
            query & Q(user_id=request.user.id)
        ).order_by(
            "start_date"
        )  # get userschedule_data by filter
        if user_schedule.exists():
            print("EXIST")
            serializer = ScheduleSerializer(user_schedule, many=True)
            for event in serializer.data:
                event_date = event["start_date"]
                grouped_data[event_date] = event  # if we need to rewrite data
                # grouped_data[key].update(
                #     {key: value for key, value in item.items() if value is not None}
                # )  # if we need to update data

            grouped_data = dict(sorted(grouped_data.items()))
            print(grouped_data, "DATA")

        # Обработка циклических событий
        # for event in CycledEvents.objects.filter(query & Q(user_id=request.user.id)):
        #     interval = timedelta(weeks=1) if event.every_week else timedelta(weeks=2)
        #     current_date = event.start_date

        #     # Пропускаем события вне диапазона
        #     if current_date > end_date:
        #         continue

        #     # Находим первое вхождение в диапазоне
        #     if current_date < start_date:
        #         delta = start_date - current_date
        #         intervals = delta // interval
        #         if delta % interval != timedelta(0):
        #             intervals += 1
        #         current_date += interval * intervals

        #     # Генерируем все вхождения в диапазоне
        #     while current_date <= end_date:
        #         event_data = {
        #             "start_date": current_date,
        #             "teacher": event.teacher,
        #             "place": event.place,
        #             "lesson_name": event.lesson_name,
        #             "lesson_type": event.lesson_type,
        #             "group_name": event.group_name.group_name,
        #         }
        #         grouped_data[current_date] = event_data
        #         current_date += interval

        return Response(grouped_data)

    def patch(self, request: Request):
        """Принимает json {date: yyyy-mm-ddThh:mm:ssZ, group_name: string, teacher: string, place: string, lesson_type: string, lesson_name: stirng,}
        и записывает такую строку в UserSchedule с флагом deleted=false"""
        params = request.data["data"]
        required_params = {
            "date",
            "group_name",
            "teacher",
            "place",
            "lesson_type",
            "lesson_name",
        }

        if not all(param in params.keys() for param in required_params):
            print(params.keys(), "НЕ ПУСКАЕТ")
            return Response(
                {
                    "error": "Необходимы все параметры: date, group_name, teacher, place, lesson_type, lesson_name"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Валидация даты
        try:
            date_str_utc = params.get("date")
            date_str_utc = date_str_utc.replace(".000Z", "Z", 1).replace("Z", "+0000")
            input_date = datetime.strptime(date_str_utc, "%Y-%m-%dT%H:%M:%S%z")
        except ValueError:
            return Response(
                {"error": "Неверный формат даты"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Поиск группы
        try:
            group = GroupLink.objects.get(group_name=params["group_name"])
        except GroupLink.DoesNotExist:
            return Response(
                {"error": "Группа не найдена"},
                status=status.HTTP_404_NOT_FOUND,
            )
        params = {param: None if x == "" else x for param, x in params.items()}
        query = (
            Q(start_date=input_date)
            & Q(teacher__iexact=params["teacher"])
            & Q(group_name=group)
            & Q(place__iexact=params["place"])
            & Q(lesson_type__iexact=params["lesson_type"])
            & Q(lesson_name__iexact=params["lesson_name"])
        )

        schedule = Schedule.objects.filter(query)

        if not schedule:
            user_schedule, created = UserSchedule.objects.update_or_create(
                user=request.user,
                week=0,
                group_name=group,
                start_date=input_date,  # Уникальный ключ
                defaults={
                    "teacher": params["teacher"],
                    "place": params["place"],
                    "lesson_type": params["lesson_type"],
                    "lesson_name": params["lesson_name"],
                    "deleted": False,  # Сбрасываем флаг удаления
                },
            )
        return Response(
            {"status": "Запись добавлена/обновлена"}, status=status.HTTP_200_OK
        )

    def delete(self, request: Request):
        """Принимает json {date: yyyy-mm-ddThh:mm:ssZ, group_name: string, teacher: string, place: string, lesson_type: string, lesson_name: stirng,}
        и записывает такую строку в UserSchedule с флагом deleted=true"""
        params = request.data
        required_params = {
            "date",
            "group_name",
            "teacher",
            "place",
            "lesson_type",
            "lesson_name",
        }
        print(params)

        # Проверка параметров
        if not all(param in params.keys() for param in required_params):
            return Response(
                {
                    "error": "Необходимы все параметры: date, group_name, teacher, place, lesson_type, lesson_name"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Валидация даты
        try:
            date_str_utc = params.get("date")
            date_str_utc = date_str_utc.replace(".000Z", "+0000", 1)
            input_date = datetime.strptime(date_str_utc, "%Y-%m-%dT%H:%M:%SZ")
            # input_date = datetime.strptime(date_str_utc, "%Y-%m-%dT%H:%M:%S%z")
        except ValueError:
            return Response(
                {"error": "Неверный формат даты"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Поиск группы
        try:
            group = GroupLink.objects.get(group_name=params["group_name"])
        except GroupLink.DoesNotExist:
            return Response(
                {"error": "Группа не найдена"},
                status=status.HTTP_404_NOT_FOUND,
            )
        params = {param: None if x == "" else x for param, x in params.items()}

        query = (
            Q(start_date=input_date)
            & Q(teacher__iexact=params["teacher"])
            & Q(group_name=group)
            & Q(place__iexact=params["place"])
            & Q(lesson_type__iexact=params["lesson_type"])
            & Q(lesson_name__iexact=params["lesson_name"])
        )

        schedule = Schedule.objects.filter(query)

        if schedule:

            user_schedule, created = UserSchedule.objects.update_or_create(
                user=request.user,
                group_name=group,
                week=0,
                teacher=params["teacher"],
                place=params["place"],
                start_date=input_date,
                lesson_type=params["lesson_type"],
                lesson_name=params["lesson_name"],
                defaults={"deleted": True},
            )

            return Response(
                {"status": "Запись помечена как удаленная"}, status=status.HTTP_200_OK
            )

        user_schedule_object = get_object_or_404(
            UserSchedule,
            user=request.user,
            group_name=group,
            teacher=params["teacher"],
            place=params["place"],
            start_date=input_date,
            lesson_type=params["lesson_type"],
            lesson_name=params["lesson_name"],
        )
        user_schedule_object.delete()
        return Response(
            {"status": "Запись не удалена, её нет в Schedule"},
            status=status.HTTP_200_OK,
        )


class MetricsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        type = request.query_params.get("type")
        if not type:
            return Response(
                {"error": "Параметр 'type' не передан"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if type == "group":
            metrics = GroupLink.objects.values_list("group_name", flat=True).distinct()
            custom_metrics = UserSchedule.objects.filter(
                user=request.user,
            )
            custom_metrics.values_list("group_name", flat=True).distinct()
            metrics = sorted(
                list(
                    set(
                        list(metrics)
                        + list(x.group_name.group_name for x in custom_metrics)
                    )
                )
            )
        elif type == "teacher":
            metrics = Schedule.objects.values_list("teacher", flat=True).distinct()
            custom_metrics = UserSchedule.objects.filter(
                user=request.user,
            )
            custom_metrics.values_list("teacher", flat=True).distinct()
            metrics = sorted(
                list(
                    set(
                        list(
                            {
                                normalize_fullname(x)
                                for x in metrics
                                if x is not None
                                and not any(char.isdigit() for char in x)
                            }
                        )
                        + list(x.teacher for x in custom_metrics)
                    )
                )
            )
        elif type == "place":
            metrics = Schedule.objects.values_list("place", flat=True).distinct()
            custom_metrics = UserSchedule.objects.filter(
                user=request.user,
            )
            custom_metrics.values_list("place", flat=True).distinct()
            metrics = sorted(
                list(
                    set(
                        [
                            x
                            for x in metrics
                            if x is not None
                            and (any(char == "-" for char in x) or x[0] == "-")
                        ]
                        + list(x.place for x in custom_metrics)
                    )
                )
            )
        elif type == "week-range":
            metrics = Schedule.objects.values_list("start_date", flat=True).distinct()
            metrics = [min(metrics), max(metrics)]

        return Response(metrics)


class NotesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):  # get notes by date and user
        date_str = request.query_params.get("date")

        # date validation
        if not date_str:
            return Response(
                {"error": "Параметр 'date' не передан"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            start_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return Response(
                {"error": "Неверный формат 'date', требуется 'YYYY-MM-DD'"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # get notes on 2 next weeks after start date
        end_date = start_date + timedelta(days=14)

        grouped_data = defaultdict(dict)

        notes = Notes.objects.filter(
            note_date__range=(start_date, end_date), user_id=request.user.id
        ).order_by("note_date")

        # get notes in our time period
        if notes.exists():
            serializer = NoteSerializer(notes, many=True)
            for note in serializer.data:
                note_date = note["note_date"]
                note_content = note["note_content"]
                grouped_data[note_date] = note_content

        return Response(grouped_data)

    def delete(self, request: Request):  # delete note by exact time and user, if exists
        date_str = request.query_params.get("date")

        # date validation
        if not date_str:
            return Response(
                {"error": "Параметр 'date' не передан"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            start_date = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
        except ValueError:
            return Response(
                {"error": "Неверный формат 'date', требуется 'yyyy-mm-ddThh:mm:ssZ'"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # delete note if exists
        note = get_object_or_404(Notes, note_date=start_date, user=request.user)
        note.delete()

        return Response(
            {"message": f"Заметка на {date_str} успешно удалена"},
            status=status.HTTP_200_OK,
        )

    def put(self, request: Request):  # create new note or change old note on exact time
        date_str = request.data.get("date")

        # date validation
        if not date_str:
            return Response(
                {"error": "Параметр 'date' не передан"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            note_date = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")
        except ValueError:
            return Response(
                {"error": "Неверный формат 'date', требуется 'yyyy-mm-ddThh:mm:ssZ'"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        note_content = request.data.get("note_content")

        # note_content validation
        if not note_content:
            return Response(
                {"error": "Параметр 'note_content' не передан"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:  # check if note on this date exists
            note = Notes.objects.get(user=request.user, note_date=note_date)
            note.note_content = note_content
            note.save()

            return Response(
                {"message": f"Заметка на {date_str} успешно обновлена"},
                status=status.HTTP_200_OK,
            )
        except Notes.DoesNotExist:
            # create new note on this date
            note = Notes.objects.create(
                user=request.user,
                note_date=note_date,
                note_content=note_content,
            )

            return Response(
                {"message": f"Заметка на {date_str} успешно создана"},
                status=status.HTTP_201_CREATED,
            )


class CycledEventsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request: Request):
        # Получаем данные из тела запроса
        data = request.query_params

        # Добавляем текущего пользователя в данные
        data["user"] = request.user.id

        # Валидация обязательных полей
        required_fields = [
            "group_name",
            "teacher",
            "place",
            "lesson_name",
            "lesson_type",
            "start_date",
            "every_week",
        ]

        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return Response(
                {
                    "error": f"Отсутствуют обязательные поля: {', '.join(missing_fields)}"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            date_str_utc = data["date"].replace("Z", "+0000")
            input_date = datetime.strptime(date_str_utc, "%Y-%m-%dT%H:%M:%S%z")
        except ValueError:
            return Response(
                {"error": "Неверный формат даты"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Проверка существования группы
        try:
            group = GroupLink.objects.get(id=data["group"])
        except (GroupLink.DoesNotExist, ValueError):
            return Response(
                {"error": "Указанная группа не найдена"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Создание циклического события
        try:
            event = CycledEvents.objects.create(
                user=request.user,
                group_name_id=group,
                teacher=data["teacher"],
                place=data["place"],
                lesson_name=data["lesson_name"],
                lesson_type=data["lesson_type"],
                start_date=input_date,
                every_week=data["every_week"],
            )
        except Exception as e:
            return Response(
                {"error": f"Ошибка создания события: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        # Сериализация результата
        serializer = CycledEventsSerializer(event)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
