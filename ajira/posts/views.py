from rest_framework import viewsets

from .models import Post
from .ser

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = UserSerializer