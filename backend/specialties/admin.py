from django.contrib import admin
from .models import Specialty, DiseaseCategory, DoctorProfile


@admin.register(Specialty)
class SpecialtyAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(DiseaseCategory)
class DiseaseCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'specialty')
    list_filter = ('specialty',)
    search_fields = ('name',)


@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialty', 'clinic', 'consultation_fee', 'is_approved')
    list_filter = ('specialty', 'is_approved', 'gender', 'visit_type')
    search_fields = ('user__first_name', 'user__last_name', 'license_number')
