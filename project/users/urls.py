from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    StudentOnlyView, InstructorOnlyView, LogoutView,
    AdminDashboardView, UserAdminViewSet, CustomTokenObtainPairView,
    RegisterView, UserProfileView, UserProfileUpdateView,
    ChangePasswordView, PasswordResetRequestView, PasswordResetConfirmView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # Admin dashboard
    path('api/admin/dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),

    # Authentication & registration
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', LogoutView.as_view(), name='logout'),

    # Profile endpoints
    path('api/profile/', UserProfileView.as_view(), name='user_profile'),
    path('api/profile/update/', UserProfileUpdateView.as_view(), name='profile_update'),
    path('api/change-password/', ChangePasswordView.as_view(), name='change_password'),

    # Password reset
    path('api/reset-password/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('api/reset-password/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    # Role-specific views
    path('api/student-only/', StudentOnlyView.as_view(), name='student_only'),
    path('api/instructor-only/', InstructorOnlyView.as_view(), name='instructor_only'),
]

router = DefaultRouter()
router.register(r'api/admin/users', UserAdminViewSet, basename='admin-users')

urlpatterns += router.urls
