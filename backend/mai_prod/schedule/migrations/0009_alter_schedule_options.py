# Generated by Django 5.1.7 on 2025-04-06 19:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0008_alter_grouplink_group_name'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='schedule',
            options={'verbose_name': 'Group schedule', 'verbose_name_plural': 'Groups schedule'},
        ),
    ]
