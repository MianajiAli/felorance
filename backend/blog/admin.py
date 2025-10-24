# admin.py
from django.contrib import admin
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "created_at")
    list_filter = ("created_at",)
    search_fields = ("title", "meta_title", "meta_keywords")
    prepopulated_fields = {"slug": ("title",)}
    fieldsets = (
        ("Basic Info", {"fields": ("title", "slug", "content")}),
        ("Images", {"fields": ("header_image", "thumbnail", "og_image")}),
        ("SEO", {"fields": ("meta_title", "meta_description", "meta_keywords")}),
        ("Timestamps", {"fields": ("created_at",)}),
    )
    readonly_fields = ("created_at",)
