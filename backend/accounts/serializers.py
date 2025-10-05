from rest_framework import serializers
from .models import CustomUser


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


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = CustomUser
        fields = ["mobile", "password", "first_name", "last_name"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = CustomUser.objects.create_user(password=password, **validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    mobile = serializers.CharField(max_length=15)
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    otp = serializers.CharField(max_length=6, required=False, allow_blank=True)

    def validate(self, data):
        if not data.get("password") and not data.get("otp"):
            raise serializers.ValidationError("Either password or OTP is required")
        return data
