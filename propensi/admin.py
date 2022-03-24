from django.contrib import admin
from .models import Profile, Semester, KaryaIlmiah, Pengumuman, Kategori

admin.site.register(Profile)
admin.site.register(Semester)
admin.site.register(KaryaIlmiah)
admin.site.register(Pengumuman)
admin.site.register(Kategori)