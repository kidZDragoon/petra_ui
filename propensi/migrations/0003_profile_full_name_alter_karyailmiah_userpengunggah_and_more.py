# Generated by Django 4.0.3 on 2022-03-22 09:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('propensi', '0002_semester_alter_karyailmiah_semesterdisetujui'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='full_name',
            field=models.CharField(blank=True, max_length=128, verbose_name='nama'),
        ),
        migrations.AlterField(
            model_name='karyailmiah',
            name='userPengunggah',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_pengunggah', to='propensi.profile'),
        ),
        migrations.AlterField(
            model_name='karyailmiah',
            name='verifikator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='verifikator', to='propensi.profile'),
        ),
    ]
