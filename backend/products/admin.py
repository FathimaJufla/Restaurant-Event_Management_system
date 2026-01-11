from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'featured', 'active')
    list_filter = ('category', 'featured', 'active')
    search_fields = ('title', 'description')
