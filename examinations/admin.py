from django.contrib import admin
from .models import Activity, Quiz, Question, Option, StudentAnswer

admin.site.register(Activity)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(StudentAnswer)
