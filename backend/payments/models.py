from django.db import models
from django.conf import settings
from appointments.models import Appointment


class Payment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'در انتظار پرداخت'),
        ('paid', 'پرداخت شده'),
        ('failed', 'ناموفق'),
        ('refunded', 'عودت داده شده'),
    )

    PAYMENT_METHOD_CHOICES = (
        ('zarinpal', 'زرین‌پال'),
        ('idpay', 'آیدی پی'),
        ('wallet', 'کیف پول'),
    )

    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE, related_name='payment')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payments')

    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="مبلغ (تومان)")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name="وضعیت")
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='zarinpal',
                                      verbose_name="روش پرداخت")

    tracking_code = models.CharField(max_length=100, blank=True, null=True, verbose_name="کد رهگیری")
    payment_date = models.DateTimeField(blank=True, null=True, verbose_name="تاریخ پرداخت")

    refund_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True,
                                        verbose_name="مبلغ عودت داده شده")
    refund_date = models.DateTimeField(blank=True, null=True, verbose_name="تاریخ عودت وجه")
    cancellation_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0,
                                           verbose_name="جریمه کنسلی (تومان)")

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ بروزرسانی")

    def calculate_refund_amount(self):
        from datetime import datetime, timedelta
        from django.utils import timezone

        appointment = self.appointment

        if appointment.status == 'cancelled_by_doctor':
            return self.amount

        if appointment.status == 'pending':
            return self.amount

        appointment_datetime = datetime.combine(appointment.appointment_date, appointment.appointment_time)
        current_time = timezone.now()

        if timezone.is_naive(appointment_datetime):
            from django.utils.timezone import make_aware
            appointment_datetime = make_aware(appointment_datetime)

        hours_until = (appointment_datetime - current_time).total_seconds() / 3600

        if hours_until >= 24:
            return self.amount  # 100%
        elif hours_until >= 2:
            return self.amount * 0.5  # 50%
        else:
            return 0  # 0%

    def process_refund(self):
        from django.utils import timezone

        refund_amount = self.calculate_refund_amount()
        cancellation_fee = self.amount - refund_amount

        if refund_amount > 0:
            self.refund_amount = refund_amount
            self.refund_date = timezone.now()
            self.cancellation_fee = cancellation_fee
            self.status = 'refunded'
            self.save()

            # TODO: اتصال به درگاه پرداخت برای عودت واقعی وجه
            # مثلاً: zarinpal.refund(self.tracking_code, refund_amount)

            return True
        elif cancellation_fee == self.amount:
            self.cancellation_fee = cancellation_fee
            self.status = 'paid'
            self.save()

        return False

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.amount} تومان - {self.get_status_display()}"

    class Meta:
        verbose_name = "پرداخت"
        verbose_name_plural = "پرداخت‌ها"
        ordering = ['-created_at']
