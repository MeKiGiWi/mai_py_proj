# Generated by Django 5.1.6 on 2025-03-20 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0006_alter_schedule_teacher'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grouplink',
            name='group_name',
            field=models.CharField(max_length=100, verbose_name='name'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='lesson_name',
            field=models.CharField(max_length=300, verbose_name='lesson_name'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='lesson_type',
            field=models.CharField(max_length=100, verbose_name='lesson_type'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='place',
            field=models.CharField(max_length=300, null=True, verbose_name='place'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='teacher',
            field=models.CharField(max_length=300, null=True, verbose_name='teacher'),
        ),
    ]
