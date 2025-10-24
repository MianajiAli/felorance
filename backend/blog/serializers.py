# serializers.py
from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    header_image_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()
    og_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "content",
            "header_image_url",
            "thumbnail_url",
            "meta_title",
            "meta_description",
            "meta_keywords",
            "og_image_url",
            "created_at",
        ]

    def get_header_image_url(self, obj):
        return obj.header_image.url if obj.header_image else None

    def get_thumbnail_url(self, obj):
        return obj.thumbnail.url if obj.thumbnail else None

    def get_og_image_url(self, obj):
        return obj.og_image.url if obj.og_image else None
