from django.core.management.base import BaseCommand
from apps.analytics.models import FinancialMetric, ClinicalMetric
from django.utils import timezone
from datetime import timedelta
import random

class Command(BaseCommand):
    help = 'Seeds the database with high-fidelity analytics shards'

    def handle(self, *args, **kwargs):
        self.stdout.write('Initializing Analytics Seeder...')
        
        # ── Clear existing shards
        FinancialMetric.objects.all().delete()
        ClinicalMetric.objects.all().delete()
        
        today = timezone.now().date()
        
        for i in range(12):
            # 📅 Accurate Month Subtraction (Clamped to day 1)
            month = today.month - i
            year = today.year
            while month <= 0:
                month += 12
                year -= 1
            
            node_date = today.replace(year=year, month=month, day=1)
            
            # 💹 Financial Node
            rev = random.randint(45000, 85000)
            exp = rev * random.uniform(0.4, 0.6)
            FinancialMetric.objects.create(
                date=node_date,
                total_revenue=rev,
                total_expenses=exp,
                net_profit=rev - exp,
                insurance_claims_processed=random.randint(20, 100),
                average_transaction_value=random.randint(500, 2000)
            )
            
            # 🧬 Clinical Node
            ClinicalMetric.objects.create(
                date=node_date,
                total_patients=random.randint(200, 500),
                admitted_patients=random.randint(10, 50),
                critical_cases=random.randint(2, 10),
                lab_tests_performed=random.randint(50, 200),
                pharmacy_orders=random.randint(100, 300),
                voice_bookings=random.randint(30, 80),
                web_bookings=random.randint(50, 150)
            )

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded 12 chronological analytics nodes.'))
