from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views
from .views import (
    CourseDetailView, InstructorCourseListView, CourseCreateView,
    AllCoursesView, CourseUpdateView, CourseDeleteView,
    StudentEnrolledCoursesView, SubmitReviewView, CourseAdminViewSet,
    PaymentAdminViewSet, UpdateProgressView, CertificateView,
    PaymentViewSet, ReviewViewSet, get_categorized_courses,
    MarkLessonCompletedView, EnrollCourseView
)

urlpatterns = [
    path('api/courses/', views.get_categorized_courses, name='get_categorized_courses'),
    path('api/deals/', views.deals, name='deals'),
    path('api/learning-paths/', views.learning_paths, name='learning_paths'),
    path('api/recommendations/', views.recommendations, name='recommendations'),
    path('api/all/', AllCoursesView.as_view(), name='all_courses'),
    path('api/course/<slug:slug>/', CourseDetailView.as_view(), name='course_detail'),
    path('api/instructor/courses/', InstructorCourseListView.as_view(), name='instructor_courses'),
    path('api/instructor/add-course/', CourseCreateView.as_view(), name='add_course'),
    path('api/instructor/edit-course/<int:pk>/', CourseUpdateView.as_view(), name='edit_course'),
    path('api/instructor/delete-course/<int:pk>/', CourseDeleteView.as_view(), name='delete_course'),
    path('api/student/enrolled-courses/', StudentEnrolledCoursesView.as_view(), name='enrolled_courses'),
    path('api/student/review/', SubmitReviewView.as_view(), name='submit-review'),
    path('api/student/update-progress/', UpdateProgressView.as_view(), name='update_progress'),
    path('api/student/certificate/<int:course_id>/', CertificateView.as_view(), name='get_certificate'),
    path('api/student/mark-lesson-completed/', MarkLessonCompletedView.as_view(), name='mark_lesson_completed'),
    path('api/student/enroll/', EnrollCourseView.as_view(), name='enroll_course'),
]

router = DefaultRouter()
router.register('api/admin/courses', CourseAdminViewSet, basename='admin-courses')
router.register('api/admin/payments', PaymentAdminViewSet, basename='admin-payments')
router.register('api/student/payments', PaymentViewSet, basename='student-payments')
router.register('api/admin/reviews', ReviewViewSet, basename='admin-reviews')

urlpatterns += router.urls