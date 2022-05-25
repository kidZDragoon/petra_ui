from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from rest_framework.serializers import ReadOnlyField, SerializerMethodField
from django.db.models import Value as V
from django.db.models.functions import Concat
from django.utils.timezone import datetime
from .models import User, Profile, KaryaIlmiah, Semester, DaftarUnduhan, Visitors, Pengumuman


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name',
                  'email', 'id')  # ditambahin id


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'full_name', 'user', 'org_code', 'role',
                  'npm', 'faculty', 'study_program', 'educational_program')


class DaftarUnduhanSerializer(serializers.ModelSerializer):
    class Meta:
        model = DaftarUnduhan
        fields = ('karyaIlmiah', 'idProfile', 'fullName', 'tglUnduh')


class KaryaIlmiahSeriliazer(serializers.ModelSerializer):
    class Meta:
        model = KaryaIlmiah
        fields = "__all__"
        depth = 1


class SemesterDisetujuiField(serializers.PrimaryKeyRelatedField):
    def display_value(self, instance):
        return instance.semester


class KaryaIlmiahUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = KaryaIlmiah
        fields = ["author",
                  "npm",
                  "judul",
                  "tglDisetujui",
                  "semesterDisetujui",
                  "abstrak",
                  "jenis",
                  "kataKunci",
                  "filePDF",
                  "userPengunggah"]

    semesterDisetujui = SemesterDisetujuiField(queryset=Semester.objects.all())

    def create(self, validated_data):
        author = validated_data['author']
        npm = validated_data['npm']
        judul = validated_data['judul']
        tglDisetujui = validated_data['tglDisetujui']
        semesterDisetujui = validated_data['semesterDisetujui']
        abstrak = validated_data['abstrak']
        jenis = validated_data['jenis']
        filePDF = validated_data['filePDF']
        userPengunggah = validated_data['userPengunggah']
        kataKunci = validated_data['kataKunci']
        statusVerifikasi = 0
        karyaIlmiah = KaryaIlmiah(author=author, npm=npm, judul=judul, tglDisetujui=tglDisetujui, semesterDisetujui=semesterDisetujui,
                                  abstrak=abstrak, kataKunci=kataKunci, jenis=jenis, filePDF=filePDF,
                                  status=statusVerifikasi, userPengunggah=userPengunggah)

        karyaIlmiah.save()
        return karyaIlmiah


class KaryaIlmiahEditUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = KaryaIlmiah
        fields = ["id",
                  "author",
                  "npm",
                  "judul",
                  "tglDisetujui",
                  "semesterDisetujui",
                  "abstrak",
                  "jenis",
                  "kataKunci",
                  "filePDF",
                  "userPengunggah"]

    semesterDisetujui = SemesterDisetujuiField(queryset=Semester.objects.all())

    def create(self, validated_data):
        author = validated_data['author']
        npm = validated_data['npm']
        judul = validated_data['judul']
        tglDisetujui = validated_data['tglDisetujui']
        semesterDisetujui = validated_data['semesterDisetujui']
        abstrak = validated_data['abstrak']
        jenis = validated_data['jenis']
        filePDF = validated_data['filePDF']
        userPengunggah = validated_data['userPengunggah']
        kataKunci = validated_data['kataKunci']
        statusVerifikasi = validated_data['statusVerifikasi']
        karyaIlmiah = KaryaIlmiah(author=author, npm=npm, judul=judul, tglDisetujui=tglDisetujui, semesterDisetujui=semesterDisetujui,
                                  abstrak=abstrak, kataKunci=kataKunci, jenis=jenis, filePDF=filePDF,
                                  status=statusVerifikasi, userPengunggah=userPengunggah)

        karyaIlmiah.save()
        return karyaIlmiah


class KaryaIlmiahEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = KaryaIlmiah
        fields = ["author",
                  "npm",
                  "judul",
                  "tglDisetujui",
                  "semesterDisetujui",
                  "abstrak",
                  "jenis",
                  "kataKunci",
                  "userPengunggah"]

    semesterDisetujui = SemesterDisetujuiField(queryset=Semester.objects.all())

    def create(self, validated_data):
        author = validated_data['author']
        npm = validated_data['npm']
        judul = validated_data['judul']
        tglDisetujui = validated_data['tglDisetujui']
        semesterDisetujui = validated_data['semesterDisetujui']
        abstrak = validated_data['abstrak']
        jenis = validated_data['jenis']
        userPengunggah = validated_data['userPengunggah']
        kataKunci = validated_data['kataKunci']
        statusVerifikasi = validated_data['statusVerifikasi']
        karyaIlmiah = KaryaIlmiah(author=author, npm=npm, judul=judul, tglDisetujui=tglDisetujui, semesterDisetujui=semesterDisetujui,
                                  abstrak=abstrak, kataKunci=kataKunci, jenis=jenis,
                                  status=statusVerifikasi, userPengunggah=userPengunggah)

        karyaIlmiah.save()
        return karyaIlmiah



class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ['id', 'semester']


class KarilSeriliazer(serializers.ModelSerializer):
    class Meta:
        model = KaryaIlmiah
        fields = ['id', 'judul', 'status', 'jenis',
                  'kataKunci', 'tglDisetujui', 'author', 'fileURI']


class VisitorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitors
        fields = ['ip']


class KaryaIlmiahStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = KaryaIlmiah
        fields = ["status"]

    def create(self, validated_data):
        status = validated_data['status']
        karyaIlmiah = KaryaIlmiah(status=status)

        karyaIlmiah.save()
        return karyaIlmiah


class PengumumanSeriliazer(serializers.ModelSerializer):
    class Meta:
        model = Pengumuman
        fields = "__all__"

    def create(self, validated_data):
        print("masuk serializer")
        print(validated_data)
        judul = validated_data['judul']
        print("author")
        isiPengumuman = validated_data['isiPengumuman']
        print("npm")
        tglDibuat = validated_data['tglDibuat']
        print("judul")
        tglDisunting = validated_data['tglDisunting']
        print("tglDisetujui")
        stafPembuat = validated_data['stafPembuat']
        print("smtDisetujui")
        pengumuman = Pengumuman(judul=judul, isiPengumuman=isiPengumuman, tglDibuat=tglDibuat, tglDisunting=tglDisunting,
                                stafPembuat=stafPembuat)
        print("created pengumuman object")
        pengumuman.save()
        return pengumuman
