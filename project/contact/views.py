from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings

@api_view(['POST'])
def contact_us(request):
    data = request.data

    campus = data.get('campus', '')
    first_name = data.get('firstName', '')
    last_name = data.get('lastName', '')
    email = data.get('email', '')
    country = data.get('country', '')
    communication = data.get('communication', '')
    message = data.get('message', '')
    course = data.get('course', '')
    consent = data.get('consent', False)

    if not all([first_name, last_name, email, message]):
        return Response({'error': 'First name, last name, email, and message are required.'},
                        status=status.HTTP_400_BAD_REQUEST)

    full_message = f"""
    Campus: {campus}
    Name: {first_name} {last_name}
    Email: {email}
    Country: {country}
    Preferred Communication: {communication}
    Course Interested In: {course}
    Consent: {"Yes" if consent else "No"}

    Message:
    {message}
    """

    try:
        send_mail(
            subject="New Contact Form Submission",
            message=full_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
        return Response({'message': 'Your active message has been sent!'},status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': f'An error occurred while sending the message: {str(e)}'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
