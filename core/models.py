from django.db import models
from users.models import CustomUser as User
from lessons.models import Lesson
from examinations.models import Quiz, Test


class LessonProgress(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="lesson_progress"
    )
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    viewed_on = models.DateTimeField(auto_now=True)


class QuizResult(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="quiz_results"
    )
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.FloatField()
    submitted_on = models.DateTimeField(auto_now_add=True)


class TestResult(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="test_results"
    )
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    score = models.FloatField()
    submitted_on = models.DateTimeField(auto_now_add=True)
