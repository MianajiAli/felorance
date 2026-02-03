from django.contrib import admin
from .models import Product, ProductImage, Cart, CartItem, Order, OrderItem, Payment


# Inline to manage multiple images per product
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ("image", "alt_text")
    show_change_link = True


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "material", "purity", "price", "currency", "stock", "is_active", "created_at")
    list_filter = ("is_active", "material", "created_at")
    search_fields = ("name", "slug", "description")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductImageInline]  # manage images inline
    ordering = ("-created_at",)
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        (
            "مشخصات اصلی",
            {"fields": ("name", "slug", "description", "material", "purity", "weight")},
        ),
        ("وضعیت و موجودی", {"fields": ("stock", "is_active")}),
        ("زمان‌بندی", {"fields": ("created_at", "updated_at")}),
    )


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("product", "image", "alt_text")
    search_fields = ("product__name", "alt_text")


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("user", "updated_at")
    search_fields = ("user__mobile",)


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("cart", "product", "quantity", "unit_price")
    search_fields = ("cart__user__mobile", "product__name")


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("product", "quantity", "unit_price")


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_number", "user", "status", "total", "created_at")
    list_filter = ("status",)
    search_fields = ("order_number", "user__mobile")
    inlines = [OrderItemInline]


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("order", "provider", "status", "amount", "created_at")
    list_filter = ("status", "provider")
