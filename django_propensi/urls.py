from django.contrib import admin
from django.urls import path, include

from propensi import views
from django.conf import settings
from django.conf.urls.static import static
from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('login/', views.login, name='login'),
    path('admin/', admin.site.urls),
    path('api/', include('propensi.urls')),
    
]

if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)