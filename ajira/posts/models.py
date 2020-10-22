from django.db import models

class Post(models.Model):
    photo = models.ImageField(upload_to="my_images")
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title
