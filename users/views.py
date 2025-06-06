from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404

from .models import CustomUser as User

from .serializers import (
    UserSerializer,
    UserSerializerWithToken,
)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        print(data)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        try:
            print(data)
            # Extract fields with optional fallback
            email = data["email"]
            user = User.objects.create(
                first_name=data.get("first_name"),
                middle_name=data.get("middle_name", None),
                last_name=data.get("last_name"),
                email=email,
                username=data.get("username", email),  # Default username = email
                phone_number=data["phone_number"],
                role=data["role"],
                password=make_password(data["password"]),
            )
            serializer = UserSerializerWithToken(user)
            return Response(serializer.data)

        except Exception as e:
            return Response(
                {
                    "detail": "User with this email already exists or invalid data",
                    "error": str(e),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


# --- Self Profile View ---
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        data = request.data
        user.first_name = data.get("name", user.first_name)
        user.first_name = data.get("name", user.first_name)
        user.username = data.get("email", user.username)
        user.email = data.get("email", user.email)
        user.phone_number = data.get("phone_number", user.phone_number)
        if data.get("password"):
            user.password = make_password(data["password"])
        user.save()
        serializer = UserSerializerWithToken(user)
        return Response(serializer.data)


# --- Admin: List & Create Users ---
class UserListCreateView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


# --- Admin: Retrieve, Update, Delete User ---
class UserDetailView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, pk):
        user = get_object_or_404(User, id=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = get_object_or_404(User, id=pk)
        data = request.data

        user.first_name = data.get("name", user.first_name)
        user.username = data.get("email", user.username)
        user.email = data.get("email", user.email)
        user.phone_number = data.get("phone_number", user.phone_number)
        user.is_staff = data.get("isAdmin", user.is_staff)

        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def delete(self, request, pk):
        user = get_object_or_404(User, id=pk)
        user.delete()
        return Response({"detail": "User was deleted."})


# --- Admin: List Unverified Teachers ---
class UnverifiedTeacherListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return User.objects.filter(role="teacher", is_verified=False)


# --- Admin: Approve Teacher ---
class TeacherApproveView(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request, pk):
        user = get_object_or_404(User, id=pk, role="teacher")
        user.is_verified = True
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)
