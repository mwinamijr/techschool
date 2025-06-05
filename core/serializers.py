from rest_framework import serializers
from .models import LessonProgress, QuizResult, TestResult
from lessons.models import Lesson
from examinations.models import Quiz, Test


class LessonProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonProgress
        fields = ["id", "user", "lesson", "completed", "viewed_on"]


class QuizResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizResult
        fields = ["id", "user", "quiz", "score", "submitted_on"]


class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = ["id", "user", "test", "score", "submitted_on"]


# -----------------------------
# Submission Serializers
# -----------------------------
class QuizSubmissionSerializer(serializers.Serializer):
    quiz_id = serializers.IntegerField()
    answers = serializers.DictField(
        child=serializers.IntegerField(),
        help_text="Question ID as key, Option ID as value",
    )


class TestSubmissionSerializer(serializers.Serializer):
    test_id = serializers.IntegerField()
    answers = serializers.DictField(
        child=serializers.IntegerField(),
        help_text="Question ID as key, Option ID as value",
    )
