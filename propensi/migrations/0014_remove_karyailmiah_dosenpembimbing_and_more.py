# Generated by Django 4.0.3 on 2022-05-25 14:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('propensi', '0013_karyailmiah_userpenandabuku'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='karyailmiah',
            name='dosenPembimbing',
        ),
        migrations.RemoveField(
            model_name='karyailmiah',
            name='verifikator',
        ),
    ]
