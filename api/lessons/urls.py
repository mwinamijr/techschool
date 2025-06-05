from django.urls import path
from lessons.views import (
    ClassLevelListView,
    ClassLevelDetailView,
    TopicListView,
    TopicDetailView,
    SubTopicListView,
    SubTopicDetailView,
    LessonListView,
    LessonDetailView,
)

urlpatterns = [
    path("class-levels/", ClassLevelListView.as_view(), name="classlevel-list"),
    path(
        "class-levels/<int:pk>/",
        ClassLevelDetailView.as_view(),
        name="classlevel-detail",
    ),
    path("topics/", TopicListView.as_view(), name="topic-list"),
    path("topics/<int:pk>/", TopicDetailView.as_view(), name="topic-detail"),
    path("subtopics/", SubTopicListView.as_view(), name="subtopic-list"),
    path("subtopics/<int:pk>/", SubTopicDetailView.as_view(), name="subtopic-detail"),
    path("lessons/", LessonListView.as_view(), name="lesson-list"),
    path("lessons/<int:pk>/", LessonDetailView.as_view(), name="lesson-detail"),
]
