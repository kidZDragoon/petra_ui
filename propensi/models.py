from django.db import models
from propensi.models_auth import Profile
import os
import uuid
from django.core.validators import FileExtensionValidator

class Semester(models.Model):
    semester = models.CharField(max_length=500)

class KaryaIlmiah(models.Model):
    author = models.CharField(max_length=500)
    npm = models.CharField(max_length=15)
    judul = models.CharField(max_length=500)
    status = models.CharField(max_length=500)
    jenis = models.CharField(max_length=500)
    abstrak = models.CharField(max_length=5000)
    tglDisetujui =  models.DateField(null=True)
    semesterDisetujui = models.ForeignKey(Semester, on_delete=models.DO_NOTHING, related_name="semester_disetujui")
    tglVerifikasi =  models.DateField(null=True)
    userPengunggah = models.ForeignKey(Profile, on_delete=models.DO_NOTHING, related_name="user_pengunggah", null=True)
    dosenPembimbing = models.ForeignKey(Profile, on_delete=models.DO_NOTHING, related_name="dosen_pembimbing")
    verifikator = models.ForeignKey(Profile, on_delete=models.DO_NOTHING, related_name="verifikator", null=True)
    daftarPengunduh = models.ManyToManyField(Profile)
    fileURI = models.UUIDField(primary_key=False, default=uuid.uuid4, editable=False)

    def get_upload_path(instance, filename):
        return os.path.join("files/%s" % instance.fileURI)
    
    def validate_file_extension(value):
        pass

    filePDF = models.FileField(upload_to=get_upload_path, null=True, max_length=500, validators=[FileExtensionValidator(['pdf'])])

class Pengumuman(models.Model):
    judul = models.CharField(max_length=500)
    stafPembuat = models.ForeignKey(Profile, on_delete=models.DO_NOTHING)
    tglDibuat =  models.DateField()
    tglDisunting =  models.DateField()
    isiPengumuman = models.CharField(max_length=5000)

class Kategori(models.Model):
    nama = models.CharField(max_length=50)
    listKaryaIlmiah = models.ManyToManyField(KaryaIlmiah)

