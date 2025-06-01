from rest_framework import serializers
from .models import Course, CourseVideo, Instructor, Review, Student, Payment, Transaction, Enrollment, VideoCompletion
class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['id', 'name', 'email', 'phone', 'bio', 'profile_pic']

class CourseVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseVideo

        fields = ['id', 'lesson_name', 'video_url', 'duration','formatted_duration', 'order', 'created_at', 'updated_at']


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
    progress = serializers.SerializerMethodField()
    videos = CourseVideoSerializer(many=True, read_only=True)
    courseImage = serializers.SerializerMethodField()
    lessons = serializers.SerializerMethodField()
    is_enrolled = serializers.SerializerMethodField()  # إضافة حقل is_enrolled

    instructor_name = serializers.SerializerMethodField()  # إضافة حقل instructor_name
    class Meta:
        model = Course
        fields = '__all__'
        read_only_fields = ['instructor_name', 'slug']
        
        
    def get_instructor_name(self, obj):
        # إرجاع الاسم الكامل للمدرب أو اسم المستخدم أو قيمة افتراضية
        if obj.instructor:
            return obj.instructor.get_full_name() or obj.instructor.username or 'Unknown Instructor'
        return 'Unknown Instructor'

    def get_courseImage(self, obj):
        return obj.get_image_url()

    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        try:
            student = request.user.student_profile
            return Enrollment.objects.filter(student=student, course=obj).exists()
        except (Student.DoesNotExist, AttributeError):
            return False

    def get_progress(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return 0
        try:
            student = request.user.student_profile
            enrollment = Enrollment.objects.filter(student=student, course=obj).first()
            if not enrollment:
                return 0
            completed_videos = VideoCompletion.objects.filter(enrollment=enrollment).count()
            total_videos = obj.videos.count()
            return (completed_videos / total_videos * 100) if total_videos > 0 else 0
        except (Student.DoesNotExist, AttributeError):
            return 0
    def get_lessons(self, obj):
        videos = obj.videos.order_by('order')
        user = None
        student = None
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user = request.user
            try:
                student = user.student_profile
            except (Student.DoesNotExist, AttributeError):
                student = None

        return [{
            'id': video.id,
            'title': video.lesson_name,
            'order': video.order,
            'created_at': video.created_at,
            'updated_at': video.updated_at,
            'duration': video.duration,
            'video_url': video.video_url if user else None,
            'is_completed': VideoCompletion.objects.filter(
                enrollment__course=obj,
                enrollment__student=student,
                video=video
            ).exists() if user and student else False
        } for video in videos]

    def create(self, validated_data):
        request = self.context.get('request')
        videos_data = []
        
        if request and request.data:
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

        course = Course.objects.create(**validated_data)
        
        for video_data in videos_data:
            video = CourseVideo.objects.create(**video_data)
            course.videos.add(video)
        
        return course

    def update(self, instance, validated_data):
        request = self.context.get('request')
        videos_data = []
        
        if request and request.data:
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

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
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