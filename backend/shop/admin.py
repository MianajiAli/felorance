from django.contrib import admin
from .models import Product, ProductImage


# Inline to manage multiple images per product
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ("image", "alt_text")
    show_change_link = True


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "material", "purity", "stock", "is_active", "created_at")
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
