import os
import random
import uuid
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db import transaction

from faker import Faker
from apps.accounts.models import User
from apps.doctors.models import Doctor
from apps.patients.models import PatientProfile
from apps.appointments.models import Appointment
from apps.finance.models import Transaction
from apps.analytics.models import ClinicalMetric, FinancialMetric

fake = Faker(['en_PK'])

PAK_FIRST_NAMES = [
    "Ahmed", "Bilal", "Hamza", "Zoya", "Fatima", "Ayesha", "Omar", "Sami", "Ali", "Mustafa",
    "Khadija", "Maryam", "Zainab", "Hassan", "Hussain", "Farhan", "Nadia", "Saba", "Imran", "Kamran"
]
PAK_LAST_NAMES = [
    "Khan", "Ahmed", "Malik", "Sheikh", "Mirza", "Raza", "Hussain", "Javed", "Siddiqui", "Qureshi"
]

SPECIALIZATIONS = [
    "general", "cardiology", "dermatology", "neurology", 
    "orthopedics", "pediatrics", "psychiatry", "gynecology", "ent", "dentistry"
]

class Command(BaseCommand):
    help = '🧬 Seed the hospital core with 30 days of high-fidelity clinical and financial shards.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING("Starting Neural Clinical Seeding... (NON-ATOMIC MODE)"))
        
        doctors = self._seed_doctors(50)
        patients = self._seed_patients(100)
        self._seed_historical_matrix(doctors, patients, 30)
            
        self.stdout.write(self.style.SUCCESS("Neural Shards Successfully Initialized!"))

    def _seed_doctors(self, count):
        doctors = []
        for i in range(count):
            first_name = random.choice(PAK_FIRST_NAMES)
            last_name = random.choice(PAK_LAST_NAMES)
            email = f"dr.{uuid.uuid4().hex[:8]}@alshifaa.com"
            lic = f"PMDC-{random.randint(10000, 99999)}-Z"
            
            try:
                with transaction.atomic():
                    user = User.objects.create_user(
                        email=email,
                        password='doctor123',
                        first_name=first_name,
                        last_name=last_name,
                        role='doctor',
                        is_active=True
                    )
                    
                    doctor_profile = Doctor.objects.create(
                        user=user,
                        license_number=lic,
                        specialization=random.choice(SPECIALIZATIONS),
                        experience_years=random.randint(5, 25),
                        consultation_fee=random.randint(1500, 5000),
                        is_available=True,
                        slot_duration_minutes=30,
                        bio=f"Senior medical specialist focusing on high-fidelity patient care.",
                        clinic_address=f"Wing {random.randint(1, 10)}, Al Shifaa Hospital"
                    )
                    doctors.append(doctor_profile)
            except Exception as e:
                self.stdout.write(self.style.WARNING(f"Skipping Doctor {email}: {e}"))
                continue
        self.stdout.write(f"Injected {len(doctors)} Doctors.")
        return doctors

    def _seed_patients(self, count):
        patients = []
        for i in range(count):
            first_name = random.choice(PAK_FIRST_NAMES)
            last_name = random.choice(PAK_LAST_NAMES)
            email = f"p.{uuid.uuid4().hex[:8]}@gmail.com"
            
            try:
                with transaction.atomic():
                    user = User.objects.create_user(
                        email=email,
                        password='patient123',
                        first_name=first_name,
                        last_name=last_name,
                        role='patient',
                        is_active=True
                    )
                    
                    patient_profile = PatientProfile.objects.create(
                        user=user,
                        date_of_birth=(timezone.now() - timedelta(days=random.randint(6570, 29200))).date(),
                        blood_group=random.choice(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']),
                        address=f"{fake.street_address()}, {fake.city()}",
                        emergency_contact_phone=f"+92-3{random.randint(00, 49)}-{random.randint(1000000, 9999999)}"
                    )
                    patients.append(patient_profile)
            except Exception as e:
                self.stdout.write(self.style.WARNING(f"Skipping Patient {email}: {e}"))
                continue
        self.stdout.write(f"Injected {len(patients)} Patients.")
        return patients

    def _seed_historical_matrix(self, doctors, patients, days):
        now = timezone.now()
        start_date = (now - timedelta(days=days)).date()
        
        for day_offset in range(days + 1):
            target_date = start_date + timedelta(days=day_offset)
            
            num_appointments = random.randint(15, 30)
            daily_revenue = 0
            
            # Start small transaction for each day
            with transaction.atomic():
                for _ in range(num_appointments):
                    doctor = random.choice(doctors)
                    patient = random.choice(patients)
                    
                    status = 'completed' if target_date < now.date() else 'pending'
                    start_hour = random.randint(9, 16)
                    start_time = datetime.strptime(f"{start_hour}:00", "%H:%M").time()
                    end_time = (datetime.combine(target_date, start_time) + timedelta(minutes=30)).time()
                    
                    try:
                        # Direct create for speed
                        Appointment.objects.create(
                            patient=patient.user,
                            doctor=doctor,
                            appointment_date=target_date,
                            start_time=start_time,
                            end_time=end_time,
                            status=status,
                            booked_via_voice=random.choice([True, False, False, False])
                        )
                        
                        if status == 'completed':
                            fee = float(doctor.consultation_fee)
                            daily_revenue += fee
                            
                            Transaction.objects.create(
                                patient=patient,
                                type='INCOME',
                                method=random.choice(['CASH', 'CARD', 'TRANSFER']),
                                amount=fee,
                                status='completed',
                                description=f"Consultation Fee - {doctor.user.get_full_name()}"
                            )
                    except: continue # Skip slots already taken
                
                # 📊 Sync Analytics Shards
                ClinicalMetric.objects.update_or_create(
                    date=target_date,
                    defaults={
                        'total_patients': PatientProfile.objects.count() - random.randint(0, 5),
                        'lab_tests_performed': random.randint(5, 25),
                        'bed_occupancy_rate': random.randint(50, 90)
                    }
                )
                FinancialMetric.objects.update_or_create(
                    date=target_date,
                    defaults={
                        'total_revenue': daily_revenue,
                        'total_expenses': daily_revenue * 0.45
                    }
                )
            
            self.stdout.write(f"Synced Shards for {target_date} -> Revenue: {daily_revenue} PKR")
