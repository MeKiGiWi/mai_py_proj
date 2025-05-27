from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.conf import settings
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from google.auth.transport import requests as google_requests
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
import requests
from jwt import encode
from django.conf import settings
from django.contrib.auth.models import User
from transliterate import translit
import os


# Create your views here.

class GoogleAuthAPIView(APIView):
    def post(self, request: Request):
        # access token validation
        access_token = request.data.get('access_token')
        if not access_token:
            return Response({"error": "Access token required"}, status=status.HTTP_401_UNAUTHORIZED)
        
        response = requests.get(
            "https://oauth2.googleapis.com/tokeninfo",
            params={'access_token': access_token},
        )
        if response.status_code != 200:
            return Response({'error': 'Invalid token'}, status=status.HTTP_403_FORBIDDEN)
        
        access_token_info = response.json()
        if 'error' in access_token_info:
            return Response({'error': access_token_info['error']}, status=status.HTTP_403_FORBIDDEN)
        if access_token_info.get('aud') != os.getenv("GOOGLE_OAUTH_CLIENT_ID"):
            return Response({'error': 'Invalid client ID'}, status=status.HTTP_403_FORBIDDEN)

        # get user data
        user_data = requests.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            headers={'Authorization': f'Bearer {access_token}'}
        ).json()
        
        # create new custom user
        user, created = User.objects.get_or_create(
            email=user_data['email'],
            defaults={
                'first_name': translit(user_data.get('given_name', ''), language_code='ru', reversed=True).replace('ë', 'e'),
                'last_name': translit(user_data.get('family_name', ''), language_code='ru', reversed=True).replace('ë', 'e'),
                'username': translit(user_data.get('given_name', ''), language_code='ru', reversed=True).replace('ë', 'e'),
            }
        )

        # getting jwt token



        return Response({'google_access_token':  " aksjdfhjk"}, status=status.HTTP_201_CREATED)