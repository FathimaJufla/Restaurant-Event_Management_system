from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Cart, CartItem, Order, OrderItem
from .serializers import CartSerializer, CartItemSerializer, OrderSerializer
from products.models import Product
from django.core.mail import send_mail

class CartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()

        return Response(CartSerializer(cart).data)

    @action(detail=False, methods=['post'])
    def update_quantity(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if quantity <= 0:
             CartItem.objects.filter(cart=cart, product_id=product_id).delete()
        else:
            cart_item = CartItem.objects.filter(cart=cart, product_id=product_id).first()
            if cart_item:
                cart_item.quantity = quantity
                cart_item.save()

        return Response(CartSerializer(cart).data)

    @action(detail=False, methods=['post'])
    def remove(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        
        CartItem.objects.filter(cart=cart, product_id=product_id).delete()
        return Response(CartSerializer(cart).data)
    
    @action(detail=False, methods=['post'])
    def clear(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart.items.all().delete()
        return Response(CartSerializer(cart).data)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        # Create order from cart
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response ({'error': 'Cart is empty'}, status=400)
            
        if not cart.items.exists():
            return Response ({'error': 'Cart is empty'}, status=400)
        
        total_amount = cart.total_price()
        
        order = Order.objects.create(
            user=request.user,
            total_amount=total_amount,
            order_type=request.data.get('order_type', 'delivery'),
            address=request.data.get('address', ''),
            status='pending'
        )
        
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )
        
        cart.items.all().delete()
        
        # Send Email
        send_mail(
            f'Order Confirmation #{order.id}',
            f'Your order #{order.id} has been placed successfully. Total: ${total_amount}',
            'noreply@restaurant.com',
            [request.user.email],
            fail_silently=True,
        )

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
