import firebase_admin
from firebase_admin import credentials, auth
import json
from decouple import config

def initialize_firebase():
    """Initializes Firebase Admin SDK if not already initialized."""
    if not firebase_admin._apps:
        try:
            # Fetch JSON string from .env
            service_account_json = config("FIREBASE_SERVICE_ACCOUNT_JSON")
            # Parse and initialize
            cred_dict = json.loads(service_account_json)
            cred = credentials.Certificate(cred_dict)
            firebase_admin.initialize_app(cred)
        except Exception as e:
            print(f"Error initializing Firebase Admin: {e}")

def verify_firebase_token(id_token):
    """Verifies a Firebase ID token and returns the decoded claims."""
    initialize_firebase()
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        print(f"Firebase token verification failed: {e}")
        return None
