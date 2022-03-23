from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from rest_framework.serializers import ReadOnlyField, SerializerMethodField
from .models_auth import User, Profile
from .models import KaryaIlmiah, Semester
from django.db.models import Value as V
from django.db.models.functions import Concat

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user', 'org_code', 'role', 'npm', 'faculty', 'study_program', 'educational_program')

class KaryaIlmiahSeriliazer(serializers.ModelSerializer):
    class Meta:
        model = KaryaIlmiah
        fields = "__all__"
        depth = 1

    fields = ["author", "npm", "judul", "tglDisetujui", "semesterDisetujui", "abstrak", 
            "jenis", "dosenPembimbing", "filePDF", "userPengunggah"]

    def to_representation(self, instance):
        representation = dict()
        representation["author"] = instance.author
        representation["judul"] = instance.judul
        representation["abstrak"] = instance.abstrak
        representation["jenis"] = instance.jenis
        representation["filePDF"] = instance.filePDF.path
        representation["tglVerifikasi"] = instance.tglVerifikasi
        representation["tglDisetujui"] = instance.tglDisetujui

        return representation

class DosenPembimbingField(serializers.PrimaryKeyRelatedField):
    def display_value(self, instance):
        return instance.user.first_name + " " + instance.user.last_name

class SemesterDisetujuiField(serializers.PrimaryKeyRelatedField):
    def display_value(self, instance):
        return instance.semester

class KaryaIlmiahUploadSerializer(serializers.ModelSerializer):
    dosenPembimbing = DosenPembimbingField(queryset=Profile.objects.filter(role='verifikator'))
    semesterDisetujui = SemesterDisetujuiField(queryset=Semester.objects.all())
    # jenis = serializers.ChoiceField(choices = JENIS_CHOICES)
    # userPengunggah = serializers.SerializerMethodField('_user')

    # # Use this method for the custom field
    # def _user(self, obj):
    #     print("get current authenticated user")
    #     request = self.context.get('request', None)
    #     if request:
    #         return request.user

    def create(self, validated_data):
        print("masuk serializer create")
        author = validated_data['author']
        npm = validated_data['npm']
        judul = validated_data['judul']
        tglDisetujui = validated_data['tglDisetujui']
        semesterDisetujui = validated_data['semesterDisetujui']
        abstrak = validated_data['abstrak']
        jenis = validated_data['jenis']
        filePDF = validated_data['filePDF']

        # queryset = Profile.objects.annotate(full_name=Concat('user__first_name', Value(' '), 'user__last_name'))
        dosenPembimbing = validated_data['dosenPembimbing']
        semesterDisetujui = validated_data['semesterDisetujui']
        # userPengunggah = self.context['request'].user

        karyaIlmiah = KaryaIlmiah(author=author, npm=npm, judul=judul, tglDisetujui=tglDisetujui, semesterDisetujui=semesterDisetujui,
                        abstrak=abstrak, jenis=jenis, filePDF=filePDF, dosenPembimbing=dosenPembimbing)
        
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
