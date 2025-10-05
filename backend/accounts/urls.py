from django.urls import path
from .views import (
    UserRegistrationView,
    UserLoginView,
    SendOTPView,
    RefreshTokenView,
    LogoutView,
    MeView,
)

app_name = "accounts"

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("send-otp/", SendOTPView.as_view(), name="send-otp"),
    path("refresh/", RefreshTokenView.as_view(), name="refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", MeView.as_view(), name="me"),
]
