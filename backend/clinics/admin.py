from django.contrib import admin
from .models import Clinic


@admin.register(Clinic)
class ClinicAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'phone', 'is_active')
    list_filter = ('city', 'is_active')
    search_fields = ('name', 'address', 'phone')
