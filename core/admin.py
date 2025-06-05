from django.contrib import admin
from .models import LessonProgress, QuizResult, TestResult

admin.site.register(LessonProgress)
admin.site.register(QuizResult)
admin.site.register(TestResult)
