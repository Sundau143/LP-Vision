# Generated by Django 4.1.7 on 2023-03-16 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_license_plate', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='licenseplate',
            name='edited',
            field=models.BooleanField(default=False),
        ),
    ]
