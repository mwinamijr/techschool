from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    GENDER_CHOICES = (
        ("male", "Male"),
        ("female", "Female"),
    )
    ROLE_CHOICES = (
        ("student", "Student"),
        ("teacher", "Teacher"),
        ("admin", "Admin"),
    )
    phone_regex = RegexValidator(
        regex=r"^(0\d{9}|\+255\d{9})$",
        message="Phone number must be either 10 digits starting with '0' or 13 digits starting with '+255' followed by 9 digits.",
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
    phone_number = models.CharField(
        validators=[phone_regex],
        max_length=13,
        blank=True,
        null=True,
        unique=True,
        verbose_name="phone number",
    )
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default="male")
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="student")
    is_verified = models.BooleanField(default=False)
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
            self.is_verified = True

        if self.role != "teacher":
            self.is_verified = True

        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.email) if self.email else ""
