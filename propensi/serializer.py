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
        fields = ["author", "npm", "judul", "tglDisetujui", "semesterDisetujui", "abstrak",
                "jenis", "dosenPembimbing", "filePDF", "userPengunggah"]

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
        semesterDisetujui = validated_data['semesterDisetujui']
        userPengunggah = validated_data['userPengunggah']
        statusVerifikasi = 0
        karyaIlmiah = KaryaIlmiah(author=author, npm=npm, judul=judul, tglDisetujui=tglDisetujui, semesterDisetujui=semesterDisetujui,
                        abstrak=abstrak, jenis=jenis, filePDF=filePDF, dosenPembimbing=dosenPembimbing, status=statusVerifikasi, userPengunggah = userPengunggah)
        karyaIlmiah.save()
        return karyaIlmiah


    class Meta:
        model = KaryaIlmiah
        fields = ["author", "npm", "judul", "tglDisetujui", "semesterDisetujui", "abstrak",
                "jenis", "dosenPembimbing", "filePDF", "userPengunggah"]


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