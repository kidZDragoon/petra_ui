# Generated by Django 4.0.3 on 2022-05-25 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('propensi', '0013_karyailmiah_userpenandabuku'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='npm',
            field=models.CharField(blank=True, max_length=30, verbose_name='Nomor Pokok Mahasiswa'),
        ),
    ]