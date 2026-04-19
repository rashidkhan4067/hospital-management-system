from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

# Constants for project settings
PROJECT_NAME = "Al Shifaa Clinic"
SITE_URL = getattr(settings, 'SITE_URL', 'http://localhost:5173')

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
    
    # Use the dedicated magic link template
    html_content = render_to_string('emails/magic_link_email.html', context)
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

def send_login_alert_email(user, request, risk_level):
    """
    🏢 Institutional Security Alert
    Sends a tiered notification ONLY when identity shards are unfamiliar or suspicious.
    """
    subject_map = {
        'MEDIUM': f"{PROJECT_NAME} Security: New Device Sign-in",
        'HIGH':   f"{PROJECT_NAME} URGENT: Suspicious Login Detected"
    }
    
    subject = subject_map.get(risk_level, f"{PROJECT_NAME} Security Alert")
    
    # Forensic context extraction
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    ip = x_forwarded_for.split(',')[0] if x_forwarded_for else request.META.get('REMOTE_ADDR')
    user_agent = request.META.get('HTTP_USER_AGENT', 'Unknown device/interface')
    login_time = datetime.now().strftime("%Y-%m-%d %I:%M %p")

    context = {
        'subject': subject,
        'user': user,
        'login_time': login_time,
        'ip_address': ip,
        'user_agent': user_agent,
        'risk_level': risk_level,
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
        logger.error(f"Security Alert Dispatch Failure: {str(e)}")
        return False

def send_otp_email(user, otp_code):
    """
    🔐 Higher-Order Identity Challenge
    Dispatches a transient 6-digit verification code to the communication shard.
    """
    subject = f"{PROJECT_NAME} Security: Verification Code Required"
    context = {
        'subject': subject,
        'user': user,
        'otp_code': otp_code,
        'site_url': SITE_URL
    }
    
    html_content = render_to_string('emails/otp_email.html', context)
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
        logger.error(f"OTP Dispatch Failure: {str(e)}")
        return False
