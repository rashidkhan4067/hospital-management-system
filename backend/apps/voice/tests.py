from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from apps.accounts.models import User
from apps.doctors.models import Doctor
from apps.appointments.models import Appointment
from apps.voice.models import VoiceSession
import datetime

class VoiceBookingTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        # 1. Create a Doctor
        self.doc_user = User.objects.create_user(
            email="dr.smith@hospital.com",
            password="password123",
            first_name="John",
            last_name="Smith",
            role=User.Role.DOCTOR
        )
        # Ensure doctor is available EVERY DAY for the test
        self.doctor = Doctor.objects.create(
            user=self.doc_user,
            specialization=Doctor.Specialization.GENERAL,
            license_number="TEST-123",
            is_available=True,
            consultation_start_time=datetime.time(9, 0),
            consultation_end_time=datetime.time(17, 0),
            slot_duration_minutes=30,
            available_days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        )
        
        # 2. Existing Patient
        self.patient = User.objects.create_user(
            email="patient@test.com",
            password="password123",
            first_name="Jane",
            last_name="Doe",
            role=User.Role.PATIENT
        )

    def test_authenticated_booking_flow(self):
        """Test that a logged-in user can book via voice session logic."""
        # Use a day that is tomorrow regardless of today
        test_date = datetime.date.today() + datetime.timedelta(days=1)
        
        session = VoiceSession.objects.create(
            user=self.patient,
            doctor_name="Smith",
            appointment_date=test_date,
            appointment_time=datetime.time(10, 0),
            is_awaiting_confirmation=True
        )
        
        from apps.voice.views import FullVoicePipelineView
        view = FullVoicePipelineView()
        
        # Trigger real booking logic
        response = view._do_book_appointment("confirm reservation", self.patient, session)
        
        # Verify success
        self.assertEqual(response.status_code, 200)
        data = response.getvalue().decode('utf-8')
        self.assertIn("confirmed", data.lower())
        
        # Check DB
        booking = Appointment.objects.filter(patient=self.patient, doctor=self.doctor).first()
        self.assertIsNotNone(booking)
        self.assertTrue(booking.booked_via_voice)

    def test_guest_registration_flow(self):
        """Test guest path results in a new User and Appointment."""
        guest_email = "newuser@test.com"
        test_date = datetime.date.today() + datetime.timedelta(days=1)
        
        # Create Guest User
        new_patient = User.objects.create_user(
            email=guest_email,
            password="random-pass",
            first_name="New",
            last_name="Patient",
            role=User.Role.PATIENT
        )

        session = VoiceSession.objects.create(
            user=self.doc_user, # dummy owner
            guest_email=guest_email,
            guest_name="New Patient",
            doctor_name="Smith",
            appointment_date=test_date,
            appointment_time=datetime.time(14, 0),
            is_awaiting_confirmation=True
        )
        
        from apps.voice.views import FullVoicePipelineView
        view = FullVoicePipelineView()
        
        response = view._do_book_appointment("yes book it", new_patient, session)
        
        self.assertEqual(response.status_code, 200)
        data = response.getvalue().decode('utf-8')
        self.assertIn("confirmed", data.lower()) # Check for confirmation in guest flow too
        
        booking = Appointment.objects.filter(patient__email=guest_email, doctor=self.doctor).first()
        self.assertIsNotNone(booking)
