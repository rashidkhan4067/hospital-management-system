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
        self.stdout.write(self.style.MIGRATE_HEADING("Starting Neural Clinical Seeding... (Optimized Shard Flow)"))
        
        doctors = self._seed_doctors(50)
        patients = self._seed_patients(100)
        self._seed_historical_matrix(doctors, patients, 30)
            
        self.stdout.write(self.style.SUCCESS("Neural Shards Successfully Initialized!"))

    def _seed_doctors(self, count):
        doctors = []
        for i in range(count):
            first_name = random.choice(PAK_FIRST_NAMES)
            last_name = random.choice(PAK_LAST_NAMES)
            email = f"dr.{total_random_string()}@alshifaa.com"
            lic = f"PMDC-{random.randint(10000, 99999)}-Z"
            
            try:
                user = User.objects.filter(role='doctor').order_by('?').first() 
                if user and i < 10: # Reuse some if existing? No, user wants 50 doctors.
                    pass # Keep going

                user, created = User.objects.get_or_create(
                    email=email,
                    defaults={
                        'first_name': first_name,
                        'last_name': last_name,
                        'role': 'doctor',
                        'is_active': True
                    }
                )
                if created: user.set_password('doctor123'); user.save()
                
                doctor_profile, _ = Doctor.objects.get_or_create(
                    user=user,
                    defaults={
                        'license_number': lic,
                        'specialization': random.choice(SPECIALIZATIONS),
                        'experience_years': random.randint(5, 25),
                        'consultation_fee': random.randint(1500, 5000),
                        'is_available': True,
                        'bio': f"Senior clinical specialist - {random.choice(SPECIALIZATIONS)}.",
                    }
                )
                doctors.append(doctor_profile)
            except: continue
        return doctors or list(Doctor.objects.all())

    def _seed_patients(self, count):
        patients = []
        for i in range(count):
            first_name = random.choice(PAK_FIRST_NAMES)
            last_name = random.choice(PAK_LAST_NAMES)
            email = f"p.{total_random_string()}@gmail.com"
            
            try:
                user, created = User.objects.get_or_create(
                    email=email,
                    defaults={
                        'first_name': first_name,
                        'last_name': last_name,
                        'role': 'patient',
                    }
                )
                if created: user.set_password('patient123'); user.save()
                
                patient_profile, _ = PatientProfile.objects.get_or_create(
                    user=user,
                    defaults={
                        'date_of_birth': (timezone.now() - timedelta(days=random.randint(3650, 25000))).date(),
                        'blood_group': random.choice(['A+', 'B+', 'O+', 'AB+']),
                        'address': f"{fake.street_address()}, {fake.city()}",
                    }
                )
                patients.append(patient_profile)
            except: continue
        return patients or list(PatientProfile.objects.all())

    def _seed_historical_matrix(self, doctors, patients, days):
        now = timezone.now()
        start_date = (now - timedelta(days=days)).date()
        
        for day_offset in range(days + 1):
            target_date = start_date + timedelta(days=day_offset)
            num_appointments = random.randint(10, 25)
            daily_rev = 0
            
            with transaction.atomic():
                for _ in range(num_appointments):
                    doc = random.choice(doctors)
                    pat = random.choice(patients)
                    
                    status = 'completed' if target_date < now.date() else 'pending'
                    st = datetime.strptime(f"{random.randint(9,16)}:00", "%H:%M").time()
                    
                    try:
                        Appointment.objects.create(
                            patient=pat.user,
                            doctor=doc,
                            appointment_date=target_date,
                            start_time=st,
                            end_time=(datetime.combine(target_date, st) + timedelta(minutes=30)).time(),
                            status=status,
                            booked_via_voice=random.choice([True, False, False, False])
                        )
                        if status == 'completed':
                            fee = float(doc.consultation_fee)
                            daily_rev += fee
                            Transaction.objects.create(
                                patient=pat, type='INCOME', amount=fee, status='completed'
                            )
                    except: continue
                
                # 📊 Corrected Metrics Shards
                ClinicalMetric.objects.update_or_create(
                    date=target_date,
                    defaults={
                        'total_patients': len(patients) + random.randint(0, 50),
                        'admitted_patients': random.randint(5, 20),
                        'critical_cases': random.randint(0, 5),
                        'lab_tests_performed': random.randint(10, 30),
                    }
                )
                FinancialMetric.objects.update_or_create(
                    date=target_date,
                    defaults={
                        'total_revenue': daily_rev,
                        'total_expenses': daily_rev * 0.4,
                    }
                )
            self.stdout.write(f"Commited Shards for {target_date} | Total Revenue: {daily_rev}")

def total_random_string():
    return uuid.uuid4().hex[:10]
