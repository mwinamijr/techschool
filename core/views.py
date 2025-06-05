from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import LessonProgress, QuizResult, TestResult
from .serializers import (
    LessonProgressSerializer,
    QuizResultSerializer,
    TestResultSerializer,
    QuizSubmissionSerializer,
    TestSubmissionSerializer,
)
from examinations.models import Quiz, Test, Question, Option


# -----------------------
# Lesson Progress Views
# -----------------------
class LessonProgressListView(generics.ListAPIView):
    serializer_class = LessonProgressSerializer

    def get_queryset(self):
        return LessonProgress.objects.filter(user=self.request.user)


# -----------------------
# Quiz Result Views
# -----------------------
class QuizResultListView(generics.ListAPIView):
    serializer_class = QuizResultSerializer

    def get_queryset(self):
        return QuizResult.objects.filter(user=self.request.user)


# -----------------------
# Test Result Views
# -----------------------
class TestResultListView(generics.ListAPIView):
    serializer_class = TestResultSerializer

    def get_queryset(self):
        return TestResult.objects.filter(user=self.request.user)


# -----------------------
# Quiz Submission View
# -----------------------
class QuizSubmissionView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = QuizSubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        quiz_id = serializer.validated_data["quiz_id"]
        answers = serializer.validated_data["answers"]
        user = request.user

        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except Quiz.DoesNotExist:
            return Response({"error": "Quiz not found"}, status=404)

        score = 0
        total = 0

        for q_id, selected_option_id in answers.items():
            try:
                question = quiz.questions.get(id=q_id)
                selected_option = question.options.get(id=selected_option_id)
                if selected_option.is_correct:
                    score += 1
                total += 1
            except:
                continue  # Ignore invalid question or option

        final_score = (score / total) * 100 if total > 0 else 0

        result = QuizResult.objects.create(user=user, quiz=quiz, score=final_score)
        return Response(
            {
                "message": "Quiz submitted successfully",
                "score": final_score,
                "result_id": result.id,
            },
            status=201,
        )


# -----------------------
# Test Submission View
# -----------------------
class TestSubmissionView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = TestSubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        test_id = serializer.validated_data["test_id"]
        answers = serializer.validated_data["answers"]
        user = request.user

        try:
            test = Test.objects.get(id=test_id)
        except Test.DoesNotExist:
            return Response({"error": "Test not found"}, status=404)

        score = 0
        total = 0

        for q_id, selected_option_id in answers.items():
            try:
                question = test.questions.get(id=q_id)
                selected_option = question.options.get(id=selected_option_id)
                if selected_option.is_correct:
                    score += 1
                total += 1
            except:
                continue

        final_score = (score / total) * 100 if total > 0 else 0

        result = TestResult.objects.create(user=user, test=test, score=final_score)
        return Response(
            {
                "message": "Test submitted successfully",
                "score": final_score,
                "result_id": result.id,
            },
            status=201,
        )
