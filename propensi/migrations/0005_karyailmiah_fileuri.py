# Generated by Django 4.0.3 on 2022-03-22 12:02

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('propensi', '0004_alter_karyailmiah_filepdf'),
    ]

    operations = [
        migrations.AddField(
            model_name='karyailmiah',
            name='fileURI',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]
