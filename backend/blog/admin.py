from django.contrib import admin
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "slug", "created_at")
    search_fields = ("title", "content")
    readonly_fields = ("created_at",)
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-created_at",)
