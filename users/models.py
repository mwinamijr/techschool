from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(
        max_length=100, blank=True, null=True, verbose_name="first name"
    )
    middle_name = models.CharField(
        max_length=100, blank=True, null=True, verbose_name="middle name"
    )
    last_name = models.CharField(
        max_length=100, blank=True, null=True, verbose_name="last name"
    )
    email = models.EmailField(_("email address"), unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


GENDER_CHOICE = (("Male", "Male"), ("Female", "Female"), ("Other", "Other"))


class Student(models.Model):
    first_name = models.CharField(max_length=150, null=True, verbose_name="First Name")
    middle_name = models.CharField(
        max_length=150, blank=True, null=True, verbose_name="Middle Name"
    )
    last_name = models.CharField(max_length=150, null=True, verbose_name="Last Name")
    gender = models.CharField(
        max_length=10, choices=GENDER_CHOICE, blank=True, null=True
    )
    email = models.EmailField(_("email address"), unique=True)
    image = models.ImageField(upload_to="StudentsImages", blank=True)
    password = models.CharField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):

        # super(Student, self).save()
        user, created = CustomUser.objects.get_or_create(
            email=self.email,
            first_name=self.first_name,
            last_name=self.last_name,
            is_student=True,
        )
        if created:
            # if a user is created give the user a default password

            user.set_password(self.password)
            user.save()
