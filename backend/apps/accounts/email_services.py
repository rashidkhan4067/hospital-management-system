from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

# Constants for project settings
PROJECT_NAME = "Al Shifaa Clinic"
SITE_URL = getattr(settings, 'FRONTEND_URL', 'http://localhost:5173')

def send_magic_link_email(email, magic_link):
    """
    Sends a magic login link using a professional HTML template.
    """
    subject = f"{PROJECT_NAME} | Secure Magic Login Link"
    context = {
        'subject': subject,
        'user': {'first_name': 'Valued Member'},  # Fallback
        'magic_link': magic_link,
        'site_url': SITE_URL
    }
    
    # We'll use welcome_email as a base for magic link for now
    html_content = render_to_string('emails/welcome_email.html', context)
    text_content = strip_tags(html_content)

    try:
        msg = EmailMultiAlternatives(
            subject,
            text_content,
            settings.DEFAULT_FROM_EMAIL,
            [email]
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return True
    except Exception as e:
        logger.error(f"Error sending magic link email: {str(e)}")
        return False

def send_welcome_email(user):
    """
    Sends a professional welcome email after registration.
    """
    subject = f"Welcome to {PROJECT_NAME}, {user.first_name}!"
    context = {
        'subject': subject,
        'user': user,
        'site_url': SITE_URL
    }
    
    html_content = render_to_string('emails/welcome_email.html', context)
    text_content = strip_tags(html_content)

    try:
        msg = EmailMultiAlternatives(
            subject,
            text_content,
            settings.DEFAULT_FROM_EMAIL,
            [user.email]
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return True
    except Exception as e:
        logger.error(f"Error sending welcome email: {str(e)}")
        return False

def send_login_alert_email(user, request):
    """
    Sends a security alert email when a user logs in.
    """
    subject = f"{PROJECT_NAME} Security Alert: New Login Detected"
    
    # Get user agent and IP address
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
        
    user_agent = request.META.get('HTTP_USER_AGENT', 'Unknown device')
    login_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    context = {
        'subject': subject,
        'user': user,
        'login_time': login_time,
        'ip_address': ip,
        'user_agent': user_agent,
        'site_url': SITE_URL
    }
    
    html_content = render_to_string('emails/login_alert_email.html', context)
    text_content = strip_tags(html_content)

    try:
        msg = EmailMultiAlternatives(
            subject,
            text_content,
            settings.DEFAULT_FROM_EMAIL,
            [user.email]
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return True
    except Exception as e:
        logger.error(f"Error sending login alert email: {str(e)}")
        return False
