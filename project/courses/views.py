from django.shortcuts import render
from .models import *
# from users.forms import SignUpForm
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import now
class PayPalCaptureAPIView(APIView):
    def post(self, request):
        order_id = request.data.get('orderID')
        payer_email = request.data.get('email')
        course_id = request.data.get('course_id')

        try:
            course = Course.objects.get(id=course_id)
            student = Student.objects.get(email=payer_email)

        
            enrollment = Enrollment.objects.create(
                student=student,
                course=course,
                date=now().date()
            )
            
            Payment.objects.create(
                enrollment=enrollment,
                date=now().date(),
                price=course.price
            )

            return Response({'message': 'Payment recorded successfully.'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)