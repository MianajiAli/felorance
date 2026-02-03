from decimal import Decimal
from django.test import TestCase
from django.contrib.auth import get_user_model

from shop.models import Cart, CartItem, Order, OrderItem, Product


class ShopModelTests(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(mobile="09120000000", password="testpass123")
        self.product = Product.objects.create(
            name="Luna Drop Earrings",
            price=Decimal("1500000.00"),
            currency="IRR",
            stock=10,
        )

    def test_cart_item_subtotal(self):
        cart = Cart.objects.create(user=self.user)
        item = CartItem.objects.create(
            cart=cart,
            product=self.product,
            quantity=2,
            unit_price=Decimal("1500000.00"),
        )
        self.assertEqual(item.subtotal, Decimal("3000000.00"))

    def test_order_total_defaults(self):
        order = Order.objects.create(
            user=self.user,
            subtotal=Decimal("1500000.00"),
            shipping_cost=Decimal("0.00"),
        )
        OrderItem.objects.create(
            order=order,
            product=self.product,
            quantity=1,
            unit_price=Decimal("1500000.00"),
        )
        order.refresh_from_db()
        self.assertEqual(order.total, Decimal("1500000.00"))
