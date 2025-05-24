from rest_framework import serializers
from .models import Course, CourseVideo,Instructor, Review , Student , Payment, Transaction, Enrollment

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['id', 'name', 'email', 'phone', 'bio', 'profile_pic']

class CourseVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseVideo
        fields = ['id', 'lesson_name', 'video_url', 'created_at', 'updated_at']

class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['course', 'rating', 'comment']
        
class ReviewSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'course_title', 'student_name', 'date', 'rating', 'comment']


class CourseSerializer(serializers.ModelSerializer):
    videos = CourseVideoSerializer(many=True, read_only=True)
    courseImage = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = '__all__'
        read_only_fields = ['instructor', 'slug']

    def get_courseImage(self, obj):
        return obj.get_image_url()

    def create(self, validated_data):
        # Get videos data from request
        request = self.context.get('request')
        videos_data = []
        
        if request and request.data:
            # Handle multiple videos
            for key in request.data.keys():
                if key.startswith('videos[') and key.endswith('][lesson_name]'):
                    index = key.split('[')[1].split(']')[0]
                    lesson_name = request.data.get(f'videos[{index}][lesson_name]')
                    video_url = request.data.get(f'videos[{index}][video_url]')
                    if lesson_name and video_url:
                        videos_data.append({
                            'lesson_name': lesson_name,
                            'video_url': video_url
                        })

        # Create the course
        course = Course.objects.create(**validated_data)
        
        # Create and add videos
        for video_data in videos_data:
            video = CourseVideo.objects.create(**video_data)
            course.videos.add(video)
        
        return course

    def update(self, instance, validated_data):
        # Get videos data from request
        request = self.context.get('request')
        videos_data = []
        
        if request and request.data:
            # Handle multiple videos
            for key in request.data.keys():
                if key.startswith('videos[') and key.endswith('][lesson_name]'):
                    index = key.split('[')[1].split(']')[0]
                    lesson_name = request.data.get(f'videos[{index}][lesson_name]')
                    video_url = request.data.get(f'videos[{index}][video_url]')
                    if lesson_name and video_url:
                        videos_data.append({
                            'lesson_name': lesson_name,
                            'video_url': video_url
                        })

        # Update course fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Create and add new videos
        for video_data in videos_data:
            video = CourseVideo.objects.create(**video_data)
            instance.videos.add(video)
        
        return instance

class EnrolledStudentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.get_full_name')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Student
        fields = ['name', 'email']
        
class PaymentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='enrollment.course.title', read_only=True)
    student_name = serializers.CharField(source='enrollment.student.user.get_full_name', read_only=True)

    class Meta:
        model = Payment
        fields = ['id', 'date', 'price', 'currency', 'course_title', 'student_name']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'course', 'amount', 'date', 'status']

class EnrolledCourseSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    progress = serializers.FloatField()
    status = serializers.CharField()

    class Meta:
        model = Enrollment
        fields = ['course', 'progress', 'status']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        course_data = data.pop('course')
        return {**course_data, 'progress': data['progress'], 'status': data['status']}



