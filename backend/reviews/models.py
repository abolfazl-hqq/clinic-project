from django.db import models
from django.conf import settings


class Review(models.Model):
    RATING_CHOICES = (
        (1, '۱ - خیلی ضعیف'),
        (2, '۲ - ضعیف'),
        (3, '۳ - متوسط'),
        (4, '۴ - خوب'),
        (5, '۵ - عالی'),
    )

    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews',
                                limit_choices_to={'role': 'patient'})
    doctor = models.ForeignKey('specialties.DoctorProfile', on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES, verbose_name="امتیاز")
    comment = models.TextField(verbose_name="نظر")
    reply = models.TextField(blank=True, null=True, verbose_name="پاسخ پزشک")
    is_approved = models.BooleanField(default=True, verbose_name="تایید شده")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ثبت")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ بروزرسانی")

    def __str__(self):
        return f"{self.patient.get_full_name()} - {self.doctor.user.get_full_name()} - {self.rating}/5"

    class Meta:
        verbose_name = "نظر"
        verbose_name_plural = "نظرات"
        ordering = ['-created_at']
