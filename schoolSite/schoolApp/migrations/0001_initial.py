# Generated by Django 2.2.4 on 2019-08-04 16:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='IdMapping',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('std_name', models.CharField(max_length=75)),
            ],
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('standard', models.IntegerField()),
                ('year', models.IntegerField()),
                ('total', models.IntegerField()),
                ('sci', models.IntegerField()),
                ('math', models.IntegerField()),
                ('langauge', models.IntegerField()),
                ('social', models.IntegerField()),
                ('grade', models.CharField(max_length=75)),
                ('student_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schoolApp.IdMapping')),
            ],
        ),
    ]
