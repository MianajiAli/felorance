# models.py
from django.db import models
from django.utils.text import slugify


def upload_to_header(instance, filename):
    return f"posts/{instance.slug or 'unpublished'}/header/{filename}"


def upload_to_thumbnail(instance, filename):
    return f"posts/{instance.slug or 'unpublished'}/thumbnail/{filename}"


class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    content = models.TextField(help_text="Raw MDX content stored here.")
    header_image = models.ImageField(
        upload_to=upload_to_header,
        blank=True,
        null=True,
        help_text="Main header image.",
    )
    thumbnail = models.ImageField(
        upload_to=upload_to_thumbnail,
        blank=True,
        null=True,
        help_text="Small preview image used in lists or cards.",
    )

    # SEO essentials
    meta_title = models.CharField(
        max_length=70, blank=True, help_text="SEO title (max 70 chars)."
    )
    meta_description = models.CharField(
        max_length=160, blank=True, help_text="SEO description (max 160 chars)."
    )
    meta_keywords = models.CharField(
        max_length=255, blank=True, help_text="Comma-separated keywords for SEO."
    )
    og_image = models.ImageField(
        upload_to="posts/og/",
        blank=True,
        null=True,
        help_text="Open Graph image for social sharing.",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.meta_title:
            self.meta_title = self.title[:70]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
