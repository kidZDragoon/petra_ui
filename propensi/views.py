from importlib.resources import path
from django.forms import DateField
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
# from django_filters import DateFilter
from django_filters import BaseInFilter, CharFilter, NumberFilter
from django_propensi.settings import BASE_DIR, MEDIA_ROOT
from django.core.files import File
from django.http import HttpResponse
from propensi.models import Profile, User, save_user_attributes, KaryaIlmiah, Semester
from propensi.serializer import UserSerializer, ProfileSerializer, KaryaIlmiahSeriliazer, \
    KaryaIlmiahUploadSerializer, VerificatorSerializer, \
    SemesterSerializer, KarilSeriliazer
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

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER
JWT_DECODE_HANDLER = api_settings.JWT_DECODE_HANDLER


def login(request):
    # originURL = "http://localhost:8000/"
    originURL = "https://propensi-a03-staging.herokuapp.com/"
    # originURL = "https://propensi-a03.herokuapp.com/"

    # serverURL = "http://localhost:8000/login/"
    serverURL = "https://propensi-a03-staging.herokuapp.com/login/"
    # serverURL = "https://propensi-a03.herokuapp.com/login/"

    http = urllib3.PoolManager(cert_reqs='CERT_NONE')
    link = f"https://sso.ui.ac.id/cas2/serviceValidate?ticket={request.GET.get('ticket', '')}&service={serverURL}"
    response = http.request('GET', link)
    rawdata = response.data.decode('utf-8')

    data = xmltodict.parse(rawdata)
    data = data.get('cas:serviceResponse', {}).get(
        'cas:authenticationSuccess', {})

    user = None
    profile = None
    try:
        user = User.objects.get(email=f'{data.get("cas:user", "")}@ui.ac.id')
        profile = Profile.objects.get(user=user)
    except:
        if data.get("cas:user"):
            username = data.get("cas:user")

            data = data.get("cas:attributes")
            userData = {'username': username, 'email': f'{username}@ui.ac.id'}
            profileData = {'email': f'{username}@ui.ac.id', 'kd_org': data.get('cas:kd_org'),
                           'nama': data.get('cas:nama'), 'npm': data.get('cas:npm'),
                           'peran_user': data.get('cas:peran_user'), }
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


class KaryaIlmiahView(RetrieveAPIView): #auto pk
    queryset = KaryaIlmiah.objects.all()
    serializer_class = KaryaIlmiahSeriliazer


class CharInFilter(BaseInFilter, CharFilter):
    pass


class KarilFilterYearAndType(FilterSet):
    tahun = NumberFilter(field_name='tglVerifikasi__year', lookup_expr='exact')
    jenis = CharInFilter(field_name='jenis', lookup_expr='in')
    class Meta:
        model = KaryaIlmiah
        fields = (
            'tahun',
            'jenis')


class daftarVerifikasiView(RetrieveAPIView):
    queryset = KaryaIlmiah.objects.all()
    serializer_class = KaryaIlmiahSeriliazer


class KaryaIlmiahUploadView(APIView):
    parser = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        karya_ilmiah_serializer = KaryaIlmiahUploadSerializer(data=request.data)

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
    path_to_file = "https://storage.googleapis.com/petra-ui/files" + path
    response = HttpResponse(path_to_file)
    response['Content-Disposition'] = 'attachment'
    return response


class CariKaril(ListAPIView):
    queryset = KaryaIlmiah.objects.all()
    serializer_class = KarilSeriliazer
    filterset_class = KarilFilterYearAndType
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    search_fields = ['judul', 'authors']
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
