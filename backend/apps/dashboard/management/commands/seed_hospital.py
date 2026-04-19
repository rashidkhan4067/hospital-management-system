import random
from datetime import datetime, timedelta, time
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db import transaction
from apps.accounts.models import User
from apps.doctors.models import Doctor
from apps.patients.models import PatientProfile, ClinicalRecord
from apps.appointments.models import Appointment
from apps.finance.models import Transaction, Invoice, InvoiceItem
from apps.pharmacy.models import Medicine
from apps.lab.models import TestResult, LabTest
from apps.wards.models import Ward, Bed
from apps.system.models import Department

class Command(BaseCommand):
    help = "Seeds the database with realistic hospital data for dashboard widgets."

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING("Starting database seed..."))
        
        try:
            self.clean_database()
            
            # Step 1: Core Users & Profiles
            with transaction.atomic():
                admin = self.create_admin()
                doctors = self.create_doctors()
                patients = self.create_patients()
                medicines = self.create_medicines()
                lab_tests = self.create_lab_tests()
                wards = self.create_wards_and_beds()
            
            # Step 2: Appointments (Resilient to conflicts)
            appointments = self.create_appointments(doctors, patients)
            
            # Step 3: Dependent Data
            with transaction.atomic():
                self.create_finance_data(patients, appointments)
                self.create_clinical_records(patients, doctors)
                self.create_lab_results(patients, lab_tests)
                
            self.stdout.write(self.style.SUCCESS("Successfully seeded database!"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Seed failed: {str(e)}"))
            raise e

    def create_wards_and_beds(self):
        self.stdout.write("Creating wards and beds...")
        import random
        depts = ['General Medicine', 'Surgery', 'Pediatrics', 'Cardiology', 'Emergency']
        dept_objs = []
        for d_name in depts:
            dept, _ = Department.objects.get_or_create(name=d_name, defaults={'code': d_name[:3].upper()})
            dept_objs.append(dept)

        ward_names = ['Male Ward', 'Female Ward', 'ICU', 'Emergency Bay', 'Operation Theater']
        wards = []
        for i, w_name in enumerate(ward_names):
            ward, _ = Ward.objects.get_or_create(
                code=f"W-{i+1}",
                defaults={
                    'name': w_name,
                    'department': dept_objs[i % len(dept_objs)],
                    'floor': (i // 2) + 1
                }
            )
            wards.append(ward)

        for ward in wards:
            bed_count = 10 if 'ICU' not in ward.name else 5
            for j in range(1, bed_count + 1):
                Bed.objects.get_or_create(
                    ward=ward,
                    bed_number=f"{j:02d}",
                    defaults={
                        'bed_type': 'icu' if 'ICU' in ward.name else 'general',
                        'status': 'occupied' if random.random() > 0.4 else 'available'
                    }
                )
        return wards

    def clean_database(self):
        self.stdout.write("Cleaning existing records (Resilient Mode)...")
        from django.db import connection
        
        # Order matters due to PROTECT constraints
        models = [
            InvoiceItem, Invoice, Transaction, Appointment, ClinicalRecord,
            TestResult, LabTest, Medicine, Doctor, PatientProfile, User
        ]
        
        for model in models:
            self.stdout.write(f"  - Deleting {model.__name__}...", ending="")
            try:
                with connection.cursor() as cursor:
                    cursor.execute("SET statement_timeout = '300s';")
                model.objects.all().delete()
                self.stdout.write(self.style.SUCCESS(" OK"))
            except Exception as e:
                self.stdout.write(self.style.WARNING(f" SKIPPED ({str(e)})"))

    def create_admin(self):
        self.stdout.write("Creating admin...")
        admin, created = User.objects.get_or_create(
            email="admin@shifaa.com",
            defaults={
                "first_name": "System",
                "last_name": "Administrator",
                "role": User.Role.ADMIN,
                "is_staff": True,
                "is_superuser": True
            }
        )
        if created:
            admin.set_password("adminpassword123")
            admin.save()
        return admin

    def create_doctors(self):
        self.stdout.write("Creating doctors...")
        specializations = [
            Doctor.Specialization.CARDIOLOGY,
            Doctor.Specialization.DERMATOLOGY,
            Doctor.Specialization.NEUROLOGY,
            Doctor.Specialization.PEDIATRICS,
            Doctor.Specialization.GENERAL,
            Doctor.Specialization.ORTHOPEDICS,
            Doctor.Specialization.PSYCHIATRY,
        ]
        
        doctors = []
        names = [
            ("Ahmed", "Khan"), ("Sara", "Ahmed"), ("Usman", "Malik"), 
            ("Zainab", "Bibi"), ("Bilal", "Siddiqui"), ("Ayesha", "Gul"),
            ("Hamza", "Ali")
        ]
        
        for i, (fname, lname) in enumerate(names):
            user, created = User.objects.get_or_create(
                email=f"doctor{i+1}@shifaa.com",
                defaults={
                    "first_name": fname,
                    "last_name": lname,
                    "role": User.Role.DOCTOR,
                    "phone_number": f"0300{random.randint(1000000, 9999999)}"
                }
            )
            if created:
                user.set_password("password123")
                user.save()
            # Ensure doctor profile exists (explicitly to avoid signal lag)
            doctor, _ = Doctor.objects.get_or_create(
                user=user,
                defaults={
                    'license_number': f"LIC-{random.randint(10000, 99999)}",
                    'specialization': specializations[i % len(specializations)]
                }
            )
            doctor.specialization = specializations[i % len(specializations)]
            doctor.experience_years = random.randint(5, 25)
            doctor.consultation_fee = random.choice([1500, 2000, 3000, 5000])
            doctor.available_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            doctor.consultation_start_time = time(9, 0)
            doctor.consultation_end_time = time(17, 0)
            doctor.slot_duration_minutes = 30
            doctor.bio = f"Experienced specialist in {doctor.get_specialization_display()}."
            doctor.save()
            doctors.append(doctor)
        return doctors

    def create_patients(self):
        self.stdout.write("Creating patients...")
        patients = []
        patient_names = [
            ("Muhammad", "Irfan"), ("Fatima", "Zahra"), ("Ali", "Raza"),
            ("Sana", "Javed"), ("Omer", "Farooq"), ("Khadija", "Rehman"),
            ("Hassan", "Abbas"), ("Maryam", "Nawaz"), ("Zaid", "Hamid"),
            ("Bushra", "Ansari")
        ]
        
        for i, (fname, lname) in enumerate(patient_names):
            user, created = User.objects.get_or_create(
                email=f"patient{i+1}@example.com",
                defaults={
                    "first_name": fname,
                    "last_name": lname,
                    "role": User.Role.PATIENT,
                    "phone_number": f"0321{random.randint(1000000, 9999999)}"
                }
            )
            if created:
                user.set_password("password123")
                user.save()
            profile, _ = PatientProfile.objects.get_or_create(user=user)
            profile.blood_group = random.choice(['A+', 'B+', 'O+', 'AB+'])
            profile.date_of_birth = timezone.now().date() - timedelta(days=random.randint(365*18, 365*70))
            profile.gender = random.choice(['Male', 'Female'])
            profile.address = f"House {random.randint(1, 500)}, Street {random.randint(1, 20)}, Lahore"
            profile.is_admitted = random.random() < 0.2
            if profile.is_admitted:
                profile.room_number = f"R-{random.randint(101, 510)}"
            profile.save()
            patients.append(profile)
        return patients

    def create_medicines(self):
        self.stdout.write("Creating medicines...")
        medicines_data = [
            ("Panadol", 500, 50, 'analgesics'), ("Augmentin", 250, 20, 'antibiotics'), 
            ("Brufen", 600, 40, 'analgesics'), ("Arinac", 150, 30, 'analgesics'), 
            ("Flagyl", 300, 25, 'antibiotics'), ("Softin", 100, 10, 'analgesics'),
            ("Risek", 200, 15, 'analgesics'), ("Loprin", 400, 100, 'cardiac')
        ]
        medicines = []
        for i, (name, price, stock, cat) in enumerate(medicines_data):
            med = Medicine.objects.create(
                name=name,
                category=cat,
                unit_price=price,
                stock_quantity=stock,
                reorder_level=20,
                expiry_date=timezone.now().date() + timedelta(days=random.randint(365, 365*3)),
                batch_number=f"BAT-{1000 + i}"
            )
            medicines.append(med)
        return medicines

    def create_lab_tests(self):
        self.stdout.write("Creating lab tests...")
        tests = [
            ("CBC", 1200, "Hematology"), ("Blood Sugar", 500, "Biochemistry"), 
            ("Liver Function Test", 2500, "Biochemistry"),
            ("Kidney Function Test", 2200, "Biochemistry"), 
            ("Lipid Profile", 3000, "Biochemistry"), ("Thyroid Test", 3500, "Immunology")
        ]
        lab_tests = []
        for name, price, cat in tests:
            lt = LabTest.objects.create(
                name=name, 
                base_price=price, 
                category=cat,
                turnaround_time="24 hours"
            )
            lab_tests.append(lt)
        return lab_tests

    def create_appointments(self, doctors, patients):
        self.stdout.write("Creating appointments...")
        appointments = []
        now = timezone.now().date()
        
        # Past appointments (completed)
        for i in range(15):
            patient = random.choice(patients)
            doctor = random.choice(doctors)
            appt_date = now - timedelta(days=random.randint(1, 30))
            appt_time = time(10, 0)
            try:
                appt = Appointment.objects.create(
                    patient=patient.user,
                    doctor=doctor,
                    appointment_date=appt_date,
                    start_time=appt_time,
                    end_time=(datetime.combine(appt_date, appt_time) + timedelta(minutes=doctor.slot_duration_minutes)).time(),
                    status=Appointment.Status.COMPLETED,
                    payment_status=Appointment.PaymentStatus.FULLY_PAID,
                    notes="Follow up checkup.",
                    doctor_notes="Patient is recovering well.",
                    created_at=timezone.make_aware(datetime.combine(appt_date, time(8, 0)))
                )
                appointments.append(appt)
            except:
                pass
            
        # Upcoming appointments
        for i in range(10):
            patient = random.choice(patients)
            doctor = random.choice(doctors)
            appt_date = now + timedelta(days=random.randint(0, 10))
            appt_time = time(random.randint(9, 16), random.choice([0, 30]))
            
            try:
                appt = Appointment.objects.create(
                    patient=patient.user,
                    doctor=doctor,
                    appointment_date=appt_date,
                    start_time=appt_time,
                    end_time=(datetime.combine(appt_date, appt_time) + timedelta(minutes=doctor.slot_duration_minutes)).time(),
                    status=random.choice([Appointment.Status.PENDING, Appointment.Status.CONFIRMED]),
                    payment_status=random.choice([Appointment.PaymentStatus.UNPAID, Appointment.PaymentStatus.PARTIALLY_PAID]),
                    notes="General consultation."
                )
                appointments.append(appt)
            except:
                pass
        return appointments

    def create_finance_data(self, patients, appointments):
        self.stdout.write("Creating finance data...")
        for appt in appointments:
            if appt.status == Appointment.Status.COMPLETED or random.random() > 0.3:
                # Create Invoice
                invoice = Invoice.objects.create(
                    patient=appt.patient.patient_profile,
                    appointment=appt,
                    paid_amount=appt.doctor.consultation_fee if appt.payment_status == Appointment.PaymentStatus.FULLY_PAID else 0,
                    due_date=appt.appointment_date + timedelta(days=7)
                )
                InvoiceItem.objects.create(
                    invoice=invoice,
                    name=f"Consultation - Dr. {appt.doctor.user.last_name}",
                    item_type='CONSULTATION',
                    unit_price=appt.doctor.consultation_fee,
                    quantity=1
                )
                
                if appt.payment_status == Appointment.PaymentStatus.FULLY_PAID:
                    Transaction.objects.create(
                        patient=appt.patient.patient_profile,
                        type='INCOME',
                        method=random.choice(['CASH', 'CARD']),
                        amount=invoice.total_amount,
                        description=f"Payment for Invoice {invoice.invoice_no}",
                        status='completed',
                        timestamp=appt.created_at
                    )

    def create_clinical_records(self, patients, doctors):
        self.stdout.write("Creating clinical records...")
        diagnoses = ["Hypertension", "Type 2 Diabetes", "Common Cold", "Migraine", "Gastritis", "Anemia"]
        for patient in patients:
            if random.random() > 0.4:
                ClinicalRecord.objects.create(
                    patient=patient,
                    doctor=random.choice(doctors),
                    diagnosis=random.choice(diagnoses),
                    clinical_notes="Patient presented with standard symptoms. Prescribed bed rest and hydration.",
                    blood_pressure="120/80",
                    temperature="98.6 F",
                    heart_rate="72 bpm"
                )

    def create_lab_results(self, patients, lab_tests):
        self.stdout.write("Creating lab results...")
        for patient in patients:
            if random.random() > 0.5:
                test = random.choice(lab_tests)
                TestResult.objects.create(
                    patient=patient,
                    test=test,
                    result_value="Normal",
                    status="completed",
                    result_date=timezone.now()
                )
