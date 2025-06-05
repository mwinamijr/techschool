from django.urls import path
from examinations.views import (
    ActivityListView,
    ActivityDetailView,
    QuizListView,
    QuizDetailView,
)

urlpatterns = [
    path("activities/", ActivityListView.as_view(), name="activity-list"),
    path("activities/<int:pk>/", ActivityDetailView.as_view(), name="activity-detail"),
    path("quizzes/", QuizListView.as_view(), name="quiz-list"),
    path("quizzes/<int:pk>/", QuizDetailView.as_view(), name="quiz-detail"),
]
