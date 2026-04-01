import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.doctors.models import Doctor
from django.db import transaction

User = get_user_model()

class Command(BaseCommand):
    help = "Seed the database with 20 real-world Pakistani doctors across various fields."

    def handle(self, *args, **options):
        # Data pool of 20 realistic Pakistani doctors
        doctors_data = [
            {"first_name": "Ahmed", "last_name": "Khan", "spec": "cardiology", "fee": 2500, "edu": "MBBS, FCPS (Cardiology)", "loc": "Cardiac Wing, Level 4"},
            {"first_name": "Sarah", "last_name": "Ahmed", "spec": "neurology", "fee": 3000, "edu": "MBBS, MRCP (Neurology)", "loc": "Neuro-Sciences Unit, Wing B"},
            {"first_name": "Zain", "last_name": "Ali", "spec": "dentistry", "fee": 2000, "edu": "BDS, RDS (Dental Surgery)", "loc": "Dental Hub, Floor 1"},
            {"first_name": "Ayesha", "last_name": "Malik", "spec": "dermatology", "fee": 1800, "edu": "MBBS, MD (Dermatology)", "loc": "Skin Care Dept, Level 2"},
            {"first_name": "Bilal", "last_name": "Siddiqui", "spec": "orthopedics", "fee": 2200, "edu": "MBBS, FRCS (Orthopedics)", "loc": "Bone & Joint Center"},
            {"first_name": "Fatima", "last_name": "Javed", "spec": "pediatrics", "fee": 1500, "edu": "MBBS, DCH (Pediatrics)", "loc": "Childrens Hospital Wing"},
            {"first_name": "Hamza", "last_name": "Raza", "spec": "psychiatry", "fee": 2800, "edu": "MBBS, MCPS (Psychiatry)", "loc": "Behavioral Sciences Unit"},
            {"first_name": "Hina", "last_name": "Bakar", "spec": "gynecology", "fee": 2500, "edu": "MBBS, FCPS (Gynae)", "loc": "Womens Health Center"},
            {"first_name": "Usman", "last_name": "Ghani", "spec": "ophthalmology", "fee": 1500, "edu": "MBBS, DOMS (Eye)", "loc": "Vision Center, Ground Floor"},
            {"first_name": "Kiran", "last_name": "Shah", "spec": "ent", "fee": 1200, "edu": "MBBS, DLO (ENT)", "loc": "ENT Specialty Wing"},
            {"first_name": "Imran", "last_name": "Abbas", "spec": "oncology", "fee": 4000, "edu": "MBBS, MD (Oncology), FRCP", "loc": "Cancer Care Unit, Level 5"},
            {"first_name": "Sana", "last_name": "Mansoori", "spec": "radiology", "fee": 1000, "edu": "MBBS, DMRD (Radiology)", "loc": "Diagnostic Imaging Wing"},
            {"first_name": "Omer", "last_name": "Farooq", "spec": "emergency", "fee": 0, "edu": "MBBS, MCPS-ER", "loc": "ER Trauma Center"},
            {"first_name": "Madiha", "last_name": "Riaz", "spec": "internal", "fee": 1800, "edu": "MBBS, FCPS (Medicine)", "loc": "OPD Block A"},
            {"first_name": "Nabeel", "last_name": "Qureshi", "spec": "dentistry", "fee": 2200, "edu": "BDS, MDS (Endodontist)", "loc": "Dental Hub, Floor 1"},
            {"first_name": "Rabia", "last_name": "Bashir", "spec": "pediatrics", "fee": 1400, "edu": "MBBS, FCPS (Pediatrics)", "loc": "Childrens Hospital Wing"},
            {"first_name": "Waseem", "last_name": "Akram", "spec": "orthopedics", "fee": 3500, "edu": "MBBS, FRCS (UK), Orthopedics", "loc": "Sports Medicine Center"},
            {"first_name": "Zoya", "last_name": "Hassan", "spec": "neurology", "fee": 3200, "edu": "MBBS, FCPS (Neurology)", "loc": "Neuro-Sciences Unit, Wing B"},
            {"first_name": "Kamran", "last_name": "Jamil", "spec": "cardiology", "fee": 2800, "edu": "MBBS, FCPS (Cardiology)", "loc": "Cardiac Wing, Level 4"},
            {"first_name": "Tehmina", "last_name": "Durrani", "spec": "psychiatry", "fee": 3000, "edu": "MBBS, MD (Psychiatry)", "loc": "Behavioral Sciences Unit"},
        ]

        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        try:
            with transaction.atomic():
                for i, data in enumerate(doctors_data):
                    email = f"{data['first_name'].lower()}.{data['last_name'].lower()}@alshifaaclinic.com"
                    
                    # 1. Create/Update User
                    user, created = User.objects.get_or_create(
                        email=email,
                        defaults={
                            "first_name": data["first_name"],
                            "last_name": data["last_name"],
                            "role": "doctor",
                            "phone_number": f"03{random.randint(0,9)}{random.randint(1000000, 9999999)}"
                        }
                    )
                    
                    if created:
                        user.set_password("doctor123")
                        user.save()

                    # 2. Update/Create Doctor Profile
                    Doctor.objects.update_or_create(
                        user=user,
                        defaults={
                            "license_number": f"PMDC-{10000 + i}",
                            "specialization": data["spec"],
                            "experience_years": random.randint(3, 25),
                            "consultation_fee": data["fee"],
                            "available_days": random.sample(days, 3),
                            "consultation_start_time": "09:00:00",
                            "consultation_end_time": "17:00:00",
                            "slot_duration_minutes": 30,
                            "education": data["edu"],
                            "clinic_address": data["loc"],
                            "bio": f"Highly distinguished specialist in {data['spec']} with a stellar record of clinical excellence at Al Shifaa. Dedicated to providing personalized, patient-centric care using state-of-the-art diagnostic protocols."
                        }
                    )
            
            self.stdout.write(self.style.SUCCESS('Successfully synchronized 20 Pakistani doctors with clinical profiles!'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error seeding doctors: {str(e)}'))
