# Generated by Django 5.1.6 on 2025-03-19 22:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0005_alter_schedule_lesson_name_alter_schedule_teacher'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='teacher',
            field=models.CharField(max_length=100, null=True, verbose_name='teacher'),
        ),
    ]
