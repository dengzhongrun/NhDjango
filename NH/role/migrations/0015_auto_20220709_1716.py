# Generated by Django 2.2 on 2022-07-09 17:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('role', '0014_auto_20220709_1715'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Areas',
        ),
        migrations.RemoveField(
            model_name='peopleofmain',
            name='user',
        ),
        migrations.RemoveField(
            model_name='performancetask',
            name='user',
        ),
        migrations.RemoveField(
            model_name='personinfo',
            name='user',
        ),
        migrations.DeleteModel(
            name='HouseMainInfo',
        ),
        migrations.DeleteModel(
            name='PeopleOfMain',
        ),
        migrations.DeleteModel(
            name='PerformanceTask',
        ),
        migrations.DeleteModel(
            name='PersonInfo',
        ),
    ]
