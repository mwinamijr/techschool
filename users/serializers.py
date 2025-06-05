from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "first_name",
            "middle_name",
            "last_name",
            "username",
            "phone_number",
            "is_admin",
            "role",
            "is_verified",
            "avatar",
        ]

    def get_is_admin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = UserSerializer.Meta.fields + ["token"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
