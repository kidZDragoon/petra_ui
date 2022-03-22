from django.db import models
from propensi.models_auth import Profile

class KaryaIlmiah(models.Model):
    authors = models.CharField(max_length=500)
    judul = models.CharField(max_length=500)
    status = models.CharField(max_length=500)
    jenis = models.CharField(max_length=500)
    abstrak = models.CharField(max_length=5000)
    tglVerifikasi =  models.DateField()
    userPengunggah = models.ForeignKey(Profile, on_delete=models.CASCADE)
    dosenPembimbing = models.ForeignKey(Profile, on_delete=models.CASCADE)
    verifikator = models.ForeignKey(Profile, on_delete=models.CASCADE)
    daftarPengunduh = models.ManyToManyField(Profile,blank=True)


class Pengumuman(models.Model):
    judul = models.CharField(max_length=500)
    stafPembuat = models.ForeignKey(Profile,on_delete=models.CASCADE)
    tglDibuat =  models.DateField()
    tglDisunting =  models.DateField()
    isiPengumuman = models.CharField(max_length=5000)

class Kategori(models.Model):
    nama = models.CharField(max_length=50)
    listKaryaIlmiah = models.ManyToManyField(KaryaIlmiah,blank=True)

