from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status , viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from .serializers import UserSerializer , UserUpdateSerializer , ChangePasswordSerializer
from .permissions import IsStudent, IsInstructor, IsAdmin
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import CreateAPIView
from django.core.mail import send_mail
from django.shortcuts import reverse
from .utils import generate_password_reset_token, verify_password_reset_token
from project.courses.models import Course, Enrollment, Payment, Student, Instructor

class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_student'] = user.is_student
        token['is_instructor'] = user.is_instructor
        return token
    def validate(self, attrs):
        data = super().validate(attrs)
        data['email'] = self.user.email
        data['is_student'] = self.user.is_student
        data['is_instructor'] = self.user.is_instructor
        return data

class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        total_users = User.objects.count()
        total_students = User.objects.filter(is_student=True).count()
        total_instructors = User.objects.filter(is_instructor=True).count()
        total_courses = Course.objects.count()
        total_enrollments = Enrollment.objects.count()
        total_payments = Payment.objects.count()
        
        recent_users = User.objects.order_by('-date_joined')[:5].values('email', 'first_name', 'last_name')
        recent_courses = Course.objects.order_by('-created_at')[:5].values('title', 'instructor__email')

        return Response({
            "stats": {
                "total_users": total_users,
                "total_students": total_students,
                "total_instructors": total_instructors,
                "total_courses": total_courses,
                "total_enrollments": total_enrollments,
                "total_payments": total_payments,
            },
            "recent_users": list(recent_users),
            "recent_courses": list(recent_courses),
        })

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class StudentOnlyView(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def get(self, request):
        return Response({"message": "welcome student!"})

class InstructorOnlyView(APIView):
    permission_classes = [IsAuthenticated, IsInstructor]

    def get(self, request):
        return Response({"message": "welcome instructor!"})

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=400)        

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

class UserProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        user = request.user
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated successfully.', 'data': serializer.data}, status=200)
        return Response(serializer.errors, status=400)

class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            uid, token = generate_password_reset_token(user)
            reset_link = request.build_absolute_uri(reverse('password_reset_confirm') + f'?uid={uid}&token={token}')
            send_mail(
                subject='Password Reset Request',
                message=f'Click the link to reset your password: {reset_link}',
                from_email=None,
                recipient_list=[email],
            )
            return Response({'message': 'A reset link has been sent to your email.'}, status=200)
        except User.DoesNotExist:
            return Response({'error': 'There is no user with this email.'}, status=404)

class PasswordResetConfirmView(APIView):
    def post(self, request):
        uid = request.query_params.get('uid')
        token = request.query_params.get('token')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')
        if new_password != confirm_password:
            return Response({'error': 'The passwords do not match.'}, status=400)
        user = verify_password_reset_token(uid, token)
        if not user:
            return Response({'error': 'The link is invalid or expired.'}, status=400)
        user.set_password(new_password)
        user.save()
        return Response({'message': 'Your password has been changed successfully.'})

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            request.user.set_password(serializer.validated_data['new_password'])
            request.user.save()
            return Response({'message': 'Password updated successfully.'}, status=200)
        return Response(serializer.errors, status=400)
    
class UserAdminViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
