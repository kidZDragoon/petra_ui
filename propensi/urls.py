from django.urls import path

from .views import UserView, ProfileView, KaryaIlmiahView, daftarVerifikasiView

urlpatterns = [
    path('user', UserView.as_view()),
    path('profile', ProfileView.as_view()),
    path('karyaIlmiah/<int:pk>/', KaryaIlmiahView.as_view(), name='KaryaIlmiahView'),
    path('daftarVerifikasi/', daftarVerifikasiView.as_view(), name='daftarVerifikasiView')
]