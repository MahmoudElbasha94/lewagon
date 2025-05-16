from rest_framework import serializers
from .models import Payment
from .models import Course, CourseVideo,Instructor, Enrollment, Review, Payment

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['id', 'name', 'email', 'phone', 'bio', 'profile_pic']

class CourseVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseVideo
        fields = ['id', 'title', 'video_url']

class ReviewSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.name', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'student_name', 'date', 'rating', 'comment']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        read_only_fields = ['instructor']


class PaymentSerializer(serializers.ModelSerializer):
    currency = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = ['id', 'enrollment', 'date', 'price', 'currency']

    def get_currency(self, obj):
        return 'USD'
