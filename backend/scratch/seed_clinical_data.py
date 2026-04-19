import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.system.models import Department
from apps.wards.models import Ward, Room, Bed
from apps.accounts.models import User
from apps.doctors.models import Doctor

def seed_clinical_infrastructure():
    print("🏥 Starting Clinical Infrastructure Seeding...")

    # 1. Departments Shards
    departments_data = [
        {"name": "Cardiology", "code": "CARD", "description": "Heart and vascular care unit."},
        {"name": "Neurology", "code": "NEUR", "description": "Brain and nervous system specialists."},
        {"name": "Emergency Medicine", "code": "EMER", "description": "24/7 Acute care and trauma."},
        {"name": "Pediatrics", "code": "PEDI", "description": "Children and adolescent healthcare."},
        {"name": "Oncology", "code": "ONCO", "description": "Cancer treatment and research hub."},
        {"name": "Orthopedics", "code": "ORTH", "description": "Bone and joint rehabilitation."},
    ]

    for d_data in departments_data:
        dept, created = Department.objects.get_or_create(
            name=d_data['name'],
            defaults={
                'description': d_data['description'],
                'code': d_data['code']
            }
        )
        if created:
            print(f"   [+] Created Department: {dept.name}")

        # 2. Ward Shards per Department
        wards_data = []
        if dept.name == "Cardiology":
            wards_data = [
                {"name": "Cardiac ICU", "code": "C-ICU", "floor": 2},
                {"name": "Cardiology General", "code": "C-GEN", "floor": 2},
            ]
        elif dept.name == "Emergency Medicine":
            wards_data = [
                {"name": "Triage Unit", "code": "ER-TRI", "floor": 1},
                {"name": "Resuscitation Bay", "code": "ER-RES", "floor": 1},
            ]
        elif dept.name == "Pediatrics":
            wards_data = [
                {"name": "NICU", "code": "P-NICU", "floor": 4},
                {"name": "Pediatric General", "code": "P-GEN", "floor": 4},
            ]
        else:
            wards_data = [
                {"name": f"{dept.name} Ward A", "code": f"{dept.name[:2].upper()}-A", "floor": 3},
            ]

        for w_data in wards_data:
            ward, w_created = Ward.objects.get_or_create(
                code=w_data['code'],
                defaults={
                    'name': w_data['name'],
                    'department': dept,
                    'floor': w_data['floor']
                }
            )
            if w_created:
                print(f"      [+] Created Ward: {ward.name}")

            # 3. Room Shards per Ward
            for i in range(1, 4):  # 3 Rooms per Ward
                room_num = f"{ward.floor}{i:02d}"
                room, r_created = Room.objects.get_or_create(
                    ward=ward,
                    room_number=room_num,
                    defaults={'room_type': 'icu' if 'ICU' in ward.name else 'general'}
                )
                if r_created:
                    # 4. Bed Shards per Room
                    for j in range(1, 4):  # 3 Beds per Room
                        bed_num = f"{j:02d}"
                        Bed.objects.create(
                            room=room,
                            bed_number=bed_num,
                            bed_type='icu' if 'ICU' in ward.name else 'general',
                            status='available'
                        )
                    print(f"         [+] Registered Room {room_num} with 3 Beds.")

    # 5. Ensure Admitting Physician exists for testing
    admin_user = User.objects.filter(is_superuser=True).first()
    if admin_user:
        Doctor.objects.get_or_create(
            user=admin_user,
            defaults={
                'license_number': 'PMC-ADMIN001',
                'specialization': 'General Medicine'
            }
        )
        print(f"   [+] Ensure Admin Superuser is registered as a Physician.")

    print("\n✅ Clinical Infrastructure Seeding Complete.")

if __name__ == "__main__":
    seed_clinical_infrastructure()
