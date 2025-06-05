from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ("student", "Student"),
        ("teacher", "Teacher"),
        ("admin", "Admin"),
    )
    first_name = models.CharField(
        max_length=100, blank=True, null=True, verbose_name="first name"
    )
    middle_name = models.CharField(
        max_length=100, blank=True, null=True, verbose_name="middle name"
    )
    last_name = models.CharField(
        max_length=100, blank=True, null=True, verbose_name="last name"
    )
    username = models.CharField(
        max_length=100, blank=True, null=True, verbose_name="username"
    )
    email = models.EmailField(_("email address"), unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="student")
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        if self.is_staff:
            self.role = "admin"
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.email) if self.email else ""
