from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from .models import User, Profile
from .models import KaryaIlmiah

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
