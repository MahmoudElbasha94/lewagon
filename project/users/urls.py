from django.urls import path
from users.views import CustomTokenObtainPairView, StudentOnlyView, InstructorOnlyView, LogoutView
from .views import CustomTokenObtainPairView, RegisterView, UserProfileView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('student-only/', StudentOnlyView.as_view(), name='student_only'),
    path('instructor-only/', InstructorOnlyView.as_view(), name='instructor_only'),
    path('api/profile/', UserProfileView.as_view(), name='user_profile'),
]
