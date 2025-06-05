from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "first_name",
            "middle_name",
            "last_name",
            "is_admin",
            "role",
        ]


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "first_name",
            "middle_name",
            "last_name",
            "is_admin",
            "role",
            "token",
        ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
