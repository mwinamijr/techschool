from django.urls import path
from users.views import *

urlpatterns = [
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("register/", UserRegisterView.as_view(), name="user-register"),
    path("profile/", UserProfileView.as_view(), name="user-profile"),
    path("", UserListCreateView.as_view(), name="user-list"),
    path("<int:pk>/", UserDetailView.as_view(), name="user-detail"),
    path(
        "teachers/unverified/",
        UnverifiedTeacherListView.as_view(),
        name="unverified-teachers",
    ),
    path(
        "teachers/<int:pk>/approve/",
        TeacherApproveView.as_view(),
        name="approve-teacher",
    ),
]
