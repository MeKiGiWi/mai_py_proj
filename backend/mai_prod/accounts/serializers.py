import os
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
import requests


class UserRegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'confirm_password', ]
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data.pop('confirm_password'):
            raise serializers.ValidationError("Пароли не совпадают")
        
        # reCapthca validation
        # verification_url = "https://www.google.com/recaptcha/api/siteverify"
        # response = requests.post(verification_url, {
        #     "secret": os.getenv("RECAPTCHA_SECRET_KEY"),
        #     "response": data['recaptcha_token'],
        # }, timeout=60000)
        # result = response.json()
        # if not result.get('seccess'):
        #     raise serializers.ValidationError("reCaptcha не пройдена!")
        return data

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            password=make_password(validated_data['password'])
        )
        return user