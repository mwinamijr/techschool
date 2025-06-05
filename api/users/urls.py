from django.urls import path
from users.views import (
    MyTokenObtainPairView,
    registerUser,
    approve_teacher,
    list_unverified_teachers,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
)

urlpatterns = [
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("register/", registerUser, name="register"),
    path("approve-teacher/<str:pk>/", approve_teacher, name="approve-teacher"),
    path("unverified-teachers/", list_unverified_teachers, name="unverified-teachers"),
    # User profile related paths
    path("profile/", getUserProfile, name="users-profile"),
    path("profile/update/", updateUserProfile, name="user-profile-update"),
    path("", getUsers, name="users"),
    path("<str:pk>/", getUserById, name="user"),
    path("update/<str:pk>/", updateUser, name="user-update"),
    path("delete/<str:pk>/", deleteUser, name="user-delete"),
]
