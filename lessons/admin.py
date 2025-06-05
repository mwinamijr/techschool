from django.contrib import admin
from .models import ClassLevel, Topic, SubTopic, Lesson, Illustration

admin.site.register(ClassLevel)
admin.site.register(Topic)
admin.site.register(SubTopic)
admin.site.register(Lesson)
admin.site.register(Illustration)
