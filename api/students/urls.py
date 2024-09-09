from django.urls import path
from users.views import (
    StudentListView,
)

urlpatterns = [
    path("", StudentListView.as_view(), name="student-list"),
]
