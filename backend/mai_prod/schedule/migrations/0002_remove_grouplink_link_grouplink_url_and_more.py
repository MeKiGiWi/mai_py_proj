# Generated by Django 5.1.6 on 2025-03-19 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='grouplink',
            name='link',
        ),
        migrations.AddField(
            model_name='grouplink',
            name='url',
            field=models.URLField(max_length=500, null=True, verbose_name='url'),
        ),
        migrations.AlterField(
            model_name='grouplink',
            name='title',
            field=models.CharField(max_length=30, verbose_name='name'),
        ),
    ]
