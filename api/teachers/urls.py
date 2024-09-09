from django.urls import path
from users.views import (
    TeacherListView,
)

urlpatterns = [
    path("", TeacherListView.as_view(), name="teacher-list"),
]
