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


class RegisterView(APIView):
    def post(self, request):
        serializer_data = request.data
        recaptcha_token = serializer_data.pop("recaptcha_token")
        print(serializer_data)
        serializer = UserRegisterSerializer(data=serializer_data)

        load_dotenv()
        verification_url = "https://www.google.com/recaptcha/api/siteverify"
        response = requests.post(verification_url, {
            "secret": os.getenv("RECAPTCHA_SECRET_KEY"),
            "response": recaptcha_token,
        }, timeout=60000)

        result = response.json()
        print(result)
        if not result.get('success'):
            return Response(result, status=status.HTTP_403_FORBIDDEN)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Пользователь успешно создан'}, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

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