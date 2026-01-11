from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import AllowAny

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(active=True)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    filterset_fields = ['category', 'featured']

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(active=True)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
