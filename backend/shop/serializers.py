from rest_framework import serializers
from .models import Product


        fields = [
            "id",
            "name",
            "slug",
            "description",
            "weight",
            "purity",
            "material",
            "stock",
            "image",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "slug"]
