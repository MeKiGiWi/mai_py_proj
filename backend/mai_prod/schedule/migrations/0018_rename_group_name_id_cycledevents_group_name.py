# Generated by Django 5.1.7 on 2025-05-28 00:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0017_rename_group_cycledevents_group_name_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cycledevents',
            old_name='group_name_id',
            new_name='group_name',
        ),
    ]
