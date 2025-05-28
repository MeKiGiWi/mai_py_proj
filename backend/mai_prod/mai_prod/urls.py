"""
URL configuration for mai_prod project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from accounts.views import RegisterView, get_current_user
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView,
)
from schedule.views import (
    ScheduleAPIView,
    MetricsAPIView,
    NotesAPIView,
    CycledEventsAPIView,
)
from google_services.views import GoogleAuthAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/me/', get_current_user, name='current_user'),
    path('api/metrics/', MetricsAPIView.as_view(), name='metrics'),
    path('api/schedule/', ScheduleAPIView.as_view(), name='schedule'),
    path('api/notes/', NotesAPIView.as_view(), name='notes'),
    path("api/cycled/", CycledEventsAPIView.as_view(), name="cycled"),
    path('api/google/auth/', GoogleAuthAPIView.as_view(), name='google_auth'),
]
