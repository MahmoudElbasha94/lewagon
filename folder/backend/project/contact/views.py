from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .serializers import ContactSerializer
import logging

logger = logging.getLogger(__name__)



@api_view(['POST'])
def contact(request):
    try:
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            # Save the contact message
            contact = serializer.save()
            
            # Prepare email content
            subject = f"New Contact Form Submission: {contact.subject}"
            message = f"""
            New contact form submission received:
            
            Name: {contact.name}
            Email: {contact.email}
            Subject: {contact.subject}
            
            Message:
            {contact.message}
            
            This message was sent from the LeWagon website contact form.
            """
            
            # Send email notification
            try:
                send_mail(
                    subject=subject,
                    message=message,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.EMAIL_HOST_USER],  # Send to the configured email
                    fail_silently=False,
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
