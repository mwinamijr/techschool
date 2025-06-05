from django.urls import path
from core.views import (
    LessonProgressListView,
    QuizResultListView,
    TestResultListView,
    QuizSubmissionView,
    TestSubmissionView,
)

urlpatterns = [
    path("lesson-progress/", LessonProgressListView.as_view(), name="lesson-progress"),
    path("quiz-results/", QuizResultListView.as_view(), name="quiz-results"),
    path("test-results/", TestResultListView.as_view(), name="test-results"),
    path("submit-quiz/", QuizSubmissionView.as_view(), name="submit-quiz"),
    path("submit-test/", TestSubmissionView.as_view(), name="submit-test"),
]
