from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


from .models import CustomUser, Student, Teacher


class UserSerializer(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField(read_only=True)
    is_teacher = serializers.SerializerMethodField(read_only=True)
    is_student = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "first_name",
            "middle_name",
            "last_name",
            "is_admin",
            "is_teacher",
            "is_student",
        ]

    def get_is_admin(self, obj):
        return obj.is_staff

    def get_is_teacher(self, obj):
        return obj.is_teacher

    def get_is_student(self, obj):
        return obj.is_student


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    user_type = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "first_name",
            "middle_name",
            "last_name",
            "is_admin",
            "user_type",
            "token",
        ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    def get_user_type(self, obj):
        serializer_data = UserSerializer(obj).data
        is_teacher = serializer_data.get("is_teacher")
        is_student = serializer_data.get("is_student")
        if is_teacher:
            return {"is_teacher": is_teacher}
        else:
            return {"is_student": is_student}


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"
