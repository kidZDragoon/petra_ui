from django.contrib import admin
from django.urls import path, include

from propensi import views

from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('login/', views.login, name='login'),
    path('admin/', admin.site.urls),
    path('api/', include('propensi.urls')),
    
]