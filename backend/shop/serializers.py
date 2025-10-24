from rest_framework import serializers
from .models import Product, ProductImage


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
