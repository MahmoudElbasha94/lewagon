from django.contrib import admin
from django.urls import path
from django.contrib.auth import get_user_model

# استيراد الــ JWT views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView
)

# استيراد الــ RegisterView من تطبيق users
from users.views import RegisterView

urlpatterns = [
    path('admin/', admin.site.urls),

    # تسجيل مستخدم جديد
    path('api/register/', RegisterView.as_view(), name='register'),

    # تسجيل دخول (إصدار Access و Refresh tokens)
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # تجديد الـ Access Token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # تسجيل خروج (blacklist الـ Refresh token)
    path('api/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
]
