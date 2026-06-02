from django.db import models


class Clinic(models.Model):
    name = models.CharField(max_length=200, verbose_name="نام کلینیک")
    address = models.TextField(verbose_name="آدرس کامل")
    city = models.CharField(max_length=100, verbose_name="شهر")
    neighborhood = models.CharField(max_length=100, blank=True, null=True, verbose_name="محله")
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True, verbose_name="عرض جغرافیایی")
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True, verbose_name="طول جغرافیایی")
    phone = models.CharField(max_length=11, verbose_name="تلفن کلینیک")
    description = models.TextField(blank=True, null=True, verbose_name="توضیحات")
    image = models.URLField(blank=True, null=True, verbose_name="عکس کلینیک")
    is_active = models.BooleanField(default=True, verbose_name="فعال")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ بروزرسانی")

    def __str__(self):
        return f"{self.name} - {self.city}"

    class Meta:
        verbose_name = "کلینیک"
        verbose_name_plural = "کلینیک‌ها"
        ordering = ['name']
