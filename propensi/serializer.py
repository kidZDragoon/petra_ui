from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from rest_framework.serializers import ReadOnlyField, SerializerMethodField
from django.db.models import Value as V
from django.db.models.functions import Concat

from .models import User, Profile, KaryaIlmiah, Semester


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user', 'org_code', 'role', 'npm',
                  'faculty', 'study_program', 'educational_program')


class KaryaIlmiahSeriliazer(serializers.ModelSerializer):
    class Meta:
        model = KaryaIlmiah
        fields = "__all__"
        depth = 1


class DosenPembimbingField(serializers.PrimaryKeyRelatedField):
    def display_value(self, instance):
        return instance.user.first_name + " " + instance.user.last_name


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
                  "dosenPembimbing",
                  "filePDF",
                  "userPengunggah"]

    dosenPembimbing = DosenPembimbingField(
        queryset=Profile.objects.filter(role='verifikator'))
    semesterDisetujui = SemesterDisetujuiField(queryset=Semester.objects.all())

    def create(self, validated_data):
        print("masuk serializer")
        print(validated_data)
        author = validated_data['author']
        print("author")
        npm = validated_data['npm']
        print("npm")
        judul = validated_data['judul']
        print("judul")
        tglDisetujui = validated_data['tglDisetujui']
        print("tglDisetujui")
        semesterDisetujui = validated_data['semesterDisetujui']
        print("smtDisetujui")
        abstrak = validated_data['abstrak']
        print("abstrak")
        jenis = validated_data['jenis']
        print("jenis")
        filePDF = validated_data['filePDF']
        print("filePDF")
        dosenPembimbing = validated_data['dosenPembimbing']
        print("dosenPmb")
        userPengunggah = validated_data['userPengunggah']
        print("userpengunggah")
        print(validated_data['kataKunci'])
        kataKunci = validated_data['kataKunci']
        print("kataKunci")
        statusVerifikasi = 0
        print("di sini")
        karyaIlmiah = KaryaIlmiah(author=author, npm=npm, judul=judul, tglDisetujui=tglDisetujui, semesterDisetujui=semesterDisetujui,
                                  abstrak=abstrak, kataKunci=kataKunci, jenis=jenis, filePDF=filePDF, dosenPembimbing=dosenPembimbing,
                                  status=statusVerifikasi, userPengunggah=userPengunggah)

        print("created karya ilmiah object")
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
                  "dosenPembimbing",
                  "filePDF",
                  "userPengunggah"]

    dosenPembimbing = DosenPembimbingField(
        queryset=Profile.objects.filter(role='verifikator'))
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
        dosenPembimbing = validated_data['dosenPembimbing']
        userPengunggah = validated_data['userPengunggah']
        kataKunci = validated_data['kataKunci']
        statusVerifikasi = validated_data['statusVerifikasi']
        karyaIlmiah = KaryaIlmiah(author=author, npm=npm, judul=judul, tglDisetujui=tglDisetujui, semesterDisetujui=semesterDisetujui,
                                  abstrak=abstrak, kataKunci=kataKunci, jenis=jenis, filePDF=filePDF, dosenPembimbing=dosenPembimbing,
                                  status=statusVerifikasi, userPengunggah=userPengunggah)

        karyaIlmiah.save()
        return karyaIlmiah

    # def update(self, instance, validated_data):
    #     instance.id = validated_data.get('id', instance.id)
    #     # object_karil = KaryaIlmiah.objects.get(pk=instance.id)
    #     instance.author = validated_data.get('author', instance.author)
    #     instance.npm = validated_data.get('npm', instance.npm)
    #     instance.judul = validated_data.get('judul', instance.judul)
    #     instance.tglDisetujui = validated_data.get(
    #         'tglDisetujui', instance.tglDisetujui)
    #     instance.semesterDisetujui = validated_data.get(
    #         'semesterDisetujui', instance.semesterDisetujui)
    #     instance.abstrak = validated_data.get('abstrak', instance.abstrak)
    #     instance.jenis = validated_data.get('jenis', instance.jenis)
    #     instance.filePDF = validated_data.get('filePDF', instance.filePDF)
    #     instance.dosenPembimbing = validated_data.get(
    #         'dosenPembimbing', instance.dosenPembimbing)
    #     instance.userPengunggah = validated_data.get(
    #         'userPengunggah', instance.userPengunggah)
    #     instance.kataKunci = validated_data.get(
    #         'kataKunci', instance.kataKunci)
    #     instance.statusVerifikasi = validated_data.get(
    #         'statusVerifikasi', instance.statusVerifikasi)
    #     instance.karyaIlmiah = KaryaIlmiah(id=instance.id, author=instance.author, npm=instance.npm, judul=instance.judul, tglDisetujui=instance.tglDisetujui, semesterDisetujui=instance.semesterDisetujui,
    #                                        abstrak=instance.abstrak, kataKunci=instance.kataKunci, jenis=instance.jenis, filePDF=instance.filePDF, dosenPembimbing=instance.dosenPembimbing,
    #                                        status=instance.statusVerifikasi, userPengunggah=instance.userPengunggah)

    # instance.save()
    # return instance


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
                  "dosenPembimbing",
                  "userPengunggah"]

    dosenPembimbing = DosenPembimbingField(
        queryset=Profile.objects.filter(role='verifikator'))
    semesterDisetujui = SemesterDisetujuiField(queryset=Semester.objects.all())

    def create(self, validated_data):
        author = validated_data['author']
        npm = validated_data['npm']
        judul = validated_data['judul']
        tglDisetujui = validated_data['tglDisetujui']
        semesterDisetujui = validated_data['semesterDisetujui']
        abstrak = validated_data['abstrak']
        jenis = validated_data['jenis']
        dosenPembimbing = validated_data['dosenPembimbing']
        userPengunggah = validated_data['userPengunggah']
        kataKunci = validated_data['kataKunci']
        statusVerifikasi = validated_data['statusVerifikasi']
        karyaIlmiah = KaryaIlmiah(author=author, npm=npm, judul=judul, tglDisetujui=tglDisetujui, semesterDisetujui=semesterDisetujui,
                                  abstrak=abstrak, kataKunci=kataKunci, jenis=jenis, dosenPembimbing=dosenPembimbing,
                                  status=statusVerifikasi, userPengunggah=userPengunggah)

        karyaIlmiah.save()
        return karyaIlmiah


class VerificatorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile

    def to_representation(self, instance):
        representation = dict()
        representation["id"] = instance.id
        representation["full_name"] = instance.full_name
        representation["user"] = instance.user.id
        representation["org_code"] = instance.org_code
        representation["role"] = instance.role
        representation["faculty"] = instance.faculty
        representation["study_program"] = instance.study_program
        representation["educational_program"] = instance.educational_program

        return representation


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ['id', 'semester']


class KarilSeriliazer(serializers.ModelSerializer):
    class Meta:
        model = KaryaIlmiah
        fields = ['id', 'judul', 'status', 'jenis',
                  'kataKunci', 'tglDisetujui', 'dosenPembimbing', 'author', 'fileURI']
