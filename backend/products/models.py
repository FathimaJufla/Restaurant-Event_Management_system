from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('All', 'All'),
        ('desserts', 'Desserts'),
        ('drinks', 'Drinks'),
        ('main', 'Main Course'),
        ('starters', 'Starters'),
    ]

    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    ingredients = models.JSONField(default=list, blank=True)
    featured = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
