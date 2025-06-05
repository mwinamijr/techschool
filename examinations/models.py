from django.db import models
from django.conf import settings
from lessons.models import SubTopic


class Activity(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    subtopic = models.ForeignKey(
        SubTopic, related_name="activities", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title


class Quiz(models.Model):
    title = models.CharField(max_length=200)
    activity = models.ForeignKey(
        Activity, related_name="quizzes", on_delete=models.CASCADE
    )
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    QUESTION_TYPE_CHOICES = (
        ("mcq", "Multiple Choice"),
        ("truefalse", "True/False"),
        ("fitb", "Fill in the Blank"),
        ("shortanswer", "Short Answer"),
        ("essay", "Essay"),
    )

    quiz = models.ForeignKey(Quiz, related_name="questions", on_delete=models.CASCADE)
    text = models.TextField()
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPE_CHOICES)

    def __str__(self):
        return f"{self.quiz.title} - {self.text[:50]}"


class Option(models.Model):
    question = models.ForeignKey(
        Question, related_name="options", on_delete=models.CASCADE
    )
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text


class StudentAnswer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(
        Option, on_delete=models.SET_NULL, null=True, blank=True
    )
    answered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.question.id}"


class Test(models.Model):
    title = models.CharField(max_length=255)
    topics = models.ManyToManyField("lessons.Topic")
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
