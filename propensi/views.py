from django.shortcuts import render

from propensi.models import Profile, User, save_user_attributes
from propensi.serializer import UserSerializer, ProfileSerializer

from rest_framework_jwt.settings import api_settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

import urllib3
import xmltodict
import jwt

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER
JWT_DECODE_HANDLER = api_settings.JWT_DECODE_HANDLER

def login(request):
    originURL = "http://localhost:8000/"
    serverURL = "http://localhost:8000/login/"

    http = urllib3.PoolManager()

    link = f"https://sso.ui.ac.id/cas2/serviceValidate?ticket={request.GET.get('ticket', '')}&service={serverURL}"
    print('link')
    print(link)

    response = http.request('GET', link)
    print('response')
    print(response)

    rawdata = response.data.decode('utf-8')
    print('rawdata')
    print(rawdata)

    data = xmltodict.parse(rawdata)
    print('data setelah di parse')
    print(data)

    data = data.get('cas:serviceResponse', {}).get('cas:authenticationSuccess', {})
    print('data setelah diget service response yg authentication success')
    print(data)

    user = None
    profile = None
    try:
        user = User.objects.get(email=f'{data.get("cas:user", "")}@ui.ac.id')
        profile = Profile.objects.get(user=user)
    except User.DoesNotExist:
        if data.get("cas:user"):
            username = data.get("cas:user")

            data = data.get("cas:attributes")
            print('data setelah diget attributes')
            print(data)
            userData = {'username': username, 'email': f'{username}@ui.ac.id'}
            profileData = {'email': f'{username}@ui.ac.id', 'kd_org': data.get('cas:kd_org'),
                           'nama': data.get('cas:nama'), 'npm': data.get('cas:npm'),
                           'peran_user': data.get('cas:peran_user'), }
            user = User.objects.create(**userData)
            profile = Profile.objects.get(user=user)
            save_user_attributes(user, profileData)

    payload = JWT_PAYLOAD_HANDLER(user)
    print('payload')
    print(payload)

    jwtToken = JWT_ENCODE_HANDLER(payload)
    print('jwttoken')
    print(jwtToken)

    context = {'LoginResponse': f'{{"token":"{jwtToken}","nama":"{user.get_full_name()}","npm":"{profile.npm}" }}', 'OriginUrl': originURL}
    print('context')
    print(context)

    response = render(request, "ssoui/popup.html", context)
    response['Cross-Origin-Opener-Policy'] = 'unsafe-none'
    return response

class UserView(APIView):
    def post(self, request):
        print('request')
        print(request.data)
        token = request.data['token']
        print('token')
        print(token)

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            # payload = jwt.decode(token, 'SakamataChloeTerbaik', algorithm=['HS256'])
            payload = JWT_DECODE_HANDLER(token)
            print(payload)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['user_id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

class ProfileView(APIView):
    def post(self, request):
        print('request')
        print(request.data)
        token = request.data['token']
        print('token')
        print(token)

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            # payload = jwt.decode(token, 'SakamataChloeTerbaik', algorithm=['HS256'])
            payload = JWT_DECODE_HANDLER(token)
            print(payload)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['user_id']).first()
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)