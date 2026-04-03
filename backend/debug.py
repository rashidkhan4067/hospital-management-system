from django.core.management import setup_environ
import json
print(len(json.dumps({'email': ['user with this email already exists.']})))
