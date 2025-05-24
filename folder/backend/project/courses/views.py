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
from .models import Course, Enrollment, Student, Review, Payment, Transaction, CourseVideo
from .serializers import CourseSerializer, ReviewCreateSerializer, PaymentSerializer, ReviewSerializer, TransactionSerializer, EnrolledCourseSerializer
from users.permissions import IsStudent, IsInstructor, IsAdmin
from django.db.models import Q
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Prefetch


class AllCoursesView(APIView):
    permission_classes = []
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_categorized_courses(request):
    search_query = request.GET.get('search', '').lower()
    category = request.GET.get('category', 'All')
    min_price = request.GET.get('min_price', '0')
    max_price = request.GET.get('max_price', '200')
    level = request.GET.get('level', 'All')
    sort_by = request.GET.get('sort_by', 'popular')

    try:
        min_price = float(min_price)
        max_price = float(max_price)
    except ValueError:
        min_price = 0.0
        max_price = 200.0

    courses = Course.objects.all()

    # فلترة حسب الفئة
    if category != 'All':
        courses = courses.filter(category=category)

    # فلترة حسب المستوى
    if level != 'All':
        courses = courses.filter(level=level)

    # فلترة حسب السعر
    courses = courses.filter(price__gte=min_price, price__lte=max_price)

    # البحث بالكلمات المفتاحية (في العنوان، اسم المحاضر، الفئة)
    if search_query:
        courses = courses.filter(
            Q(title__icontains=search_query) |
            Q(instructor__first_name__icontains=search_query) |
            Q(instructor__last_name__icontains=search_query) |
            Q(category__icontains=search_query)
        ).distinct()

    # الترتيب حسب الاختيار
    if sort_by == 'popular':
        courses = courses.order_by('-price')  # مؤقتًا نرتب بالسعر تنازلي
    elif sort_by == 'newest':
        courses = courses.order_by('-id')
    elif sort_by == 'price-low':
        courses = courses.order_by('price')
    elif sort_by == 'price-high':
        courses = courses.order_by('-price')

    # تحويل الكورسات إلى مصفوفة مسطحة
    courses_data = []
    for course in courses:
        course_data = {
            'id': course.id,
            'slug': course.slug,
            'title': course.title,
            'description': course.description,
            'instructor': f"{course.instructor.first_name} {course.instructor.last_name}",
            'category': course.category,
            'price': float(course.price),
            'level': course.level,
            'duration': course.duration,
            'courseImage': course.courseImage.url if course.courseImage else None,
        }
        courses_data.append(course_data)

    return JsonResponse({'courses': courses_data})

class CourseDetailView(APIView):
    """
    عرض تفاصيل الكورس مع الفيديوهات المرتبطة به
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, slug):
        try:
            # استعلام واحد محسن يشمل:
            # - عدد الطلاب المسجلين
            # - الفيديوهات مرتبة حسب الترتيب المخصص
            # - تقدم المستخدم إذا كان مسجلاً
            course = Course.objects.annotate(
                students_count=Count('enrollment')
           
                ).prefetch_related(
                'videos'  # استخدم هذا بدلاً من Prefetch إذا لم تكن بحاجة لترتيب مخصص
            ).get(slug=slug)

            # حساب التقدم إذا كان المستخدم مسجلاً في الكورس
            progress = 0
            if hasattr(request.user, 'student_profile'):
                enrollment = Enrollment.objects.filter(
                    student=request.user.student_profile,
                    course=course
                ).first()
                if enrollment:
                    progress = enrollment.progress

            # إعداد بيانات الاستجابة
            serializer = CourseSerializer(course, context={'request': request})
            response_data = serializer.data
            response_data.update({
                'progress': progress,
                'lessons': self._prepare_lessons_data(course)
            })

            return Response(response_data)

        except Course.DoesNotExist:
            return Response(
                {'error': 'Course not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def _prepare_lessons_data(self, course):
        """
        تحويل الفيديوهات إلى هيكل دروس متوافق مع الواجهة
        """
        return [
            {
                'id': video.id,
                'title': video.lesson_name,
                'order': video.order,
                'duration': video.duration,
                'video_url': video.video_url,
                'is_completed': self._check_lesson_completion(course, video)
            }
            for video in getattr(course, 'ordered_videos', [])
        ]

    def _check_lesson_completion(self, course, video):
        """
        التحقق من إكمال الدرس (يمكن تطويره حسب نظام التتبع)
        """
        # هنا يمكنك إضافة منطق التحقق من إكمال الدرس
        return False

class CourseVideoView(APIView):
    """
    عرض تفاصيل فيديو معين ضمن الكورس
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, course_slug, video_id):
        try:
            course = Course.objects.get(slug=course_slug)
            video = course.videos.get(id=video_id)

            # التحقق من صلاحية الوصول
            if not self._check_access(request.user, course):
                return Response(
                    {'error': 'You are not enrolled in this course'},
                    status=status.HTTP_403_FORBIDDEN
                )

            response_data = {
                'id': video.id,
                'title': video.lesson_name,
                'video_url': video.video_url,
                'duration': video.duration,
                'next_video': self._get_next_video(course, video.order),
                'prev_video': self._get_prev_video(course, video.order)
            }

            return Response(response_data)

        except Course.DoesNotExist:
            return Response(
                {'error': 'Course not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except CourseVideo.DoesNotExist:
            return Response(
                {'error': 'Video not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    def _check_access(self, user, course):
        """التحقق من أن المستخدم مسجل في الكورس"""
        if user.is_staff:
            return True
        return Enrollment.objects.filter(
            student=user.student_profile,
            course=course
        ).exists()

    def _get_next_video(self, course, current_order):
        """الحصول على بيانات الفيديو التالي"""
        next_video = course.videos.filter(
            order__gt=current_order
        ).order_by('order').first()
        return next_video.id if next_video else None

    def _get_prev_video(self, course, current_order):
        """الحصول على بيانات الفيديو السابق"""
        prev_video = course.videos.filter(
            order__lt=current_order
        ).order_by('-order').first()
        return prev_video.id if prev_video else None

class MarkLessonCompletedView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]
    
    def post(self, request):
        lesson_id = request.data.get('lesson_id')
        # ... منطق تسجيل إكمال الدرس ...
        return Response({'status': 'success'})

class InstructorCourseListView(APIView):
    permission_classes = [IsAuthenticated, IsInstructor]

    def get(self, request):
        courses = Course.objects.filter(instructor=request.user)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

class CourseCreateView(APIView):
    permission_classes = [IsAuthenticated, IsInstructor]

    def post(self, request):
        serializer = CourseSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            course = serializer.save(instructor=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseUpdateView(UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated, IsInstructor]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_update(self, serializer):
        course = self.get_object()
        if course.instructor != self.request.user:
            raise PermissionDenied("You can only edit your own courses.")
        serializer.save()

    def get_queryset(self):
        return Course.objects.filter(instructor=self.request.user)

class CourseDeleteView(DestroyAPIView):
    queryset = Course.objects.all()
    permission_classes = [IsAuthenticated, IsInstructor]

    def perform_destroy(self, instance):
        if instance.instructor != self.request.user:
            raise PermissionDenied("You can only delete your own courses.")
        instance.delete()

class StudentEnrolledCoursesView(ListAPIView):
    serializer_class = EnrolledCourseSerializer
    permission_classes = [IsAuthenticated, IsStudent]

    def get_queryset(self):
        student = self.request.user.student_profile 
        return Enrollment.objects.filter(student=student).select_related('course')

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

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_transactions(request):
    transactions = Transaction.objects.all()
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)
