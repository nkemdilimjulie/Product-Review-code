from django.contrib.auth.models import User
from rest_framework import generics, serializers 
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken
from .models import CustomUser  # Use CustomUser instead of User
from .serializers import RegisterSerializer, UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


# ✅ Define EmptySerializer before using it
class EmptySerializer(serializers.Serializer):
    pass  # This prevents DRF from raising errors when it expects a serializer


class LogoutView(generics.GenericAPIView):
    serializer_class = EmptySerializer  # Assign an empty serializer

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")  # Use `.get()` to avoid `KeyError`
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=400)

            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logout successful"}, status=200)
        except Exception:
            return Response({"error": "Invalid token"}, status=400)

            
class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer