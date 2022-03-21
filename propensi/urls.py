from django.urls import path

from .views import UserView, ProfileView

urlpatterns = [
    path('user', UserView.as_view()),
    path('profile', ProfileView.as_view()),
]