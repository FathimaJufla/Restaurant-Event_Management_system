from rest_framework import generics
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail

class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        message = serializer.save()
        # Email to Owner
        send_mail(
            f'New Message from {message.name}',
            message.message,
            message.email, # From
            ['owner@restaurant.com'], # To
            fail_silently=True,
        )
