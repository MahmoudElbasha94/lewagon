# courses/api.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from ..models import Course
from ..serializers import CourseSerializer
from users.permissions import IsStudent, IsInstructor


class AllCoursesView(APIView):
    permission_classes = []

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
# الطالب فقط يمكنه مشاهدة تفاصيل كورس
class CourseDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly, IsStudent]

    def get(self, request, slug):
        try:
            course = Course.objects.get(slug=slug)
            serializer = CourseSerializer(course)
            return Response(serializer.data)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

# المحاضر فقط يمكنه مشاهدة كورساته
class InstructorCourseListView(APIView):
    permission_classes = [IsAuthenticated, IsInstructor]

    def get(self, request):
        courses = Course.objects.filter(instructor=request.user)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

# المحاضر فقط يمكنه إنشاء كورسات
class CourseCreateView(APIView):
    permission_classes = [IsAuthenticated, IsInstructor]

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(instructor=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
