# Hospital Management System: Backend Architecture & Explanation

Welcome to the backend documentation for your AI-Powered Hospital Management System! This document is designed to teach you exactly how the backend is structured, how data flows, and what purpose each core component serves.

At a high level, this system is built using **Django** and **Django REST Framework (DRF)**. It provides a robust API for the frontend (or mobile apps) to communicate with. 

---

## 🏗️ 1. Project Structure

The project lives under the `backend/` directory, which is divided into two primary logical areas: the **configuration** (`config/`) and the **applications** (`apps/`).

### `config/` (The Brain)
- `settings.py`: The control center of the backend. It contains database connections (Supabase/PostgreSQL), installed apps, security keys, and CORS (Cross-Origin Resource Sharing) settings.
- `urls.py`: The central router. When a request hits your server (e.g., `GET /api/v1/doctors/`), this file figures out which app should handle it.

### `apps/` (The Limbs)
Django encourages breaking a project into smaller, focused "apps". 
1. **`accounts`**: Handles Users, Authentication, and Permissions.
2. **`doctors`**: Manages doctor profiles, specializations, and schedules.
3. **`appointments`**: Handles booking, cancellations, and doctor availability logic.
4. **`voice`**: Connects with AI (Groq LLM / Edge-TTS) to process Urdu voice inputs.

---

## 🗄️ 2. How Data is Stored (Models)

Models (`models.py`) are Python classes that define the structure of your database tables. By using an **ORM (Object-Relational Mapper)**, Django allows you to write Python code instead of raw SQL.

### `accounts/models.py` (The `User` Model)
Instead of using Django's default user, we built a **Custom User Model**.
- **The Magic**: We changed the login field from `username` to `email`. 
- **Role-Based Access Control (RBAC)**: It has a `role` field (`admin`, `doctor`, or `patient`). All permissions in the system check this field (e.g., "Is this user a doctor? If not, block them").
- **Table Name**: `hospital_users`. (Explicitly named to avoid colliding with Supabase's built-in auth).

### `doctors/models.py` (The `Doctor` Model)
- **OneToOneField**: Every Doctor profile links back to exactly ONE User account. This keeps the medical data (like `consultation_fee`, `specialization`, and `license_number`) physically separate from login credentials.

### `appointments/models.py` (The `Appointment` Model)
- **ForeignKeys**: Links 1 Patient to 1 Doctor. `on_delete=PROTECT` ensures we don't accidentally delete medical records if a patient leaves the app.
- **Constraints**: We added a `UniqueConstraint` for `[doctor, appointment_date, start_time]`. This guarantees at the database level that a doctor can NEVER be double-booked for the exact same second.

---

## 🚦 3. How Requests are Handled (Views & Serializers)

When a REST API request arrives, two things mainly interact with it:

1. **Serializers (`serializers.py`)**: Think of these as "Translators". 
   - When a frontend sends **JSON** data, a serializer translates it into a **Python Object/Database Row**. 
   - When the database sends back a row, the serializer translates it into **JSON** for the frontend.
2. **Views (`views.py`)**: The managers. They check user permissions, fetch the requested data via the ORM, pass it through the serializer, and return an HTTP Response (like `200 OK` or `404 Not Found`).

### The Booking Flow Example (`appointments/views.py`)
When a patient sends a `POST /api/v1/appointments/` request:
1. **Idempotency Check**: The view checks the `Idempotency-Key` header. If a patient accidentally clicks "Book" twice due to lag, it prevents the second identical request.
2. **Transaction Locking (`select_for_update`)**: The database momentarily "locks" the doctor's table row to prevent two patients from booking the exact same time simultaneously (Race Conditions).
3. **Save & Cache Invalidation**: The appointment is saved, and the system automatically tells the `services.py` layer to wipe the old cache so the frontend always sees the most up-to-date schedule.

---

## 🚀 4. The Advanced DSA & OOP Layer (`services.py`)

To make the system "Fast & Advanced", we moved heavy computation out of the `views.py` and into `services.py`. 

**The Problem**: Searching for available appointment slots means looking at a Doctor's 9:00 AM to 5:00 PM shift, checking every single 30-minute block against every single booked appointment in the database. As appointments grow, this requires slow, "nested `for` loops" (`O(N*M)` complexity).

**The Solution (`FastSlotAlgorithmService`)**:
1. **OOP (Object-Oriented Programming)**: We created an `AbstractAvailabilityService` interface. This heavily decouples our logic. The Views don't care *how* slots are calculated, they just call `.get_available_slots()`.
2. **DSA (Data Structures)**: 
   - **Hash Sets (`set()` in Python)**: Instead of looping over all bookings to check for overlaps, we insert all booked times into a Set. Checking if a 30-minute block exists in a Set takes **`O(1)` (instant)** time, drastically dropping CPU load.
   - **LRU Cache (Least Recently Used Cache)**: Built via `collections.OrderedDict`, this acts like RAM in our server. If Patient A queries Doctor X's schedule for tomorrow, the server computes it and stores it in the Cache. If Patient B queries the identical thing 2 seconds later, the server skips the database entirely and returns the cached list instantly (`O(1)` time complexity).

### API Endpoint Trigger:
Defined in `doctors/views.py`: 
Calling `GET /api/v1/doctors/{id}/available_slots/?date=2024-03-15` triggers this advanced `services` layer and returns all open holes in the doctor's schedule.

---

## 🤖 5. Summary: How to Read the Code
If you want to track how a feature works in this backend, follow this cycle:
1. Open `config/urls.py` -> See which app it points to.
2. Open the app's `urls.py` -> See which View handles the endpoint.
3. Open `views.py` -> Read what logic happens and which Serializer is called.
4. Open `serializers.py` -> See what data fields are expected or validated.
5. Open `models.py` -> Look at how the data is actually structured in PostgreSQL.
6. Open `services.py` -> See the heavy-lifting logic and advanced algorithms.
