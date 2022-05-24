# Generated by Django 3.2.12 on 2022-03-22 18:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='KaryaIlmiah',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=500)),
                ('npm', models.CharField(max_length=15)),
                ('judul', models.CharField(max_length=500)),
                ('status', models.CharField(max_length=500)),
                ('jenis', models.CharField(max_length=500)),
                ('abstrak', models.CharField(max_length=5000)),
                ('tglDisetujui', models.DateField(null=True)),
                ('semesterDisetujui', models.CharField(max_length=500)),
                ('tglVerifikasi', models.DateField(null=True)),
                ('filePDF', models.FileField(null=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('org_code', models.CharField(blank=True,
                 max_length=11, verbose_name='kode organisasi')),
                ('role', models.CharField(blank=True,
                 max_length=128, verbose_name='peran pengguna')),
                ('npm', models.CharField(blank=True, max_length=10,
                 verbose_name='Nomor Pokok Mahasiswa')),
                ('faculty', models.CharField(blank=True,
                 max_length=128, verbose_name='fakultas')),
                ('study_program', models.CharField(blank=True,
                 max_length=128, verbose_name='program studi')),
                ('educational_program', models.CharField(blank=True,
                 max_length=128, verbose_name='program pendidikan')),
                ('user', models.OneToOneField(
                    on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'profil',
                'verbose_name_plural': 'profil',
            },
        ),
        migrations.CreateModel(
            name='Pengumuman',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('judul', models.CharField(max_length=500)),
                ('tglDibuat', models.DateField()),
                ('tglDisunting', models.DateField()),
                ('isiPengumuman', models.CharField(max_length=5000)),
                ('stafPembuat', models.ForeignKey(
                    on_delete=django.db.models.deletion.DO_NOTHING, to='propensi.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Kategori',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('nama', models.CharField(max_length=50)),
                ('listKaryaIlmiah', models.ManyToManyField(
                    to='propensi.KaryaIlmiah')),
            ],
        ),
        migrations.AddField(
            model_name='karyailmiah',
            name='daftarPengunduh',
            field=models.ManyToManyField(to='propensi.Profile'),
        ),
        migrations.AddField(
            model_name='karyailmiah',
            name='dosenPembimbing',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING,
                                    related_name='dosen_pembimbing', to='propensi.profile'),
        ),
        migrations.AddField(
            model_name='karyailmiah',
            name='userPengunggah',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING,
                                    related_name='user_penunggah', to='propensi.profile'),
        ),
        migrations.AddField(
            model_name='karyailmiah',
            name='verifikator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING,
                                    related_name='verifikator', to='propensi.profile'),
        ),
    ]