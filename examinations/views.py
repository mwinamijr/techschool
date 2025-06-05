from rest_framework import generics
from .models import Activity, Quiz
from .serializers import (
    ActivitySerializer,
    QuizSerializer,
)


class ActivityListView(generics.ListAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class ActivityDetailView(generics.RetrieveAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class QuizListView(generics.ListAPIView):
    queryset = Quiz.objects.filter(is_active=True)
    serializer_class = QuizSerializer


class QuizDetailView(generics.RetrieveAPIView):
    queryset = Quiz.objects.filter(is_active=True)
    serializer_class = QuizSerializer
