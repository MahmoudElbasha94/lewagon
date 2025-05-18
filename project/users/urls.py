from django.urls import path
from rest_framework.routers import DefaultRouter
from users.views import CustomTokenObtainPairView, StudentOnlyView, InstructorOnlyView, LogoutView
from .views import  AdminDashboardView, UserAdminViewSet, CustomTokenObtainPairView, RegisterView, UserProfileView, UserProfileUpdateView, ChangePasswordView, PasswordResetRequestView, PasswordResetConfirmView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('api/admin/dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('student-only/', StudentOnlyView.as_view(), name='student_only'),
    path('instructor-only/', InstructorOnlyView.as_view(), name='instructor_only'),
    path('api/profile/', UserProfileView.as_view(), name='user_profile'),
    path('api/profile/update/', UserProfileUpdateView.as_view(), name='profile_update'),
    path('api/change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('api/reset-password/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('api/reset-password/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
]

router = DefaultRouter()
router.register(r'admin/users', UserAdminViewSet, basename='admin-users')

urlpatterns += router.urls
