"""
apps/appointments/services.py
──────────────────────────────
Modern DSA & OOP based Service Layer for Appointments.

This file introduces:
1. OOP Concepts: Interfaces (ABC), encapsulation, and strategy pattern.
2. DSA Concepts: 
   - LRU Caching mechanism (Hash Map + Doubly Linked List concepts via OrderedDict).
   - Fast discrete interval hashing (O(1) lookups) for schedule generation as opposed to O(N^2) loops.
"""

from abc import ABC, abstractmethod
from typing import List, Dict, Any, Set
from datetime import datetime, date, time, timedelta
from django.db.models import QuerySet
import collections

from .models import Appointment
from apps.doctors.models import Doctor

# --- DSA: Custom LRU Cache ---
class LRUCache:
    """
    Data Structure: Least Recently Used (LRU) Cache 
    implemented using an OrderedDict (Hash Map + Doubly Linked List).
    Provides O(1) time complexity for GET and PUT operations.
    """
    def __init__(self, capacity: int = 128):
        self.cache = collections.OrderedDict()
        self.capacity = capacity

    def get(self, key: str) -> Any:
        if key not in self.cache:
            return None
        # Move to end to show it was recently used
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: str, value: Any) -> None:
        self.cache[key] = value
        self.cache.move_to_end(key)
        if len(self.cache) > self.capacity:
            # Pop the oldest item (FIFO order from the start)
            self.cache.popitem(last=False)

    def invalidate(self, partial_key: str):
        """Remove keys matching a pattern."""
        keys_to_delete = [k for k in self.cache if partial_key in k]
        for k in keys_to_delete:
            del self.cache[k]

# Global cache instance for availability queries
availability_cache = LRUCache(capacity=256)


# --- OOP: Abstraction and Interfaces ---
class AbstractAvailabilityService(ABC):
    """
    Interface for Doctor Availability logic.
    Follows Dependency Inversion principle.
    """
    @abstractmethod
    def get_available_slots(self, doctor: Doctor, target_date: date) -> List[str]:
        pass


class FastSlotAlgorithmService(AbstractAvailabilityService):
    """
    Concrete implementation of AvailabilityService using modern DSA.
    Uses Hash Sets for O(1) overlap detection instead of sequential scanning.
    """
    
    def get_available_slots(self, doctor: Doctor, target_date: date) -> List[str]:
        # 1. Cache Lookup (O(1) amortized)
        cache_key = f"doc_{doctor.id}_date_{target_date.isoformat()}"
        cached_result = availability_cache.get(cache_key)
        if cached_result is not None:
            return cached_result
            
        # 2. Check if doctor works on this day
        day_name = target_date.strftime('%A')
        if not doctor.is_available or day_name not in doctor.available_days:
            return []
            
        if not doctor.consultation_start_time or not doctor.consultation_end_time:
            return []

        # 3. Retrieve all booked slots (Database IO)
        booked_appointments = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=target_date
        ).exclude(status=Appointment.Status.CANCELLED).values_list('start_time', flat=True)
        
        # 4. State Representation (DSA: Hash Set for O(1) lookups)
        # Instead of looping N times against M appointments (O(N*M)),
        # we hash the booked times into a Set to make lookups O(1).
        # Total runtime drops from O(N*M) to O(N + M).
        booked_set: Set[time] = set(booked_appointments)
        
        # 5. Iterative generation of discrete times
        available_slots = []
        current_dt = datetime.combine(target_date, doctor.consultation_start_time)
        end_dt = datetime.combine(target_date, doctor.consultation_end_time)
        slot_delta = timedelta(minutes=doctor.slot_duration_minutes)
        
        # Skip times in the past if checking today's date
        now = datetime.now()
        
        while current_dt + slot_delta <= end_dt:
            slot_time = current_dt.time()
            # If the date is today, ensure slot is in the future
            if target_date == now.date() and current_dt <= now:
                current_dt += slot_delta
                continue
                
            # O(1) lookup in Hash Set
            if slot_time not in booked_set:
                available_slots.append(slot_time.strftime('%H:%M'))
                
            current_dt += slot_delta
            
        # 6. Store in LRU Cache
        availability_cache.put(cache_key, available_slots)
        
        return available_slots

    def invalidate_cache(self, doctor_id: int, target_date: date):
        """Called when an appointment is booked or cancelled."""
        cache_key = f"doc_{doctor_id}_date_{target_date.isoformat()}"
        availability_cache.invalidate(cache_key)

# Singleton Instance
availability_service = FastSlotAlgorithmService()
