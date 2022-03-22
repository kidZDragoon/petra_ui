from django.urls import path

from .views import UserView, ProfileView, KaryaIlmiahView, CariKaril

urlpatterns = [
    path('user', UserView.as_view()),
    path('profile', ProfileView.as_view()),
    path('karyaIlmiah/<int:pk>/', KaryaIlmiahView.as_view(), name='KaryaIlmiahView'),
    path('search/', CariKaril.as_view(), name='cariKaril'),
]
