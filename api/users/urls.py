from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import (
    MyTokenObtainPairView,
    UserListView,
    UserDetailView,
)

urlpatterns = [
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("", UserListView.as_view(), name="user-list"),
    path("<str:pk>/", UserDetailView.as_view(), name="user-details"),
]
