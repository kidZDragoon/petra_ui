from django.urls import path, re_path
from .views import UserView, ProfileView, KaryaIlmiahView, KaryaIlmiahUploadView, SemesterView, \
    DaftarVerifikasiView, CariKaril, DownloadPDF, CreateDaftarUnduhanView, GetDaftarUnduhanView, MetriksUnggahanView, \
    MetriksPengunjung, TahunMetriksPengunjung, MetriksUnduhanView, TahunMetriksUnduhan, MetriksTop3Unduhan, \
    DeleteKarilView, KaryaIlmiahUpdateUploadView, KaryaIlmiahUpdateView, PengumumanView, KaryaIlmiahSaya, PengumumanUpdateDeleteView, \
    KaryaIlmiahStatusView, AddBookmarkView, BookmarkListView, DeleteBookmarkView, CheckBookmarkStatusView, ProfilePageView, CariUser, CariProfile


urlpatterns = [
     path('user', UserView.as_view(), name='UserView'),
     path('profile', ProfileView.as_view(), name='ProfileView'),
     path('profile/<int:pk>/', ProfileView.as_view(), name='ProfileView'),
     path('daftarUnduhan', CreateDaftarUnduhanView.as_view(), name='CreateDaftarUnduhanView'),
     path('daftarUnduhan/<int:pk>', GetDaftarUnduhanView.as_view(), name='GetDaftarUnduhanView'),
     path('daftarBookmark', BookmarkListView.as_view(), name='BookmarkListView'),
     path('daftarBookmark/add/<int:pk>', AddBookmarkView.as_view(), name='AddBookmarkView'),
     path('daftarBookmark/delete/<int:pk>', DeleteBookmarkView.as_view(), name='DeleteBookmarkView'),
     path('daftarBookmark/check/<int:pk>', CheckBookmarkStatusView.as_view(), name='CheckBookmarkStatusView'),
     path('karyaIlmiah/<int:pk>/', KaryaIlmiahView.as_view(), name='KaryaIlmiahView'),
     path('unggah-karya-ilmiah/', KaryaIlmiahUploadView.as_view(),
          name='KaryaIlmiahUploadView'),
     path('get-semester-data/', SemesterView.as_view(), name='SemesterView'),
     path('download/<str:path>', DownloadPDF, name='download_pdf'),
     path('search/', CariKaril.as_view(), name='cariKaril'),
     path('daftar-verifikasi/', DaftarVerifikasiView.as_view(),
          name='daftarVerifikasiView'),
     path('edit-status/<int:pk>', KaryaIlmiahStatusView.as_view(), name='KaryaIlmiahStatusView'),
     path('metriks/unggahan/', MetriksUnggahanView.as_view(),
          name='metriksUnggahanView'),
     path('metriks/pengunjung/', MetriksPengunjung.as_view(), name='countVisit'),
     path('metriks/pengunjung/<int:tahun>/',
          MetriksPengunjung.as_view(), name='metriksPengunjungView'),
     path('metriks/pengunjung/get-year/', TahunMetriksPengunjung.as_view(),
          name='tahunMetriksPengunjungView'),
     path('metriks/unduhan/<int:tahun>/',
          MetriksUnduhanView.as_view(), name='metriksUnduhanView'),
     path('metriks/unduhan/get-year/', TahunMetriksUnduhan.as_view(),
          name='tahunMetriksUnduhanView'),
     path('metriks/unduhan/top3/', MetriksTop3Unduhan.as_view(),
          name='metriksTop3Unduhan'),
     path('edit-karil-upload/<int:pk>', KaryaIlmiahUpdateUploadView.as_view(),
          name='KaryaIlmiahUpdateUploadView'),
     path('edit-karil/<int:pk>', KaryaIlmiahUpdateView.as_view(),
          name='KaryaIlmiahUpdateView'),
     path('delete/<int:pk>/',  DeleteKarilView.as_view(), name='DeleteKarilView'),
     path('pengumuman/', PengumumanView.as_view(), name='pengumumanView'),
     path('pengumuman/<int:pk>/', PengumumanUpdateDeleteView.as_view(),
          name='PengumumanUpdateDeleteView'),
     path('karya-ilmiah-saya/get-all/<int:userId>/', KaryaIlmiahSaya.as_view(), name='karyaIlmiahSaya'),
     path('kelola-user/<int:userId>/', ProfilePageView.as_view(), name='profilePageView'),
     path('kelola-semester/', ProfilePageView.as_view(), name='profilePageView'),
     path('search-profile/', CariProfile.as_view(), name='cariProfie'),
     path('search-user/', CariUser.as_view(), name='cariUser'),

]
