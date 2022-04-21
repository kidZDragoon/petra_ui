from django.urls import path, re_path

from .views import UserView, ProfileView, KaryaIlmiahView, KaryaIlmiahUploadView, VerificatorView, SemesterView, DaftarVerifikasiView, CariKaril, DownloadPDF, DeleteKarilView, KaryaIlmiahUpdateUploadView, KaryaIlmiahUpdateView

urlpatterns = [
    path('user', UserView.as_view(), name='UserView'),
    path('profile', ProfileView.as_view(), name='ProfileView'),
    path('karyaIlmiah/<int:pk>/', KaryaIlmiahView.as_view(), name='KaryaIlmiahView'),
    path('unggah-karya-ilmiah/', KaryaIlmiahUploadView.as_view(),
         name='KaryaIlmiahUploadView'),
    path('get-verificator-data/', VerificatorView.as_view(), name='VerifactorView'),
    path('get-semester-data/', SemesterView.as_view(), name='SemesterView'),
    path('download/<str:path>', DownloadPDF, name='download_pdf'),
    path('search/', CariKaril.as_view(), name='cariKaril'),
    path('edit-karil-upload/<int:pk>', KaryaIlmiahUpdateUploadView.as_view(),
         name='KaryaIlmiahUpdateUploadView'),
    path('edit-karil/<int:pk>', KaryaIlmiahUpdateView.as_view(),
         name='KaryaIlmiahUpdateView'),
    path('delete/<int:pk>/',  DeleteKarilView.as_view(), name='DeleteKarilView'),
    path('search/', CariKaril.as_view(), name='cariKaril'),
    path('daftar-verifikasi/', DaftarVerifikasiView.as_view(),
         name='daftarVerifikasiView'),
]
