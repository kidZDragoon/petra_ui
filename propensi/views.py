from cgitb import lookup
from functools import partial
from importlib.resources import path
from multiprocessing import Event
from django.forms import DateField
from django.db.models import Count
from django.shortcuts import render, get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
# from django_filters import DateFilter
from django_filters import BaseInFilter, CharFilter, NumberFilter
import pkg_resources
from django_propensi.settings import BASE_DIR, MEDIA_ROOT
from django.core.files import File
from django.http import HttpResponse, Http404
from propensi import serializer
from propensi.models import Profile, User, save_user_attributes, KaryaIlmiah, Semester, DaftarUnduhan, Visitors, Pengumuman
from propensi.serializer import UserSerializer, ProfileSerializer, KaryaIlmiahSeriliazer, \
    KaryaIlmiahUploadSerializer, VerificatorSerializer, \
    SemesterSerializer, KarilSeriliazer, KaryaIlmiahStatusSerializer, KaryaIlmiahEditUploadSerializer, \
    KaryaIlmiahEditSerializer, DaftarUnduhanSerializer, PengumumanSeriliazer, VisitorsSerializer
from rest_framework import status, permissions, filters, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import RetrieveAPIView, ListCreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.decorators import api_view
from rest_framework_jwt.settings import api_settings
import urllib3
import xmltodict
import jwt
import urllib
import requests
import datetime

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER
JWT_DECODE_HANDLER = api_settings.JWT_DECODE_HANDLER


def login(request):
    originURL = "http://localhost:8000/"
    # originURL = "https://propensi-a03-staging.herokuapp.com/"
    # originURL = "https://propensi-a03.herokuapp.com/"

    serverURL = "http://localhost:8000/login/"
    # serverURL = "https://propensi-a03-staging.herokuapp.com/login/"
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

    # xml = f'''
    # <cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>
    # <cas:authenticationSuccess>
    # <cas:user>dini.widinarsih</cas:user>
    # <cas:attributes>
    # <cas:user>dini.widinarsih</cas:user>
    # <cas:ldap_cn>Dini Widinarsih</cas:ldap_cn>
    # <cas:peran_user>staff</cas:peran_user>
    # <cas:nip>196806221994032001</cas:nip>
    # <cas:nama>Dini Widinarsih</cas:nama>
    # </cas:attributes>
    # </cas:authenticationSuccess>
    # </cas:serviceResponse>
    # '''
    # data = xmltodict.parse(xml)
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
        if data.get('cas:nip'):  # dosen
            profileData = {'email': f'{username}@ui.ac.id',
                           'kd_org': '03.06.09.01',  # S3 ilmu kesos, template.
                           'nama': data.get('cas:nama'),
                           'npm': data.get('cas:nip'),  # nip
                           'peran_user': 'dosen',
                           }
            user = User.objects.create(**userData)
            profile = Profile.objects.get(user=user)
            save_user_attributes(user, profileData)

        else:  # mahasiswa
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
        checkDU = DaftarUnduhan.objects.filter(
            idProfile=request.data['idProfile'], karyaIlmiah_id=request.data['karyaIlmiah'])
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


class GetDaftarUnduhanView(APIView):
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


class AddBookmarkView(APIView):
    """
    Nambahin karya ilmiah ke bookmark. Data profile disimpan di model KaryaIlmiah
    pada kolom "userPenandaBuku".
    Pake PUT dengan pk utk id karil, dan idProfile dalam request datanya
    """

    def put(self, request, pk):
        print(request.data)
        profile = Profile.objects.get(id=request.data['idProfile'])
        print(profile)
        karil = KaryaIlmiah.objects.get(pk=pk)
        print(karil.userPenandaBuku)
        karil.userPenandaBuku.add(profile)
        print(karil.userPenandaBuku)
        karil.save()
        return Response("Karil berhasil ditambahkan pada bookmark", status=status.HTTP_200_OK)


class BookmarkListView(APIView):
    """
    Mendapatkan list Bookmark. Butuh ID profilenya, dikirim melalui POST
    """

    def post(self, request):
        karil = Profile.objects.get(
            id=request.data['idProfile']).karyailmiah_set.all()
        print(karil)
        karil_serializer = KaryaIlmiahSeriliazer(karil, many=True)
        print(karil_serializer.data)
        return Response(karil_serializer.data, status=status.HTTP_200_OK)


class DeleteBookmarkView(APIView):
    def put(self, request, pk):
        print(request.data)
        profile = Profile.objects.get(id=request.data['idProfile'])
        print(profile)
        karil = KaryaIlmiah.objects.get(pk=pk)
        print(karil.userPenandaBuku)
        karil.userPenandaBuku.remove(profile)
        print(karil.userPenandaBuku)
        karil.save()
        return Response("Karil berhasil dihapus dari bookmark", status=status.HTTP_200_OK)


class CheckBookmarkStatusView(APIView):
    def put(self, request, pk):
        print(request.data)
        profile = Profile.objects.get(id=request.data['idProfile'])
        print(profile)
        check_bookmark = profile.karyailmiah_set.filter(id=pk)
        if check_bookmark:
            return Response({"bookmarked": "true"}, status=status.HTTP_200_OK)
        return Response({"bookmarked": "false"}, status=status.HTTP_200_OK)


class KaryaIlmiahView(RetrieveAPIView):  # auto pk
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
        karya_ilmiah_serializer = KaryaIlmiahUploadSerializer(
            data=request.data)
        print(request.data)
        if karya_ilmiah_serializer.is_valid():
            karya_ilmiah_serializer.save()
            return Response(karya_ilmiah_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(karya_ilmiah_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update with upload karil


class KaryaIlmiahUpdateUploadView(APIView):
    def put(self, request, pk, *args, **kwargs):
        print("file beda")
        karil = KaryaIlmiah.objects.get(pk=pk)
        karya_ilmiah_serializer = KaryaIlmiahEditUploadSerializer(
            karil, data=request.data, partial=True)
        if karya_ilmiah_serializer.is_valid():
            karya_ilmiah_serializer.save()
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        return Response(karya_ilmiah_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update without upload karil


class KaryaIlmiahUpdateView(UpdateAPIView):
    def put(self, request, pk, *args, **kwargs):
        print("file sama")
        karil = KaryaIlmiah.objects.get(pk=pk)
        karya_ilmiah_serializer = KaryaIlmiahEditSerializer(
            karil, data=request.data, partial=True)
        if karya_ilmiah_serializer.is_valid():
            karya_ilmiah_serializer.save()
            return Response({"status": "success"}, status=status.HTTP_200_OK)
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
    search_fields = ['judul', 'author', 'kataKunci', 'dosenPembimbing']


class HasilKaril(RetrieveAPIView):
    queryset = KaryaIlmiah.objects.all()
    serializer_class = KaryaIlmiahSeriliazer


class DeleteKarilView(APIView):
    def get(self, request, pk):
        data = get_object_or_404(KaryaIlmiah, pk=pk)
        serializer = KaryaIlmiahSeriliazer(data)
        return Response(serializer.data)

    def delete(self, request, pk):
        data = get_object_or_404(KaryaIlmiah, pk=pk)
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DaftarVerifikasiView(ListAPIView):
    queryset = KaryaIlmiah.objects.all()
    serializer_class = KarilSeriliazer
    filter_backends = (DjangoFilterBackend, )
    filterset_fields = ('status', 'status')


class KaryaIlmiahStatusView(UpdateAPIView):
    def put(self, request, pk, *args, **kwargs):
        print("file sama")
        karil = KaryaIlmiah.objects.get(pk=pk)
        karya_ilmiah_serializer = KaryaIlmiahStatusSerializer(
            karil, data=request.data, partial=True)
        if karya_ilmiah_serializer.is_valid():
            karya_ilmiah_serializer.save()
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        return Response(karya_ilmiah_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    filterset_fields = ('status',)

# Metrics View


class MetriksUnggahanView(APIView):
    """
    * Berdasarkan status verifikasi
    * Berdasarkan jenis
    * Berdasarkan semester yudisium
    """

    def get(self, request, format=None):

        # Data berdasarkan status verifikasi
        status_labels = [
            'Verifikasi diterima',
            'Verifikasi ditolak',
            'Belum diverifikasi',
        ]

        status_chart_label = "Karya Ilmiah Berdasarkan Status Verifikasi"

        status_data = [
            KaryaIlmiah.objects.filter(status="1").count(),
            KaryaIlmiah.objects.filter(status="2").count(),
            KaryaIlmiah.objects.filter(status="0").count()
        ]

        data_status = {
            "labels": status_labels,
            "chartLabel": status_chart_label,
            "chartData": status_data,
        }

        # Data berdasarkan jenis
        jenis_labels = [
            'Skripsi',
            'Disertasi',
            'Tesis',
            'Nonskripsi'
        ]

        jenis_chart_label = "Karya Ilmiah Berdasarkan Jenis"

        jenis_data = [
            KaryaIlmiah.objects.filter(jenis="Skripsi").count(),
            KaryaIlmiah.objects.filter(jenis="Disertasi").count(),
            KaryaIlmiah.objects.filter(jenis="Tesis").count(),
            KaryaIlmiah.objects.filter(jenis="Nonskripsi").count(),
        ]

        data_jenis = {
            "labels": jenis_labels,
            "chartLabel": jenis_chart_label,
            "chartData": jenis_data,
        }

        # Data berdasarkan semester
        semester_labels = []
        semester_data = []

        semesters = Semester.objects.all()

        for i in semesters:
            semester_labels.append(i.semester)
            semester_data.append(KaryaIlmiah.objects.filter(
                semesterDisetujui=i).count())

        semester_chart_label = "Karya Ilmiah Berdasarkan Semester Yudisium"

        data_semester = {
            "labels": semester_labels,
            "chartLabel": semester_chart_label,
            "chartData": semester_data,
        }

        data = {'dataStatus': data_status,
                "dataJenis": data_jenis, "dataSemester": data_semester}

        return Response(data, status=status.HTTP_200_OK)


class MetriksPengunjung(APIView):
    def post(self, request, *args, **kwargs):
        print("save visitor")
        visitors_serializer = VisitorsSerializer(data=request.data)

        if visitors_serializer.is_valid():
            tanggal = datetime.date.today()
            ip = visitors_serializer.data['ip']

            if not Visitors.objects.filter(ip=ip, tanggalKunjungan=tanggal).exists():
                visitor = Visitors(ip=ip, tanggalKunjungan=tanggal)
                visitor.save()

            return Response(visitors_serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(visitors_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, tahun, format=None):
        labels = [
            'Januari',
            'Febuari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        ]

        pengunjung_chart_label = "Jumlah Pengunjung"
        pengunjung_data = []
        months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

        for i in months:
            pengunjung_data.append(Visitors.objects.filter(
                tanggalKunjungan__year=tahun, tanggalKunjungan__month=i).count())

        data = {
            "labels": labels,
            "chartLabel": pengunjung_chart_label,
            "chartData": pengunjung_data,
        }

        return Response(data, status=status.HTTP_200_OK)


class TahunMetriksPengunjung(APIView):
    def get(self, request):
        tahun = []

        for i in Visitors.objects.all():

            if i.tanggalKunjungan.year not in tahun:
                tahun.append(i.tanggalKunjungan.year)

        return Response({"status": "success", "data": tahun}, status=status.HTTP_200_OK)


class MetriksUnduhanView(APIView):
    def get(self, request, tahun, format=None):

        period_labels = [
            'Januari',
            'Febuari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        ]

        unduhan_chart_label = "Unduhan Karya Ilmiah"

        unduhan_data = []
        months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

        for i in months:
            period = "{}/".format(i)
            unduhan_data.append(DaftarUnduhan.objects.filter(
                tglUnduh__startswith=period, tglUnduh__contains=tahun).count())

        data = {
            "labels": period_labels,
            "chartLabel": unduhan_chart_label,
            "chartData": unduhan_data,
        }

        return Response(data, status=status.HTTP_200_OK)


class MetriksTop3Unduhan(APIView):
    def get(self, request, format=None):
        top3_labels = []
        top3_data = []

        top3 = KaryaIlmiah.objects.annotate(count=Count(
            'daftarunduhan')).order_by("-count").values("judul", "count")

        for i in range(3):
            top3_labels.append(top3[i]['judul'])
            top3_data.append(top3[i]['count'])

        labels_adjusted = []
        tmp = ""
        lst = []
        count = 0

        for i in top3_labels:
            word = i.split(' ')
            tmp = ""
            lst = []
            count = 0

            panjang = len(word)
            div3 = panjang // 3
            mod = panjang % 3

            for j in range(0, div3*3, 3):
                res = ''.join(
                    [(word[j] + " "), (word[j+1] + " "), (word[j+2] + " ")])
                lst.append(res)

            if mod != 0:
                res = ""
                for j in range(div3*3, panjang, 1):
                    res += word[j] + " "

                lst.append(res)

            labels_adjusted.append(lst)

        top3_chart_label = "Karya Ilmiah Unduhan Top 3"

        data_top3 = {
            "labels": labels_adjusted,
            "chartLabel": top3_chart_label,
            "chartData": top3_data,
        }

        data = {'dataTop3': data_top3}

        return Response(data, status=status.HTTP_200_OK)


class TahunMetriksUnduhan(APIView):
    def get(self, request):
        tahun = []

        for i in DaftarUnduhan.objects.all():

            if i.tglUnduh[5:9] not in tahun:
                tahun.append(i.tglUnduh[5:9])

        return Response({"status": "success", "data": tahun}, status=status.HTTP_200_OK)


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
        pengumumanSerializer = PengumumanSeriliazer(
            pengumuman, data=request.data)
        if pengumumanSerializer.is_valid():
            pengumumanSerializer.save()
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        return Response({"status": "failed"}, status=status.HTTP_400_BAD_REQUEST)


class KaryaIlmiahSaya(APIView):

    def get(self, request, userId, *args, **kwargs):
        data = KaryaIlmiah.objects.filter(userPengunggah=userId)
        serializer = KaryaIlmiahSeriliazer(data, many=True)

        return Response({"data": serializer.data}, status=status.HTTP_200_OK)
