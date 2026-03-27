import requests
import psycopg2
from decouple import config

url = config("SUPABASE_URL", default="https://omnaldqboytnrlhqvjxo.supabase.co")
key = config("SUPABASE_KEY", default="sb_publishable_rahWbWBBAnJ3ZBN9ZrJN_w_kDZTAIoq")
db_password = config("SUPABASE_DB_PASSWORD", default="4lJNPQBwSqwGkpE7")

print("1. Testing Supabase REST API (URL & Key)...")
try:
    headers = {"apikey": key, "Authorization": f"Bearer {key}"}
    res = requests.get(f"{url}/rest/v1/", headers=headers, timeout=5)
    if res.status_code == 200:
        print("✅ REST API Connection Successful!")
    else:
        print(f"❌ REST API Failed with status {res.status_code}: {res.text}")
except Exception as e:
    print("❌ REST API Error:", str(e))

print("\n2. Testing PostgreSQL Direct Connection (Password)...")
# Project ref extracted from URL: omnaldqboytnrlhqvjxo
# Direct connection string: db.omnaldqboytnrlhqvjxo.supabase.co
# Note: Supabase is transitioning to IPv6-only for direct connections, this might fail depending on network.
try:
    conn = psycopg2.connect(
        host=config("DB_HOST", default="aws-1-ap-southeast-1.pooler.supabase.com"),
        database=config("DB_NAME", default="postgres"),
        user=config("DB_USER", default="postgres.omnaldqboytnrlhqvjxo"),
        password=db_password,
        port=config("DB_PORT", default=5432, cast=int),
        connect_timeout=5
    )
    print("✅ Database Connection Successful!")
    conn.close()
except Exception as e:
    print("❌ Database Connection Error:", str(e))
    print("   (Note: Supabase now prefers IPv6 or connection poolers for DB connections.)")
