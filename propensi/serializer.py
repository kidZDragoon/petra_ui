from rest_framework import serializers
from .models_auth import User, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user', 'org_code', 'role', 'npm', 'faculty', 'study_program', 'educational_program')