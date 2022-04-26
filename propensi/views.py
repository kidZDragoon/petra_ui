from importlib.resources import path
from multiprocessing import Event
from django.forms import DateField
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
# from django_filters import DateFilter
from django_filters import BaseInFilter, CharFilter, NumberFilter
from django_propensi.settings import BASE_DIR, MEDIA_ROOT
from django.core.files import File
from django.http import Http404, HttpResponse
from propensi.models import Pengumuman, Profile, User, save_user_attributes, KaryaIlmiah, Semester, DaftarUnduhan
from propensi.serializer import UserSerializer, ProfileSerializer, KaryaIlmiahSeriliazer, \
    KaryaIlmiahUploadSerializer, VerificatorSerializer, \
    SemesterSerializer, KarilSeriliazer, DaftarUnduhanSerializer, PengumumanSeriliazer
from rest_framework import status, permissions, filters, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import RetrieveAPIView, ListCreateAPIView, ListAPIView
from rest_framework.decorators import api_view
from rest_framework_jwt.settings import api_settings
import urllib3
import xmltodict
import jwt
import urllib
import requests
from django.shortcuts import get_object_or_404

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER
JWT_DECODE_HANDLER = api_settings.JWT_DECODE_HANDLER


def login(request):
    print('tesss')
    # originURL = "http://localhost:8000/"
    originURL = "https://propensi-a03-staging.herokuapp.com/"
    # originURL = "https://propensi-a03.herokuapp.com/"

    # serverURL = "http://localhost:8000/login/"
    serverURL = "https://propensi-a03-staging.herokuapp.com/login/"
    # serverURL = "https://propensi-a03.herokuapp.com/login/"

    http = urllib3.PoolManager(cert_reqs='CERT_NONE')
    # http = urllib3.PoolManager()
    link = f"https://sso.ui.ac.id/cas2/serviceValidate?ticket={request.GET.get('ticket', '')}&service={serverURL}"
    response = http.request('GET', link)
    print('response')
    print(response)

    rawdata = response.data.decode('utf-8')
    print('raw data')
    print(rawdata)

    data = xmltodict.parse(rawdata)
    print('data xmltodict')
    print(data)

    data = data.get('cas:serviceResponse', {}).get(
        'cas:authenticationSuccess', {})
    print('data serviceresponse')
    print(data)

    user = None
    profile = None
    try:
        user = User.objects.get(email=f'{data.get("cas:user", "")}@ui.ac.id')
        profile = Profile.objects.get(user=user)
    except:
        username = data.get("cas:user")

        data = data.get("cas:attributes")
        userData = {'username': username, 'email': f'{username}@ui.ac.id'}
        if data.get('cas:nip'): #dosen
            profileData = {'email': f'{username}@ui.ac.id',
                           'kd_org': '03.06.09.01', # S3 ilmu kesos, template.
                           'nama': data.get('cas:nama'),
                           'npm': data.get('cas:nip'), # nip
                           'peran_user': 'dosen',
                           }
            user = User.objects.create(**userData)
            profile = Profile.objects.get(user=user)
            save_user_attributes(user, profileData)

        else: #mahasiswa
            profileData = {'email': f'{username}@ui.ac.id',
                           'kd_org': data.get('cas:kd_org'),
                           'nama': data.get('cas:nama'),
                           'npm': data.get('cas:npm'),
                           'peran_user': 'mahasiswa',
                           }
        user = User.objects.create(**userData)
        profile = Profile.objects.get(user=user)
        save_user_attributes(user, profileData)

    payload = JWT_PAYLOAD_HANDLER(user)
    jwtToken = JWT_ENCODE_HANDLER(payload)

    context = {'LoginResponse': f'{{"token":"{jwtToken}","nama":"{user.get_full_name()}","npm":"{profile.npm}" }}',
               'OriginUrl': originURL}
    response = render(request, "ssoui/popup.html", context)
    response['Cross-Origin-Opener-Policy'] = 'unsafe-none'
    return response


class UserView(APIView):
    def post(self, request):
        token = request.data['token']

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = JWT_DECODE_HANDLER(token)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['user_id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def get(self, request):
        data = User.objects.all()
        serializer = UserSerializer(data, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)


class ProfileView(APIView):
    def post(self, request):
        token = request.data['token']

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = JWT_DECODE_HANDLER(token)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['user_id']).first()
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    
    def get(self, request):
        data = Profile.objects.all()
        serializer = ProfileSerializer(data, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, *args, **kwarg):
        profile = Profile.objects.get(pk=pk)
        profileSerializer = ProfileSerializer(profile, data=request.data)
        if profileSerializer.is_valid():
            profileSerializer.save()
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        return Response({"status": "failed"}, status=status.HTTP_400_BAD_REQUEST)


class CreateDaftarUnduhanView(APIView):
    """
    Yang diminta pada tabel karyaIlmiah adalah IDnya. Jadi, yang di pass dari frontend hanyalah id dari karyaIlmiahnya saja
    """
    def post(self, request, *args, **kwargs):
        daftarUnduhanSerializer = DaftarUnduhanSerializer(data=request.data)
        print(request.data)
        print(request.data['karyaIlmiah'])
        checkDU = DaftarUnduhan.objects.filter(karyaIlmiah_id=request.data['karyaIlmiah'])
        print(checkDU)
        if checkDU:
            print('DU sudah ada dalam database')
            return Response('DU sudah ada dalam database', status=status.HTTP_200_OK)
        elif daftarUnduhanSerializer.is_valid():
            print('DU valid')
            daftarUnduhanSerializer.save()
            print(daftarUnduhanSerializer.data)
            return Response(daftarUnduhanSerializer.data, status=status.HTTP_201_CREATED)
        else:
            print('DU not valid')
            return Response(daftarUnduhanSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetDaftarUnduhan(APIView):
    """
    GET Daftar Unduhan. Meminta karyaIlmiah_id, Return daftarunduhan yang berkaitan dengan karyaIlmiah tersebut
    """
    def get(self, request, pk):
        print(pk)
        data = DaftarUnduhan.objects.filter(karyaIlmiah_id=pk)
        print(data)
        serializer = DaftarUnduhanSerializer(data, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)


class KaryaIlmiahView(RetrieveAPIView): #auto pk
    queryset = KaryaIlmiah.objects.all()
    serializer_class = KaryaIlmiahSeriliazer


class CharInFilter(BaseInFilter, CharFilter):
    pass


class KarilFilterYearAndType(FilterSet):
    tahun = NumberFilter(field_name='tglDisetujui__year', lookup_expr='exact')
    jenis = CharInFilter(field_name='jenis', lookup_expr='in')
    class Meta:
        model = KaryaIlmiah
        fields = (
            'tahun',
            'jenis')
            

class KaryaIlmiahUploadView(APIView):
    parser = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        karya_ilmiah_serializer = KaryaIlmiahUploadSerializer(data=request.data)
        print(request.data)
        if karya_ilmiah_serializer.is_valid():
            karya_ilmiah_serializer.save()
            return Response(karya_ilmiah_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(karya_ilmiah_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerificatorView(APIView):
    def get(self, request):
        data = Profile.objects.filter(role="verifikator")
        serializer = VerificatorSerializer(data, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)


class SemesterView(APIView):
    def get(self, request):
        data = Semester.objects.all()
        serializer = SemesterSerializer(data, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def DownloadPDF(self, path):
    file_url = "https://storage.googleapis.com/petra-ui/files/" + path
    file = requests.get(file_url, stream=True)
    response = HttpResponse(file)
    response['Content-Disposition'] = 'attachment'
    return response


class CariKaril(ListAPIView):
    queryset = KaryaIlmiah.objects.all()
    serializer_class = KarilSeriliazer
    filterset_class = KarilFilterYearAndType
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    search_fields = ['judul', 'author']
    # filter_fields = [KarilFilterYear, {'jenis:'}]

    # def get_queryset(self):
    #     judul = self.request.GET.get('judul')
    #     queryset = KaryaIlmiah.objects.filter(judul__icontains=judul)
    #     return queryset

# class CariKaril(viewsets.ModelViewSet):
#     class Filter(FilterSet):
#         class Meta:
#             model = KaryaIlmiah

#     filter_class = Filter
#     filter_backends = (filters.SearchFilter, DjangoFilterBackend)
#     search_fields = ['judul', 'authors']
#     queryset = KaryaIlmiah.objects.all()
#     serializer_class = KarilSeriliazer


class HasilKaril(RetrieveAPIView):
    queryset = KaryaIlmiah.objects.all()
    serializer_class = KaryaIlmiahSeriliazer


class DaftarVerifikasiView(ListAPIView):
    queryset = KaryaIlmiah.objects.all()
    serializer_class = KarilSeriliazer
    filter_backends = (DjangoFilterBackend, )
    filterset_fields = ('status',)

class PengumumanView(APIView):
    parser = [MultiPartParser, FormParser]
    print("masuk")
    def post(self, request, *args, **kwargs):
        print("masuk1")
        pengumuman_serializer = PengumumanSeriliazer(data=request.data)
        print("masuk2")
        print(request.data)
        print(pengumuman_serializer.is_valid())
        if pengumuman_serializer.is_valid():
            pengumuman_serializer.save()
            return Response(pengumuman_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(pengumuman_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        print("masuk ko")
        data = Pengumuman.objects.all()
        # pengumuman = Pengumuman.objects.get(pk=2)
        # print(pengumuman)
        serializer = PengumumanSeriliazer(data, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
    


class PengumumanUpdateDeleteView(APIView):
    print("masukfsdfasdf")

    def get_object(self, pk):
        try:
            print("masuk")
            return Pengumuman.objects.get(pk=pk)
        except Pengumuman.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        queryset = Pengumuman.objects.get(pk=pk)
        serializer = PengumumanSeriliazer(queryset)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        pengumuman = Pengumuman.objects.get(pk=pk)
        pengumuman.delete()
        return Response({"status": "success"}, status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, pk, *args, **kwarg):
        pengumuman = Pengumuman.objects.get(pk=pk)
        pengumumanSerializer = PengumumanSeriliazer(pengumuman, data=request.data)
        if pengumumanSerializer.is_valid():
            pengumumanSerializer.save()
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        return Response({"status": "failed"}, status=status.HTTP_400_BAD_REQUEST)
