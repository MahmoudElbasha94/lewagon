from rest_framework import serializers
from .models import Course, CourseVideo,Instructor, Review , Student , Payment

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['id', 'name', 'email', 'phone', 'bio', 'profile_pic']

class CourseVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseVideo
        fields = ['id', 'title', 'video_url']

class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['course', 'rating', 'comment']
        
class ReviewSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.username', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'course_title', 'student_name', 'date', 'rating', 'comment']


class CourseSerializer(serializers.ModelSerializer):
    videos = CourseVideoSerializer(many=True, read_only=True)
    class Meta:
        model = Course
        fields = '__all__'
        read_only_fields = ['instructor','slug']
    
class EnrolledStudentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Student
        fields = ['name', 'email']
        
class PaymentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='enrollment.course.title', read_only=True)
    student_name = serializers.CharField(source='enrollment.student.user.username', read_only=True)

    class Meta:
        model = Payment
        fields = ['id', 'date', 'price', 'currency', 'course_title', 'student_name']




