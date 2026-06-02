from django.db import models
from django.conf import settings


class SupportTicket(models.Model):
    STATUS_CHOICES = (
        ('open', 'باز'),
        ('in_progress', 'در حال بررسی'),
        ('closed', 'بسته شده'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tickets')
    subject = models.CharField(max_length=200, verbose_name="موضوع")
    message = models.TextField(verbose_name="پیام")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open', verbose_name="وضعیت")
    admin_reply = models.TextField(blank=True, null=True, verbose_name="پاسخ ادمین")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ بروزرسانی")

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.subject}"

    class Meta:
        verbose_name = "تیکت پشتیبانی"
        verbose_name_plural = "تیکت‌های پشتیبانی"
        ordering = ['-created_at']
