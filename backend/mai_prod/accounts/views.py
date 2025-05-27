from django.shortcuts import render

# Create your views here.
import os
import requests
from dotenv import load_dotenv
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from .serializers import UserRegisterSerializer
from requests.exceptions import RequestException


class RegisterView(APIView):
    def post(self, request):
        try:
            serializer_data = request.data.copy()
            recaptcha_token = serializer_data.pop("recaptcha_token", None)

            if not recaptcha_token:
                return Response(
                    {"error": "Необходим токен reCAPTCHA"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            load_dotenv()
            secret_key = os.getenv("RECAPTCHA_SECRET_KEY")
            if not secret_key:
                return Response(
                    {"error": "Ключ reCAPTCHA не настроен"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            try:
                response = requests.post(
                    "https://www.google.com/recaptcha/api/siteverify",
                    data={
                        "secret": secret_key,
                        "response": recaptcha_token,
                    },
                    timeout=10 
                )
                result = response.json()
            except RequestException as e:
                return Response(
                    {"error": f"reCAPTCHA не подтвержден: {str(e)}"},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE
                )

            if not result.get("success", False):
                return Response(
                    {"error": "Неправильный reCAPTCHA"},
                    status=status.HTTP_403_FORBIDDEN
                )

            serializer = UserRegisterSerializer(data=serializer_data)
            if not serializer.is_valid():
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

            serializer.save()
            return Response(
                {"message": "Пользователь успешно создан"},
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            print(f"Server error: {str(e)}")
            return Response(
                {"error": "Ошибка сервера"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    user = request.user
    return Response({
        'username': user.username,
    })