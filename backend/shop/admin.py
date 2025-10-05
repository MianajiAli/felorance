from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "slug",
        "material",
        "weight",
        "purity",
        "stock",
        "is_active",
        "created_at",
    )
    search_fields = ("name", "description", "material")
    list_filter = ("material", "is_active", "created_at")
    readonly_fields = ("created_at", "updated_at")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("-created_at",)
