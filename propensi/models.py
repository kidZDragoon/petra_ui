from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

import json
import os
import uuid
from django.core.validators import FileExtensionValidator

ORG_CODE = {}
LANG = settings.SSO_UI_ORG_DETAIL_LANG


with open(settings.SSO_UI_ORG_DETAIL_FILE_PATH, 'r') as ORG_CODE_FILE:
    ORG_CODE.update(json.load(ORG_CODE_FILE))


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField('nama', max_length=128, blank=True)
    org_code = models.CharField('kode organisasi', max_length=11, blank=True)
    role = models.CharField('peran pengguna', max_length=128, blank=True)
    npm = models.CharField('Nomor Pokok Mahasiswa', max_length=10, blank=True)
    faculty = models.CharField('fakultas', max_length=128, blank=True)
    study_program = models.CharField('program studi', max_length=128, blank=True)
    educational_program = models.CharField('program pendidikan', max_length=128, blank=True)

    class Meta:
        verbose_name = 'profil'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(instance, **kwargs):
    instance.profile.save()


def save_user_attributes(user, attributes):
    user.save()
    profile = user.profile
    profile.role = attributes['peran_user']
    profile.npm = attributes['npm']
    if profile.role == 'mahasiswa':
        user.email = f'{user.username}@ui.ac.id'

    full_name = attributes['nama']
    i = full_name.rfind(' ')
    user.first_name, user.last_name = full_name[:i], full_name[i + 1:]

    org_code = attributes['kd_org']
    record = ORG_CODE[LANG][org_code]
    profile.org_code = org_code
    profile.faculty = record['faculty']
    profile.full_name = full_name
    profile.study_program = record['study_program']
    profile.educational_program = record['educational_program']
    profile.save()
    user.save()


class Semester(models.Model):
    semester = models.CharField(max_length=500)


class KaryaIlmiah(models.Model):
    author = models.CharField(max_length=500)
    npm = models.CharField(max_length=15)
    judul = models.CharField(max_length=500)
    status = models.CharField(max_length=500)
    jenis = models.CharField(max_length=500)
    abstrak = models.CharField(max_length=5000)
    kataKunci = models.CharField(max_length=5000,null=True)
    tglDisetujui = models.DateField(null=True)
    semesterDisetujui = models.ForeignKey(Semester, on_delete=models.DO_NOTHING, related_name="semester_disetujui")
    tglVerifikasi = models.DateField(null=True)
    userPengunggah = models.ForeignKey(Profile, on_delete=models.DO_NOTHING, related_name="user_pengunggah", null=True)
    dosenPembimbing = models.ForeignKey(Profile, on_delete=models.DO_NOTHING, related_name="dosen_pembimbing", null=True)
    verifikator = models.ForeignKey(Profile, on_delete=models.DO_NOTHING, related_name="verifikator", null=True)
    fileURI = models.UUIDField(primary_key=False, default=uuid.uuid4, editable=False)

    def get_upload_path(instance, filename):
        return os.path.join("files/%s" % instance.fileURI)
    
    def validate_file_extension(value):
        pass

    filePDF = models.FileField(upload_to=get_upload_path, null=True, max_length=500, validators=[FileExtensionValidator(['pdf'])])

class DaftarUnduhan(models.Model):
    karyaIlmiah = models.ForeignKey(KaryaIlmiah, on_delete=models.CASCADE)
    idProfile = models.CharField(max_length=500)
    fullName = models.CharField(max_length=500)
    tglUnduh = models.CharField(max_length=500)


class Pengumuman(models.Model):
    judul = models.CharField(max_length=500)
    stafPembuat = models.ForeignKey(Profile, on_delete=models.DO_NOTHING)
    tglDibuat = models.DateField()
    tglDisunting = models.DateField()
    isiPengumuman = models.CharField(max_length=5000)


class Kategori(models.Model):
    nama = models.CharField(max_length=50)
    listKaryaIlmiah = models.ManyToManyField(KaryaIlmiah)

class Visitors(models.Model):
    ip = models.CharField(max_length=200)
    tanggalKunjungan = models.DateField()
