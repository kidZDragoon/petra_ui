# Generated by Django 4.0.3 on 2022-03-23 02:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('propensi', '0005_karyailmiah_fileuri'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='full_name',
        ),
    ]
