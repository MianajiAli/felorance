from decimal import Decimal
from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import Product, Cart, CartItem, Order, OrderItem, Payment
from .serializers import (
    ProductSerializer,
    CartSerializer,
    CartItemSerializer,
    OrderSerializer,
    PaymentSerializer,
)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True).prefetch_related("images")
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "slug"


class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart, context={"request": request})
        return Response(serializer.data)


class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cart = Cart.objects.filter(user=self.request.user).first()
        if not cart:
            return CartItem.objects.none()
        return CartItem.objects.filter(cart=cart).select_related("product")

    def perform_create(self, serializer):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        product = serializer.validated_data["product"]
        serializer.save(cart=cart, unit_price=product.price)

    def create(self, request, *args, **kwargs):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.validated_data["product"]
        existing = CartItem.objects.filter(cart=cart, product=product).first()
        if existing:
            existing.quantity += serializer.validated_data.get("quantity", 1)
            existing.save(update_fields=["quantity"])
            output = self.get_serializer(existing)
            return Response(output.data, status=status.HTTP_200_OK)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.prefetch_related("items__product").all()
        return Order.objects.filter(user=self.request.user).prefetch_related("items__product")

    def create(self, request, *args, **kwargs):
        cart = Cart.objects.filter(user=request.user).prefetch_related("items__product").first()
        if not cart or not cart.items.exists():
            return Response({"detail": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            subtotal = sum((item.subtotal for item in cart.items.all()), Decimal("0.00"))
            shipping_cost = Decimal("0.00")
            order = Order.objects.create(
                user=request.user,
                subtotal=subtotal,
                shipping_cost=shipping_cost,
                total=subtotal + shipping_cost,
                shipping_address=request.data.get("shipping_address", ""),
                notes=request.data.get("notes", ""),
            )
            OrderItem.objects.bulk_create(
                [
                    OrderItem(
                        order=order,
                        product=item.product,
                        quantity=item.quantity,
                        unit_price=item.unit_price,
                    )
                    for item in cart.items.all()
                ]
            )
            cart.items.all().delete()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Payment.objects.select_related("order").all()
        return Payment.objects.filter(order__user=self.request.user).select_related("order")

    def perform_create(self, serializer):
        order = serializer.validated_data["order"]
        if not self.request.user.is_staff and order.user != self.request.user:
            raise PermissionDenied("Cannot pay for another user's order.")
        serializer.save(amount=order.total)
