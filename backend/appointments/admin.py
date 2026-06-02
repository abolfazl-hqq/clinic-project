from django.contrib import admin
from .models import DoctorAvailability, Appointment


@admin.register(DoctorAvailability)
class DoctorAvailabilityAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'get_day_of_week_display', 'start_time', 'end_time', 'is_active')
    list_filter = ('is_active', 'day_of_week')
    search_fields = ('doctor__user__first_name', 'doctor__user__last_name')


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'appointment_date', 'appointment_time', 'status')
    list_filter = ('status', 'appointment_date')
    search_fields = ('patient__first_name', 'patient__last_name', 'doctor__user__first_name', 'doctor__user__last_name')
