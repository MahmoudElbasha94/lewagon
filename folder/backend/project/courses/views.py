# courses/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Count
from django.core.exceptions import PermissionDenied
from rest_framework.generics import UpdateAPIView, DestroyAPIView, ListAPIView
from django.utils.timezone import now
from rest_framework import permissions
from .models import Course, Enrollment, Student, Review, Payment, Transaction, CourseVideo, VideoCompletion, Certificate
from .serializers import CourseSerializer, ReviewCreateSerializer, PaymentSerializer, ReviewSerializer, TransactionSerializer, EnrolledCourseSerializer
from users.permissions import IsStudent, IsInstructor, IsAdmin
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse
from django.db.models import Prefetch
from reportlab.pdfgen import canvas
from django.core.files.base import ContentFile
import os
import io



class AllCoursesView(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        try:
            queryset = Course.objects.all()
            serializer = CourseSerializer(
                queryset,
                many=True,
                context={'request': request}
            )
            return Response({'courses': serializer.data})  # لف البيانات تحت مفتاح 'courses'
        except Exception as e:
            return Response(
                {'error': f'Failed to retrieve courses: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET'])
@permission_classes([AllowAny])
def get_categorized_courses(request):
    try:
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response({'courses': serializer.data})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CourseDetailView(APIView):
    """
    عرض تفاصيل الكورس مع الفيديوهات المرتبطة به
    """
    permission_classes = []

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
            for video in course.lessons  # استخدام course.lessons بدلاً من ordered_videos
        ]

    def _check_lesson_completion(self, course, video):
        """
        التحقق من إكمال الدرس
        """
        if not hasattr(self.request.user, 'student_profile'):
            return False
        return VideoCompletion.objects.filter(
            enrollment__student=self.request.user.student_profile,
            enrollment__course=course,
            video=video
        ).exists()

class CourseVideoView(APIView):
    """
    عرض تفاصيل فيديو معين ضمن الكورس
    """
    permission_classes = []

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
        """
        التحقق من أن المستخدم مسجل في الكورس أو إن الكورس مجاني
        """
        if user.is_staff:  # الإداريين يقدروا يشوفوا كل الفيديوهات
            return True
        if course.courseType == 'Free':  # السماح لأي مستخدم مسجل بالوصول للكورسات المجانية
            return True
        return Enrollment.objects.filter(
            student=user.student_profile,
            course=course
        ).exists()

    def _get_next_video(self, course, current_order):
        """
        الحصول على بيانات الفيديو التالي
        """
        next_video = course.videos.filter(
            order__gt=current_order
        ).order_by('order').first()
        return next_video.id if next_video else None

    def _get_prev_video(self, course, current_order):
        """
        الحصول على بيانات الفيديو السابق
        """
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

class MarkLessonCompletedView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]
    
    def post(self, request):
        lesson_id = request.data.get('lesson_id')
        course_id = request.data.get('course_id')
        try:
            student = request.user.student_profile
            enrollment = Enrollment.objects.get(student=student, course_id=course_id)
            video = CourseVideo.objects.get(id=lesson_id, courses=enrollment.course)
            
            # Mark video as completed
            VideoCompletion.objects.get_or_create(enrollment=enrollment, video=video)
            
            # Calculate progress
            total_videos = enrollment.course.videos.count()
            completed_videos = enrollment.video_completions.count()
            enrollment.progress = (completed_videos / total_videos) * 100 if total_videos > 0 else 0
            enrollment.save()
            
            return Response({'status': 'success', 'progress': enrollment.progress})
        except (Enrollment.DoesNotExist, CourseVideo.DoesNotExist):
            return Response({'error': 'Invalid course or video'}, status=404)
        
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

            # إنشاء ملف PDF
            buffer = io.BytesIO()
            p = canvas.Canvas(buffer)
            p.drawString(100, 750, f"Certificate of Completion")
            p.drawString(100, 700, f"Name: {full_name}")
            p.drawString(100, 650, f"Course: {course_title}")
            p.drawString(100, 600, f"Date: {date}")
            p.showPage()
            p.save()

            # حفظ ملف PDF
            pdf_file = ContentFile(buffer.getvalue(), name=f"certificate_{course_id}_{student.id}.pdf")
            certificate, created = Certificate.objects.get_or_create(
                enrollment=enrollment,
                defaults={'certificate_file': pdf_file}
            )

            return Response({
                "message": "Certificate generated successfully.",
                "name": full_name,
                "course": course_title,
                "completion_date": date,
                "certificate_url": certificate.certificate_file.url
            })

        except Enrollment.DoesNotExist:
            return Response({'error': 'Enrollment not found'}, status=404)


class EnrollCourseView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def post(self, request):
        course_id = request.data.get('course_id')
        try:
            student = request.user.student_profile
            course = Course.objects.get(id=course_id)

            # التحقق مما إذا كان الطالب مسجلاً بالفعل
            if Enrollment.objects.filter(student=student, course=course).exists():
                return Response(
                    {'error': 'You are already enrolled in this course'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # إنشاء سجل التسجيل
            enrollment = Enrollment.objects.create(
                student=student,
                course=course,
                date=now().date(),
                progress=0.0,
                status='Enrolled'
            )

            # إذا كان الكورس مدفوعًا، قد تحتاج إلى التحقق من الدفع هنا
            if course.courseType == 'Paid':
    # افتراض: استدعاء بوابة دفع (مثل Stripe)
                payment_intent = create_payment_intent(course.price, 'usd') # وظيفة وهمية
                if payment_intent['status'] == 'succeeded':
                    Payment.objects.create(
                        enrollment=enrollment,
                        price=course.price,
                        currency='USD',
                        date=now().date()
                    )
                else:
                    enrollment.delete() # حذف التسجيل إذا فشل الدفع
                    return Response(
                        {'error': 'Payment failed'},
                        status=status.HTTP_402_PAYMENT_REQUIRED
                    )

            return Response(
                {'message': 'Successfully enrolled in the course'},
                status=status.HTTP_201_CREATED
            )

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

@api_view(['GET'])
@permission_classes([AllowAny])
def deals(request):
    try:
        courses = Course.objects.filter(courseType='Paid').order_by('price')[:5]
        serializer = CourseSerializer(courses, many=True)
        return Response({'deals': serializer.data})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def learning_paths(request):
    try:
        courses = Course.objects.all()
        paths = []
        categories = set(course.category for course in courses)
        
        for category in categories:
            category_courses = courses.filter(category=category)
            paths.append({
                'category': category,
                'courses': CourseSerializer(category_courses, many=True).data
            })
        
        return Response({'paths': paths})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def recommendations(request):
    try:
        courses = Course.objects.all().order_by('-rating')[:5]
        serializer = CourseSerializer(courses, many=True)
        return Response({'recommendations': serializer.data})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)