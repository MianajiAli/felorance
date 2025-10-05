from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import authenticate
import random

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from .models import CustomUser
from .serializers import (
    UserSerializer,
    UserRegistrationSerializer,
    UserLoginSerializer,
    SendOTPSerializer,  # added serializer for OTP
)


# ------------------------
# Helper: generate JWT tokens
# ------------------------
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
        response = Response(
            {"user": UserSerializer(user).data, "tokens": tokens},
            status=status.HTTP_201_CREATED,
        )
        # Set refresh token in httpOnly cookie
        response.set_cookie(
            key="refresh_token",
            value=tokens["refresh"],
            httponly=True,
            secure=False,  # True in production with HTTPS
            samesite="Strict",
        )
        return response


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
                {"detail": "User not found"},
                status=status.HTTP_404_NOT_FOUND,
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
        response = Response(
            {"user": UserSerializer(user).data, "tokens": tokens},
            status=status.HTTP_200_OK,
        )
        response.set_cookie(
            key="refresh_token",
            value=tokens["refresh"],
            httponly=True,
            secure=False,
            samesite="Strict",
        )
        return response


# ------------------------
# Send OTP
# ------------------------
class SendOTPView(generics.GenericAPIView):
    serializer_class = SendOTPSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        mobile = serializer.validated_data["mobile"]

        try:
            user = CustomUser.objects.get(mobile=mobile)
        except CustomUser.DoesNotExist:
            return Response(
                {"detail": "User not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        otp = str(random.randint(100000, 999999))
        user.generate_otp(code=otp)
        print(f"OTP for {mobile}: {otp}")  # replace this with actual SMS sending

        return Response(
            {"detail": "OTP sent successfully"},
            status=status.HTTP_200_OK,
        )


# ------------------------
# Refresh access token
# ------------------------
class RefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh = request.COOKIES.get("refresh_token")
        if not refresh:
            return Response({"detail": "No refresh token"}, status=401)
        serializer = self.get_serializer(data={"refresh": refresh})
        try:
            serializer.is_valid(raise_exception=True)
        except:
            return Response({"detail": "Invalid refresh token"}, status=401)
        return Response(serializer.validated_data)


# ------------------------
# Logout
# ------------------------
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = Response({"detail": "Logged out"}, status=status.HTTP_200_OK)
        response.delete_cookie("refresh_token")
        return response


# ------------------------
# /me endpoint
# ------------------------
class MeView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
