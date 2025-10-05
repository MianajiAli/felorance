from django.urls import path
from .views import UserRegistrationView, UserLoginView, SendOTPView

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="user-register"),
    path("login/", UserLoginView.as_view(), name="user-login"),
    path("send-otp/", SendOTPView.as_view(), name="send-otp"),
]
