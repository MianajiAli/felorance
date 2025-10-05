from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.utils import timezone
import random

from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import UserSerializer, UserRegistrationSerializer, UserLoginSerializer


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


# ------------------------
# Registration
# ------------------------
class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        return Response(
            {"user": UserSerializer(user).data, "tokens": tokens},
            status=status.HTTP_201_CREATED,
        )


# ------------------------
# Login (Password or OTP)
# ------------------------
class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        mobile = data.get("mobile")
        password = data.get("password")
        otp = data.get("otp")

        try:
            user = CustomUser.objects.get(mobile=mobile)
        except CustomUser.DoesNotExist:
            return Response(
                {"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        if password:
            user_auth = authenticate(request, mobile=mobile, password=password)
            if not user_auth:
                return Response(
                    {"detail": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
        elif otp:
            if not user.is_otp_valid() or user.verification_code != otp:
                return Response(
                    {"detail": "Invalid or expired OTP"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # Clear OTP after successful login
            user.verification_code = None
            user.otp_expiry = None
            user.save(update_fields=["verification_code", "otp_expiry"])
        else:
            return Response(
                {"detail": "Password or OTP required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        tokens = get_tokens_for_user(user)
        return Response({"user": UserSerializer(user).data, "tokens": tokens})


# ------------------------
# Send OTP
# ------------------------
class SendOTPView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        mobile = request.data.get("mobile")
        if not mobile:
            return Response(
                {"detail": "Mobile is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = CustomUser.objects.get(mobile=mobile)
        except CustomUser.DoesNotExist:
            return Response(
                {"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        otp = str(random.randint(100000, 999999))
        user.generate_otp(code=otp)
        print(f"OTP for {mobile}: {otp}")  # Replace with SMS sending in production

        return Response({"detail": "OTP sent successfully"})
