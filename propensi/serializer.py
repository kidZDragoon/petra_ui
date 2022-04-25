from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from rest_framework.serializers import ReadOnlyField, SerializerMethodField
from django.db.models import Value as V
from django.db.models.functions import Concat
from django.utils.timezone import datetime

from .models import User, Profile, KaryaIlmiah, Semester, Visitors


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user', 'org_code', 'role', 'npm', 'faculty', 'study_program', 'educational_program')

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

    dosenPembimbing = DosenPembimbingField(queryset=Profile.objects.filter(role='verifikator'))
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
        statusVerifikasi = 0
        karyaIlmiah = KaryaIlmiah(author=author, npm=npm, judul=judul, tglDisetujui=tglDisetujui, semesterDisetujui=semesterDisetujui,
                        abstrak=abstrak, kataKunci=kataKunci, jenis=jenis, filePDF=filePDF, dosenPembimbing=dosenPembimbing, 
                        status=statusVerifikasi, userPengunggah = userPengunggah)
        
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
        fields = "__all__"

class VisitorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitors
        fields = ['ip']

    # def create(self, validated_data):
    #     ip = validated_data['ip']
    #     tanggal = datetime.date.today()

    #     if Visitors.objects.filter(ip=ip, tanggalKunjungan=today).exists():
    #         print("visit already saved")
    #         return Visitors.objects.get(ip=ip, tanggalKunjungan=today)

    #     else: 
    #         print("visit not yet saved")
    #         return Visitors(ip=ip, tanggalKunjungan=today)
