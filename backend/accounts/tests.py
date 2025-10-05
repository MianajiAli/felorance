from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import CustomUser


class AuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.mobile = "09123456789"
        self.password = "securepass123"

        # Create a test user
        self.user = CustomUser.objects.create_user(
            mobile=self.mobile,
            password=self.password,
            first_name="Test",
            last_name="User",
        )

    # ------------------------
    # Registration tests
    # ------------------------
    def test_registration_success(self):
        data = {
            "mobile": "09998887766",
            "password": "newpass123",
            "first_name": "New",
            "last_name": "User",
        }
        url = reverse("user-register")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("tokens", response.data)
        self.assertEqual(response.data["user"]["mobile"], data["mobile"])

    def test_registration_duplicate_mobile(self):
        data = {"mobile": self.mobile, "password": "pass123"}
        url = reverse("user-register")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_registration_missing_fields(self):
        data = {"mobile": ""}
        url = reverse("user-register")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # ------------------------
    # Password login tests
    # ------------------------
    def test_login_with_password_success(self):
        data = {"mobile": self.mobile, "password": self.password}
        url = reverse("user-login")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("tokens", response.data)

    def test_login_with_password_wrong(self):
        data = {"mobile": self.mobile, "password": "wrongpass"}
        url = reverse("user-login")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_with_password_missing(self):
        data = {"mobile": self.mobile}
        url = reverse("user-login")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # ------------------------
    # OTP tests
    # ------------------------
    def test_send_otp_success(self):
        data = {"mobile": self.mobile}
        url = reverse("send-otp")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertIsNotNone(self.user.verification_code)
        self.assertIsNotNone(self.user.otp_expiry)

    def test_send_otp_user_not_found(self):
        data = {"mobile": "09990000000"}
        url = reverse("send-otp")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_send_otp_missing_mobile(self):
        url = reverse("send-otp")
        response = self.client.post(url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # ------------------------
    # OTP login tests
    # ------------------------
    def test_login_with_otp_success(self):
        otp_code = "123456"
        self.user.generate_otp(code=otp_code, expiry_minutes=5)
        data = {"mobile": self.mobile, "otp": otp_code}
        url = reverse("user-login")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("tokens", response.data)
        self.user.refresh_from_db()
        self.assertIsNone(self.user.verification_code)
        self.assertIsNone(self.user.otp_expiry)

    def test_login_with_otp_expired(self):
        otp_code = "123456"
        self.user.generate_otp(code=otp_code, expiry_minutes=-5)  # expired
        data = {"mobile": self.mobile, "otp": otp_code}
        url = reverse("user-login")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_with_otp_invalid(self):
        self.user.generate_otp(code="654321", expiry_minutes=5)
        data = {"mobile": self.mobile, "otp": "111111"}
        url = reverse("user-login")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # ------------------------
    # Edge cases
    # ------------------------
    def test_login_user_not_found(self):
        data = {"mobile": "09990000000", "password": "pass123"}
        url = reverse("user-login")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
