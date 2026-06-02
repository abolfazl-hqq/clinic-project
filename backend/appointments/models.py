from django.db import models
from django.conf import settings
from specialties.models import DoctorProfile


class DoctorAvailability(models.Model):
    DAYS_OF_WEEK = (
        (0, 'شنبه'),
        (1, 'یک‌شنبه'),
        (2, 'دوشنبه'),
        (3, 'سه‌شنبه'),
        (4, 'چهارشنبه'),
        (5, 'پنج‌شنبه'),
        (6, 'جمعه'),
    )

    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='availabilities')
    day_of_week = models.IntegerField(choices=DAYS_OF_WEEK, verbose_name="روز هفته")
    start_time = models.TimeField(verbose_name="ساعت شروع")
    end_time = models.TimeField(verbose_name="ساعت پایان")
    slot_duration = models.IntegerField(default=30, verbose_name="مدت هر نوبت (دقیقه)")
    is_active = models.BooleanField(default=True, verbose_name="فعال")

    def __str__(self):
        return f"{self.doctor.user.get_full_name()} - {self.get_day_of_week_display()} {self.start_time} تا {self.end_time}"

    class Meta:
        verbose_name = "ساعت کاری"
        verbose_name_plural = "ساعت‌های کاری"
        ordering = ['doctor', 'day_of_week', 'start_time']
        unique_together = ['doctor', 'day_of_week']


class Appointment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'در انتظار تایید پزشک'),
        ('confirmed', 'تایید شده'),
        ('completed', 'انجام شده'),
        ('cancelled_by_patient', 'لغو شده توسط بیمار'),
        ('cancelled_by_doctor', 'لغو شده توسط پزشک'),
        ('no_show', 'حضور نیافته (بیمار)'),
    )

    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='appointments',
                                limit_choices_to={'role': 'patient'})
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateField(verbose_name="تاریخ نوبت")
    appointment_time = models.TimeField(verbose_name="ساعت نوبت")
    status = models.CharField(max_length=25, choices=STATUS_CHOICES, default='pending', verbose_name="وضعیت")
    cancellation_reason = models.TextField(blank=True, null=True, verbose_name="دلیل کنسلی")
    symptoms = models.TextField(blank=True, null=True, verbose_name="علائم بیماری")
    note = models.TextField(blank=True, null=True, verbose_name="توضیحات اضافی")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ثبت")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ بروزرسانی")

    def __str__(self):
        return f"{self.patient.get_full_name()} - دکتر {self.doctor.user.get_full_name()} - {self.appointment_date} {self.appointment_time}"

    class Meta:
        verbose_name = "نوبت"
        verbose_name_plural = "نوبت‌ها"
        ordering = ['-appointment_date', 'appointment_time']
        unique_together = ['doctor', 'appointment_date', 'appointment_time']
