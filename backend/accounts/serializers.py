from rest_framework import serializers
from .models import CustomUser


# ------------------------
# Basic User Serializer
# ------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "mobile",
            "first_name",
            "last_name",
            "is_active",
            "is_staff",
            "date_joined",
        ]
        read_only_fields = ["id", "is_active", "is_staff", "date_joined"]


# ------------------------
# Registration Serializer
# ------------------------
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = CustomUser
        fields = ["mobile", "password", "first_name", "last_name"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = CustomUser.objects.create_user(password=password, **validated_data)
        return user


# ------------------------
# Login Serializer
# ------------------------
class UserLoginSerializer(serializers.Serializer):
    mobile = serializers.CharField(max_length=15)
    password = serializers.CharField(
        write_only=True, required=False, allow_blank=True, min_length=6
    )
    otp = serializers.CharField(max_length=6, required=False, allow_blank=True)

    def validate(self, data):
        mobile = data.get("mobile")
        password = data.get("password")
        otp = data.get("otp")

        if not mobile:
            raise serializers.ValidationError({"mobile": "Mobile number is required."})

        if not password and not otp:
            raise serializers.ValidationError(
                {"non_field_errors": ["Either password or OTP is required."]}
            )

        return data


# ------------------------
# OTP Send Serializer
# ------------------------
class SendOTPSerializer(serializers.Serializer):
    mobile = serializers.CharField(max_length=15)

    def validate_mobile(self, value):
        if not value.isdigit() or len(value) < 10:
            raise serializers.ValidationError("Enter a valid mobile number.")
        return value
