from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer, ForgotPasswordSerializer, ResetPasswordSerializer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.core.mail import send_mail
from .models import User

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Registration successful"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                token = PasswordResetTokenGenerator().make_token(user)
                uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
                
                # Link format: /reset-password/<token>?uid=<uid>
                # User Requirement: Clicking link opens reset password page
                # Frontend Route: /reset-password/:token
                # Wait, usually it's /reset-password/:uid/:token
                # Let's send a link with uid and token as query params or path params
                # I'll construct a link like: http://localhost:5173/reset-password/<uidb64>/<token>
                # But frontend route is /reset-password/:token (step 123)
                # I should check frontend route again.
                # Route path="/reset-password/:token" element={<ResetPassword />}
                # It only takes token? How does it get UID? 
                # Maybe token stores UID? No, Django token doesn't.
                # I should probably change frontend route to /reset-password/:uid/:token
                # But "Configuration without changing UI" -> I can pass uid in query param?
                # /reset-password/TOKEN?uid=UID
                
                link = f"http://localhost:5173/reset-password/{token}?uid={uidb64}"
                
                send_mail(
                    "Password Reset Request",
                    f"Click the link to reset your password: {link}",
                    "noreply@restaurant.com",
                    [email],
                    fail_silently=True
                )
            except User.DoesNotExist:
                pass # Security: don't reveal email existence
            
            return Response({"message": "If email exists, a reset link has been sent."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
