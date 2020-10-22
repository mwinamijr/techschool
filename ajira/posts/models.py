from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=100, null=True, blank= True)
    description = models.TextField(null=True, blank= True)
    photo = models.ImageField(upload_to="my_images", null=True, blank= True)

    def __str__(self):
        return self.title
