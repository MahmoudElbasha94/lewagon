from django.urls import path
from . import views
from .api.api import CourseDetailView, InstructorCourseListView, CourseCreateView, AllCoursesView
from .api.payment_api import PaymentListCreateAPIView
from .views import PayPalCaptureAPIView
urlpatterns = [
    path('all/', AllCoursesView.as_view(), name='all_courses'),
    path('course/<slug:slug>/', CourseDetailView.as_view(), name='course_detail'),
    path('instructor/courses/', InstructorCourseListView.as_view(), name='instructor_courses'),
    path('instructor/add-course/', CourseCreateView.as_view(), name='add_course'),
    path('api/payments/', PaymentListCreateAPIView.as_view(), name='api_payments'),
    path('paypal/capture/', PayPalCaptureAPIView.as_view(), name='paypal-capture'),
]