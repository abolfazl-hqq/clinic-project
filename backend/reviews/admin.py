from django.contrib import admin
from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'rating', 'is_approved', 'created_at')
    list_filter = ('rating', 'is_approved')
    search_fields = ('patient__first_name', 'patient__last_name', 'doctor__user__first_name', 'doctor__user__last_name')
