# Generated by Django 4.0.3 on 2022-03-24 15:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('propensi', '0002_rename_katakunci_karyailmiah_keyword'),
    ]

    operations = [
        migrations.RenameField(
            model_name='karyailmiah',
            old_name='keyword',
            new_name='kataKunci',
        ),
    ]
