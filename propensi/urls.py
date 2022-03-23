from django.urls import path

from .views import UserView, ProfileView, KaryaIlmiahView, KaryaIlmiahUploadView, VerificatorView, SemesterView, daftarVerifikasiView

urlpatterns = [
    path('user', UserView.as_view()),
    path('profile', ProfileView.as_view()),
    path('karyaIlmiah/<int:pk>/', KaryaIlmiahView.as_view(), name='KaryaIlmiahView'),
    path('unggah-karya-ilmiah/', KaryaIlmiahUploadView.as_view(), name='KaryaIlmiahUploadView'),
    path('get-verificator-data/', VerificatorView.as_view(), name='VerifactorView'),
    path('get-semester-data/', SemesterView.as_view(), name='SemesterView'),
    path('daftarVerifikasi/', daftarVerifikasiView.as_view(), name='daftarVerifikasiView'),
]