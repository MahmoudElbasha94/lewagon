from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ContactSerializer
import logging
import smtplib
import ssl

logger = logging.getLogger(__name__)

@api_view(['POST'])
def contact(request):
    try:
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            contact = serializer.save()
            subject = f"New Contact Form Submission: {contact.subject}"
            message = f"""
            New contact form submission received:
            Name: {contact.name}
            Email: {contact.email}
            Subject: {contact.subject}
            Message: {contact.message}
            This message was sent from the LeWagon website contact form.
            """
            try:
                # Create an SMTP_SSL connection with verification disabled
                context = ssl._create_unverified_context()
                with smtplib.SMTP_SSL(settings.EMAIL_HOST, settings.EMAIL_PORT, context=context) as server:
                    server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
                    server.sendmail(
                        settings.EMAIL_HOST_USER,
                        settings.EMAIL_HOST_USER,
                        f"Subject: {subject}\n\n{message}"
                    )
                logger.info(f"Contact form email sent successfully for {contact.email}")
            except Exception as email_error:
                logger.error(f"Failed to send contact form email: {str(email_error)}")
                # Continue even if email fails
            return Response({
                'message': 'Thank you for your message! We will get back to you soon.'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        return Response({
            'error': 'An error occurred while processing your request. Please try again later.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)