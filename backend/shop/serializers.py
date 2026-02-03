from decimal import Decimal
from rest_framework import serializers
from .models import (
    Product,
    ProductImage,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Payment,
)


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt_text"]


class ProductSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "price",
            "currency",
            "weight",
            "purity",
            "material",
            "stock",
            "is_active",
            "created_at",
            "updated_at",
            "images",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "slug"]

    def get_images(self, obj):
        request = self.context.get("request")
        view = self.context.get("view")

        qs = obj.images.all()
        if view and getattr(view, "action", None) == "list":
            # list view → only the first image
            qs = qs[:1]

        # return serialized images
        return [
            {
                "id": img.id,
                "image": (
                    request.build_absolute_uri(img.image.url)
                    if request
                    else img.image.url
                ),
                "alt_text": img.alt_text,
            }
            for img in qs
        ]


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        source="product", queryset=Product.objects.all(), write_only=True
    )
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "product", "product_id", "quantity", "unit_price", "subtotal"]
        read_only_fields = ["id", "unit_price", "subtotal", "product"]

    def get_subtotal(self, obj):
        return obj.subtotal


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    subtotal = serializers.SerializerMethodField()
    total_quantity = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "items", "subtotal", "total_quantity", "updated_at"]
        read_only_fields = ["id", "updated_at"]

    def get_subtotal(self, obj):
        return sum((item.subtotal for item in obj.items.all()), Decimal("0.00"))

    def get_total_quantity(self, obj):
        return sum((item.quantity for item in obj.items.all()), 0)


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity", "unit_price", "subtotal"]

    def get_subtotal(self, obj):
        return obj.subtotal


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "order_number",
            "status",
            "subtotal",
            "shipping_cost",
            "total",
            "shipping_address",
            "notes",
            "created_at",
            "items",
        ]
        read_only_fields = ["id", "order_number", "subtotal", "total", "created_at"]


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            "id",
            "order",
            "provider",
            "status",
            "amount",
            "transaction_reference",
            "created_at",
        ]
        read_only_fields = ["id", "status", "amount", "created_at"]
