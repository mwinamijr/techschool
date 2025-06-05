from django.db import models
from users.models import CustomUser as User


class ClassLevel(models.Model):
    name = models.CharField(max_length=100)  # e.g. Grade 3, Class 5
    description = models.TextField(blank=True)

    def __str__(self):
        return str(self.name)


class Topic(models.Model):
    class_level = models.ForeignKey(
        ClassLevel, on_delete=models.CASCADE, related_name="topics"
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return str(self.title)


class SubTopic(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="subtopics")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return str(self.title)


class Lesson(models.Model):
    subtopic = models.ForeignKey(
        SubTopic, on_delete=models.CASCADE, related_name="lessons"
    )
    title = models.CharField(max_length=255)
    content = models.TextField()
    visual_config = models.JSONField(default=dict)  # Config for frontend rendering
    video_url = models.URLField(blank=True, null=True)
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return str(self.title)


class Illustration(models.Model):
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name="illustrations"
    )
    image = models.ImageField(upload_to="lesson_illustrations/")
    caption = models.CharField(max_length=255, blank=True)
