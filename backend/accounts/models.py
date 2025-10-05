from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.utils import timezone
from datetime import timedelta


class CustomUserManager(BaseUserManager):
    def create_user(self, mobile, password=None, **extra_fields):
        if not mobile:
            raise ValueError("Mobile number is required")
        mobile = self.normalize_email(mobile)  # optional if you want normalization
        user = self.model(mobile=mobile, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, mobile, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(mobile, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    mobile = models.CharField(max_length=15, unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # OTP fields
    verification_code = models.CharField(max_length=6, blank=True, null=True)
    otp_expiry = models.DateTimeField(blank=True, null=True)

    date_joined = models.DateTimeField(default=timezone.now)  # optional, useful

    objects = CustomUserManager()

    USERNAME_FIELD = "mobile"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.mobile

    # Optional helper to check if OTP is valid
    def is_otp_valid(self):
        if self.verification_code and self.otp_expiry:
            return timezone.now() <= self.otp_expiry
        return False

    # Optional: generate OTP
    def generate_otp(self, code, expiry_minutes=5):
        self.verification_code = code
        self.otp_expiry = timezone.now() + timedelta(minutes=expiry_minutes)
        self.save(update_fields=["verification_code", "otp_expiry"])
