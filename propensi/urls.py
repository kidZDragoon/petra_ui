from django.urls import path

from .views import UserView, ProfileView, KaryaIlmiahView, KaryaIlmiahUploadView, VerificatorView,SemesterView, DaftarVerifikasiView, CariKaril, KaryaIlmiahStatusView, DownloadPDF
from .views import UserView, ProfileView, KaryaIlmiahView, KaryaIlmiahUploadView, VerificatorView, SemesterView, \
    DaftarVerifikasiView, CariKaril, DownloadPDF, CreateDaftarUnduhanView, GetDaftarUnduhan,  PengumumanView, PengumumanUpdateDeleteView

urlpatterns = [
    path('user', UserView.as_view(), name='UserView'),
    path('profile', ProfileView.as_view(), name='ProfileView'),
    path('profile/<int:pk>/', ProfileView.as_view(), name='ProfileView'),
    path('daftarUnduhan', CreateDaftarUnduhanView.as_view(), name='createDaftarUnduhanView'),
    path('daftarUnduhan/<int:pk>', GetDaftarUnduhan.as_view(), name='getDaftarUnduhan'),
    path('karyaIlmiah/<int:pk>/', KaryaIlmiahView.as_view(), name='KaryaIlmiahView'),
    path('unggah-karya-ilmiah/', KaryaIlmiahUploadView.as_view(), name='KaryaIlmiahUploadView'),
    path('get-verificator-data/', VerificatorView.as_view(), name='VerifactorView'),
    path('get-semester-data/', SemesterView.as_view(), name='SemesterView'),
    path('download/<str:path>', DownloadPDF, name='download_pdf'),
    path('search/', CariKaril.as_view(), name='cariKaril'),
    path('daftar-verifikasi/', DaftarVerifikasiView.as_view(), name='daftarVerifikasiView'),
    path('edit-status/<int:pk>', KaryaIlmiahStatusView.as_view(), name='KaryaIlmiahStatusView'),
    path('pengumuman/', PengumumanView.as_view(), name='pengumumanView'),
    path('pengumuman/<int:pk>/', PengumumanUpdateDeleteView.as_view(), name='PengumumanUpdateDeleteView'),
   
]
