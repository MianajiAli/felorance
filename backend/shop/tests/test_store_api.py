from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from shop.models import Product


def create_user(mobile="09120000000", password="testpass123"):
    user_model = get_user_model()
    return user_model.objects.create_user(mobile=mobile, password=password)


def create_product():
    return Product.objects.create(
        name="Luna Drop Earrings",
        description="Test product",
        price=1200000,
        currency="IRR",
        stock=5,
        is_active=True,
    )


def test_cart_order_payment_flow(db):
    user = create_user()
    product = create_product()
    client = APIClient()
    client.force_authenticate(user=user)

    cart_response = client.get("/api/cart/")
    assert cart_response.status_code == 200

    add_response = client.post(
        "/api/cart-items/",
        {"product_id": product.id, "quantity": 2},
        format="json",
    )
    assert add_response.status_code in (200, 201)

    order_response = client.post(
        "/api/orders/",
        {"shipping_address": "Tehran", "notes": "Handle with care"},
        format="json",
    )
    assert order_response.status_code == 201
    order_id = order_response.data["id"]

    payment_response = client.post(
        "/api/payments/",
        {"order": order_id, "provider": "manual"},
        format="json",
    )
    assert payment_response.status_code == 201


def test_cart_requires_auth(db):
    client = APIClient()
    response = client.get("/api/cart/")
    assert response.status_code == 401
