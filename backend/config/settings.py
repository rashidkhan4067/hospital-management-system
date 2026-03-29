"""
config/settings.py
──────────────────
Production-ready Django settings for the AI-Powered Hospital Management System.
Every setting is commented so a junior developer can understand exactly what it
does and WHY it is set the way it is.

Design decisions:
  • python-decouple is used exclusively for environment variable loading.
    This keeps secrets out of code and allows different .env files per
    environment (dev/staging/prod) without changing code.
  • All apps live under the `apps/` directory and are registered with their
    dotted path so Django can locate them even when not in the root.
  • JWT is chosen over session auth because the React frontend and any future
    mobile clients need stateless bearer-token authentication.
  • CORS is configured for the React dev server (Vite default port 5173).
"""

from pathlib import Path
from decouple import config  # ← always use config(), never os.environ
from datetime import timedelta

# ─────────────────────────────────────────────────────────────────────────────
# 1. BASE PATHS
# ─────────────────────────────────────────────────────────────────────────────

# BASE_DIR resolves to the root of the project (where manage.py lives).
# All relative paths (templates, static, media) are built from this.
BASE_DIR = Path(__file__).resolve().parent.parent


# ─────────────────────────────────────────────────────────────────────────────
# 2. SECURITY SETTINGS
# ─────────────────────────────────────────────────────────────────────────────

# SECRET_KEY is pulled from .env — NEVER hardcode it in settings or version control.
# Used by Django to sign cookies, sessions, CSRF tokens, and password reset links.
SECRET_KEY = config("DJANGO_SECRET_KEY")

# DEBUG controls verbose error pages and development shortcuts.
# Must be False in production — leaking tracebacks is a security risk.
# cast=bool converts the string "True"/"False" from .env to a Python boolean.
DEBUG = config("DEBUG", default=False, cast=bool)

# ALLOWED_HOSTS is the whitelist of host/domain names Django will serve.
# When DEBUG=False, any request with a Host header not in this list gets HTTP 400.
# We split the comma-separated string from .env into a Python list.
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost,127.0.0.1").split(",")


# ─────────────────────────────────────────────────────────────────────────────
# 3. INSTALLED APPS
# ─────────────────────────────────────────────────────────────────────────────

# Django discovers models, admin registrations, signal handlers, management
# commands, and template tags from each installed app.
INSTALLED_APPS = [
    # ── Django built-ins ──────────────────────────────────────────────────────
    "django.contrib.admin",          # Admin site at /admin/
    "django.contrib.auth",           # Authentication framework (login/logout/permissions)
    "django.contrib.contenttypes",   # Generic relations between models
    "django.contrib.sessions",       # Server-side session management
    "django.contrib.messages",       # One-time flash messages
    "django.contrib.staticfiles",    # Static file serving (CSS, JS, images)

    # ── Third-party packages ──────────────────────────────────────────────────
    "rest_framework",                # Django REST Framework — our API backbone
    "rest_framework_simplejwt",      # JWT authentication for stateless API access
    "corsheaders",                   # CORS headers for React frontend on a different port

    # ── Our custom apps (under the apps/ directory) ───────────────────────────
    "apps.accounts",                 # Custom User model + auth endpoints
    "apps.doctors",                  # Doctor profiles + CRUD
    "apps.appointments",             # Appointment booking + conflict detection
    "apps.voice",                    # AI voice pipeline (STT → LLM → TTS)
    "rest_framework_simplejwt.token_blacklist",  # Ensures JWT tokens can be invalidated (Logout)
]


# ─────────────────────────────────────────────────────────────────────────────
# 4. MIDDLEWARE
# ─────────────────────────────────────────────────────────────────────────────

# Middleware runs on EVERY request and response, in order (top-down for request,
# bottom-up for response). Order matters — SecurityMiddleware must be first,
# CorsMiddleware must be before CommonMiddleware to add CORS headers early.
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",        # HTTPS redirects, HSTS, anti-clickjacking
    "corsheaders.middleware.CorsMiddleware",                # Add CORS headers BEFORE any response is sent
    "django.contrib.sessions.middleware.SessionMiddleware", # Attach session to each request
    "django.middleware.common.CommonMiddleware",            # URL normalization (trailing slashes)
    "django.middleware.csrf.CsrfViewMiddleware",            # CSRF protection for browser-based forms
    "django.contrib.auth.middleware.AuthenticationMiddleware",  # Attach user to request.user
    "django.contrib.messages.middleware.MessageMiddleware", # Flash messages (used by admin)
    "django.middleware.clickjacking.XFrameOptionsMiddleware",   # Prevent embedding in <iframe>
]


# ─────────────────────────────────────────────────────────────────────────────
# 5. URL CONFIGURATION
# ─────────────────────────────────────────────────────────────────────────────

# This tells Django where to find the root URL router.
ROOT_URLCONF = "config.urls"


# ─────────────────────────────────────────────────────────────────────────────
# 6. TEMPLATE SETTINGS
# ─────────────────────────────────────────────────────────────────────────────

# Templates are only needed for the Django admin interface in an API-only project.
# DjangoTemplates backend is required by the admin app.
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],                          # No custom template directories needed
        "APP_DIRS": True,                    # Search `templates/` folder inside each app
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",  # Required by admin
                "django.contrib.auth.context_processors.auth", # Injects `user` into templates
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# ─────────────────────────────────────────────────────────────────────────────
# 7. WSGI APPLICATION
# ─────────────────────────────────────────────────────────────────────────────

# Entry point for WSGI-compatible web servers (Gunicorn, uWSGI).
# This is used in production to serve Django.
WSGI_APPLICATION = "config.wsgi.application"


# ─────────────────────────────────────────────────────────────────────────────
# 8. DATABASE CONFIGURATION (Supabase PostgreSQL via Connection Pooler)
# ─────────────────────────────────────────────────────────────────────────────

# We use the Supabase Connection Pooler host instead of the direct db.xxx host
# because direct connections require IPv6, which most home/university networks
# do not support. The pooler host uses standard IPv4.
#
# CONN_MAX_AGE=60 keeps database connections alive for 60 seconds instead of
# closing and reopening one per request — reduces latency significantly under load.
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",  # psycopg2 PostgreSQL backend
        "NAME": config("DB_NAME"),                   # Database name (postgres)
        "USER": config("DB_USER"),                   # postgres.omnaldqboytnrlhqvjxo (pooler format)
        "PASSWORD": config("DB_PASSWORD"),           # Your Supabase DB password
        "HOST": config("DB_HOST"),                   # Pooler host (aws-1-ap-southeast-1...)
        "PORT": config("DB_PORT", default=5432, cast=int),  # Standard PostgreSQL port
        "CONN_MAX_AGE": 60,                          # Persistent connections — avoid reconnect overhead
        "OPTIONS": {
            # sslmode=require enforces encrypted connections to Supabase.
            # Supabase rejects unencrypted connections; this prevents silent failures.
            "sslmode": "require",
        },
    }
}


# ─────────────────────────────────────────────────────────────────────────────
# 9. CUSTOM USER MODEL
# ─────────────────────────────────────────────────────────────────────────────

# This is the most critical setting for our project.
# By pointing AUTH_USER_MODEL to our custom User, Django uses our model
# everywhere (admin, auth, permissions, ForeignKey to user, etc.).
# This MUST be set before running the first migration — changing it later
# requires a full database rebuild.
AUTH_USER_MODEL = "accounts.User"


# ─────────────────────────────────────────────────────────────────────────────
# 10. PASSWORD VALIDATION
# ─────────────────────────────────────────────────────────────────────────────

# Django runs these validators in order when a user sets or changes a password.
# They reject weak passwords before they reach the database.
AUTH_PASSWORD_VALIDATORS = [
    {   # Rejects passwords similar to the user's username/email
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {   # Minimum 8 characters — healthcare systems should require at least this
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {"min_length": 8},
    },
    {   # Rejects common passwords (top 20,000 list bundled with Django)
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {   # Rejects entirely numeric passwords (e.g., "12345678")
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# ─────────────────────────────────────────────────────────────────────────────
# 11. INTERNATIONALISATION
# ─────────────────────────────────────────────────────────────────────────────

# Language and timezone settings. Pakistan Standard Time (UTC+5).
# USE_TZ=True stores all datetimes in UTC internally; Django converts to TIME_ZONE
# when displaying to users. This prevents DST bugs and makes appointment conflict
# checks reliable across timezones.
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Karachi"          # Pakistan Standard Time (UTC+5, no DST)
USE_I18N = True                     # Enable translation infrastructure
USE_TZ = True                       # Store datetimes as UTC — essential for appointment logic


# ─────────────────────────────────────────────────────────────────────────────
# 12. STATIC AND MEDIA FILES
# ─────────────────────────────────────────────────────────────────────────────

# Static files: CSS, JavaScript, admin assets.
STATIC_URL = "/static/"
# STATIC_ROOT is where `collectstatic` gathers files for production serving.
STATIC_ROOT = BASE_DIR / "staticfiles"

# Media files: user-uploaded files (e.g., voice recordings submitted via API).
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"


# ─────────────────────────────────────────────────────────────────────────────
# 13. DEFAULT PRIMARY KEY TYPE
# ─────────────────────────────────────────────────────────────────────────────

# BigAutoField uses 64-bit integers instead of 32-bit.
# A hospital system could eventually have millions of appointments — never hit
# the 2-billion integer cap with BigAutoField.
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# ─────────────────────────────────────────────────────────────────────────────
# 14. DJANGO REST FRAMEWORK CONFIGURATION
# ─────────────────────────────────────────────────────────────────────────────

# Global DRF settings. These are the defaults for all API views unless
# a view or viewset overrides them explicitly.
REST_FRAMEWORK = {
    # JWTAuthentication: validates the Bearer token in Authorization header.
    # Removed SessionAuthentication to enforce pure statelessness.
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],

    # IsAuthenticated: all API endpoints require a valid JWT by default.
    # Individual views can override this to AllowAny (e.g., register/login).
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],

    # JSON renderer ensures all responses are JSON, even for errors.
    # Browsable API renderer is kept for development convenience — remove in prod.
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",  # Remove in production
    ],

    # Consistent JSON error responses for all validation errors and 4xx/5xx codes.
    "EXCEPTION_HANDLER": "rest_framework.views.exception_handler",

    # datetime format for all serializer DateTimeField outputs.
    # ISO 8601 is the universal standard and readable by JavaScript's Date().
    "DATETIME_FORMAT": "%Y-%m-%dT%H:%M:%S",
    
    # ── Architecture Principle: API First Design ───────────────────────────
    # Pagination ensures large datasets are split gracefully via ?page=x parameter
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,

    # Rate Limiting (Throttling) prevents abusive requests, DDoS or Brute force limits
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle"
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "100/day",     # Protects endpoints accessed without JWT (e.g. login)
        "user": "5000/day",    # Protects regular authenticated users
    }
}


# ─────────────────────────────────────────────────────────────────────────────
# 15. JWT SETTINGS (djangorestframework-simplejwt)
# ─────────────────────────────────────────────────────────────────────────────

SIMPLE_JWT = {
    # Access token lifetime: 15 minutes.
    # Architecture Principle: Short-lived access tokens reduce the exposure window
    # if a token is compromised.
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),

    # Refresh token lifetime: 7 days.
    # Long enough that users don't need to log in daily, short enough to
    # revoke access within a week if a device is lost.
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),

    # ROTATE_REFRESH_TOKENS=True: every time a refresh token is used to get
    # a new access token, a brand-new refresh token is also issued.
    # This means each refresh token can only be used ONCE, preventing replay attacks.
    "ROTATE_REFRESH_TOKENS": True,

    # BLACKLIST_AFTER_ROTATION=True: after rotating, the old refresh token is
    # added to a blacklist (stored in the DB) so it can never be reused even
    # if intercepted. Requires "rest_framework_simplejwt.token_blacklist" in INSTALLED_APPS.
    "BLACKLIST_AFTER_ROTATION": True,

    # Algorithm: HS256 uses our SECRET_KEY. RS256 (asymmetric) is better for
    # microservices but adds key management complexity — HS256 is fine for FYP.
    "ALGORITHM": "HS256",
    "SIGNING_KEY": config("DJANGO_SECRET_KEY"),  # Same as Django's SECRET_KEY

    # Token type claim adds "token_type": "access"/"refresh" inside the payload
    # so the server can reject an access token used as a refresh token.
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),

    # Header format: Authorization: Bearer <token>
    "AUTH_HEADER_TYPES": ("Bearer",),

    # USER_ID_FIELD: the field on the User model used as the JWT subject (sub) claim.
    # We keep it as "id" (the default BigAutoField primary key).
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
}


# ─────────────────────────────────────────────────────────────────────────────
# 16. CORS SETTINGS (django-cors-headers)
# ─────────────────────────────────────────────────────────────────────────────

# CORS (Cross-Origin Resource Sharing): browsers block cross-origin AJAX requests
# unless the server explicitly allows them. Our React app runs on port 5173
# and our Django API runs on port 8000 — different "origins" from the browser's POV.

# ── Architecture Principle: API First Design ───────────────────────────
# Allow any origin to connect for easy local testing of the voice service.
CORS_ALLOW_ALL_ORIGINS = True
# CORS_ALLOWED_ORIGINS = config(
#     "CORS_ALLOWED_ORIGINS",
#     default="http://localhost:5173,http://127.0.0.1:5173"
# ).split(",")

# Allow the browser to send the Authorization header with JWT across origins.
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",    # ← Required so Bearer token is sent to our API
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

# Allow credentials (cookies, auth headers) in cross-origin requests.
# Must be True for JWT in Authorization header with certain CORS policies.
CORS_ALLOW_CREDENTIALS = True


# ─────────────────────────────────────────────────────────────────────────────
# 17. SUPABASE REST API CREDENTIALS
# ─────────────────────────────────────────────────────────────────────────────

# These are used by the voice app and any direct Supabase REST calls.
# Stored here so any app can access them via django.conf.settings.
SUPABASE_URL = config("SUPABASE_URL")
SUPABASE_KEY = config("SUPABASE_KEY")


# ─────────────────────────────────────────────────────────────────────────────
# 18. GROQ API KEY (voice AI)
# ─────────────────────────────────────────────────────────────────────────────

# Used by apps/voice/llm.py to call Groq's Mistral model for intent extraction.
GROQ_API_KEY = config("GROQ_API_KEY", default="")


# ─────────────────────────────────────────────────────────────────────────────
# 19. LOGGING (basic — expand in production)
# ─────────────────────────────────────────────────────────────────────────────

# Structured logging sends WARNING-and-above to the console.
# In production replace console with a file or a service like Sentry.
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,  # Keep Django's built-in loggers active
    "formatters": {
        "verbose": {
            # Format: [LEVEL] [datetime] [module]: message
            "format": "[{levelname}] [{asctime}] [{module}]: {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "WARNING",  # Only warnings and errors in the console
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "INFO",          # Log INFO-level messages from Django itself
            "propagate": False,
        },
        "apps": {
            "handlers": ["console"],
            "level": "DEBUG",         # Log DEBUG-level messages from our own apps
            "propagate": False,
        },
    },
}
# ─────────────────────────────────────────────────────────────────────────────
# 20. EMAIL SETTINGS (SMTP via Gmail)
# ─────────────────────────────────────────────────────────────────────────────
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL')
