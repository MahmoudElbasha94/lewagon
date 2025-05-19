# courses/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
from django.core.exceptions import PermissionDenied
from rest_framework.generics import UpdateAPIView, DestroyAPIView, ListAPIView
from django.utils.timezone import now

from rest_framework import permissions
from .models import Course, Enrollment, Student, Review, Payment
from .serializers import CourseSerializer, ReviewCreateSerializer, PaymentSerializer, ReviewSerializer
from users.permissions import IsStudent, IsInstructor, IsAdmin

from courses import serializers

class AllCoursesView(APIView):
    permission_classes = []
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

class CourseDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, slug):
        try:
            course = Course.objects.annotate(
                students_count=Count('enrollment')
            ).get(slug=slug)

            user = request.user

            course_data = CourseSerializer(course).data
            course_data['students_count'] = course.students_count

            if user.is_student:
                return Response(course_data)

            elif user.is_instructor:
                if course.instructor == user:
                    enrolled_students = Student.objects.filter(enrollment__course=course).values('user__username', 'user__email')
                    course_data['enrolled_students'] = list(enrolled_students)
                return Response(course_data)

            else:
                return Response(
                    {"error": "Invalid user type."},
                    status=status.HTTP_403_FORBIDDEN
                )

        except Course.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

class InstructorCourseListView(APIView):
    permission_classes = [IsAuthenticated, IsInstructor]

    def get(self, request):
        courses = Course.objects.filter(instructor=request.user)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

class CourseCreateView(APIView):
    permission_classes = [IsAuthenticated, IsInstructor]

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(instructor=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseUpdateView(UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated, IsInstructor]

    def perform_update(self, serializer):
        course = self.get_object()
        if course.instructor != self.request.user:
            raise PermissionDenied("You can only edit your own courses.")
        serializer.save()

class CourseDeleteView(DestroyAPIView):
    queryset = Course.objects.all()
    permission_classes = [IsAuthenticated, IsInstructor]

    def perform_destroy(self, instance):
        if instance.instructor != self.request.user:
            raise PermissionDenied("You can only delete your own courses.")
        instance.delete()

class StudentEnrolledCoursesView(ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated, IsStudent]

    def get_queryset(self):
        student = self.request.user.student_profile 
        enrollments = Enrollment.objects.filter(student=student)
        return Course.objects.filter(id__in=enrollments.values_list('course_id', flat=True))

class SubmitReviewView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def post(self, request):
        serializer = ReviewCreateSerializer(data=request.data)
        if serializer.is_valid():
            student = request.user.student_profile
            course = serializer.validated_data['course']

            is_enrolled = Enrollment.objects.filter(student=student, course=course).exists()
            if not is_enrolled:
                return Response({'error': 'You are not enrolled in this course.'}, status=403)
            
            if Review.objects.filter(student=student, course=course).exists():
                return Response({'error': 'You have already submitted a review for this course.'}, status=400)
            
            Review.objects.create(student=student, course=course, date=now().date(), rating=serializer.validated_data['rating'], comment=serializer.validated_data['comment'])
            return Response({'message': 'Review submitted successfully.'}, status=201)

        return Response(serializer.errors, status=400)
class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
        


class CourseAdminViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

class PaymentAdminViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser or user.is_admin:
            return Payment.objects.all()
        elif user.is_student:
            return Payment.objects.filter(enrollment__student=user.student_profile)
        return Payment.objects.none()

    

class UpdateProgressView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def post(self, request):
        course_id = request.data.get("course_id")
        progress = request.data.get("progress") 

        if not (0 <= float(progress) <= 100):
            return Response({'error': 'Progress must be between 0 and 100'}, status=400)

        try:
            student = request.user.student_profile
            enrollment = Enrollment.objects.get(student=student, course_id=course_id)
            enrollment.progress = progress
            enrollment.save()
            return Response({'message': 'Progress updated successfully.'})
        except Enrollment.DoesNotExist:
            return Response({'error': 'Enrollment not found'}, status=404)

class CertificateView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def get(self, request, course_id):
        try:
            student = request.user.student_profile
            enrollment = Enrollment.objects.get(student=student, course_id=course_id)

            if enrollment.progress < 100:
                return Response({'error': 'Course is not completed yet.'}, status=400)

            full_name = f"{request.user.first_name} {request.user.last_name}"
            course_title = enrollment.course.title
            date = enrollment.date.strftime("%Y-%m-%d")

            return Response({
                "message": "Certificate generated successfully.",
                "name": full_name,
                "course": course_title,
                "completion_date": date,
            })

        except Enrollment.DoesNotExist:
            return Response({'error': 'Enrollment not found'}, status=404)
        
class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser or user.is_admin:
            return Review.objects.all()
        elif user.is_student:
            return Review.objects.filter(student=user.student_profile)
        return Review.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        course = serializer.validated_data['course']
        student = user.student_profile

        if Review.objects.filter(course=course, student=student).exists():
            raise serializers.ValidationError("You have already reviewed this course.")

        if not Enrollment.objects.filter(course=course, student=student).exists():
            raise serializers.ValidationError("You must be enrolled in the course to leave a review.")

        serializer.save(student=student)

