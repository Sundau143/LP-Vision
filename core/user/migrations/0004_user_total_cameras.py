# Generated by Django 4.1.7 on 2023-05-11 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_user', '0003_rename_username_user_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='total_cameras',
            field=models.IntegerField(default=0),
        ),
    ]
