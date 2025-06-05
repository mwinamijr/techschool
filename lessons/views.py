from rest_framework import generics
from .models import ClassLevel, Topic, SubTopic, Lesson
from .serializers import (
    ClassLevelSerializer,
    TopicSerializer,
    SubTopicSerializer,
    LessonSerializer,
)


# Class Level Views
class ClassLevelListView(generics.ListAPIView):
    queryset = ClassLevel.objects.all()
    serializer_class = ClassLevelSerializer


class ClassLevelDetailView(generics.RetrieveAPIView):
    queryset = ClassLevel.objects.all()
    serializer_class = ClassLevelSerializer


# Topic Views
class TopicListView(generics.ListAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class TopicDetailView(generics.RetrieveAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


# Subtopic Views
class SubTopicListView(generics.ListAPIView):
    queryset = SubTopic.objects.all()
    serializer_class = SubTopicSerializer


class SubTopicDetailView(generics.RetrieveAPIView):
    queryset = SubTopic.objects.all()
    serializer_class = SubTopicSerializer


# Lesson Views
class LessonListView(generics.ListAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer


class LessonDetailView(generics.RetrieveAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
