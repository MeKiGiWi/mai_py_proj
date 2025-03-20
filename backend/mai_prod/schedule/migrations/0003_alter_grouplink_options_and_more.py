# Generated by Django 5.1.6 on 2025-03-19 22:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0002_remove_grouplink_link_grouplink_url_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='grouplink',
            options={'ordering': ['group_name'], 'verbose_name': 'Link to group schedule', 'verbose_name_plural': 'Links to group schedule'},
        ),
        migrations.RenameField(
            model_name='grouplink',
            old_name='title',
            new_name='group_name',
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('week', models.IntegerField(verbose_name='week')),
                ('lesson_name', models.CharField(max_length=50, verbose_name='lesson_name')),
                ('lesson_type', models.CharField(max_length=30, verbose_name='lesson_type')),
                ('teacher', models.CharField(max_length=50, verbose_name='teacher')),
                ('start_date', models.DateTimeField(verbose_name='start_date')),
                ('group_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lessons', to='schedule.grouplink')),
            ],
            options={
                'verbose_name': 'Group schedule',
                'verbose_name_plural': 'Groups schedule',
                'ordering': ['group_name'],
            },
        ),
    ]
