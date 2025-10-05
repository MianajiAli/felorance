from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class Product(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(
        blank=True, help_text="MDX content (Markdown + JSX)."
    )
    weight = models.FloatField(blank=True, help_text="Weight in grams (e.g., 0.120).")
    purity = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=99.9,
        help_text="Silver purity percentage.",
    )
    material = models.CharField(max_length=100, default="Silver")
    stock = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
