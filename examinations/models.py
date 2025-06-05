from django.db import models
from users.models import CustomUser as User
from lessons.models import Lesson, SubTopic

QUESTION_TYPES = (
    ("mcq", "Multiple Choice"),
    ("fitb", "Fill in the Blank"),
    ("truefalse", "True/False"),
    ("essay", "Essay"),
)


class Activity(models.Model):
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name="activities"
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)


class Quiz(models.Model):
    subtopic = models.ForeignKey(
        SubTopic, on_delete=models.CASCADE, related_name="quizzes"
    )
    title = models.CharField(max_length=255)
    instructions = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)
    text = models.TextField()
    choices = models.JSONField(blank=True, null=True)  # for MCQ
    correct_answer = models.TextField()  # could also use JSON


class Test(models.Model):
    title = models.CharField(max_length=255)
    topics = models.ManyToManyField("lessons.Topic")
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True
    )
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
