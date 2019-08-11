from django.db import models

# Create your models here.

class IdMapping(models.Model):
    std_name = models.CharField(max_length=75) 


class Report(models.Model):
    student_id = models.ForeignKey('IdMapping', on_delete=models.CASCADE)
    standard = models.IntegerField()
    year = models.IntegerField()
    total = models.IntegerField()
    sci = models.IntegerField()
    math = models.IntegerField()
    langauge = models.IntegerField()
    social = models.IntegerField()
    grade = models.CharField(max_length=75)


class Login(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=15)
    allowed_ip = models.CharField(max_length=15)