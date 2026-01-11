from rest_framework import generics, permissions
from .models import Reservation
from .serializers import ReservationSerializer
from django.core.mail import send_mail

class ReservationCreateView(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [permissions.AllowAny] 
    
    def perform_create(self, serializer):
        reservation = serializer.save()
        # Email Confirmation
        send_mail(
            'Reservation Confirmation',
            f'Your reservation on {reservation.date} at {reservation.time} is pending confirmation.',
            'noreply@restaurant.com',
            [reservation.email],
            fail_silently=True,
        )
