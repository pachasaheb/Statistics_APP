from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from .api.school_api_manager import login_check

# Create your views here.

def login(request):
    context = {}
    return render(request,'login.html',context)

@login_check
def standard(request):
    context = {}
    return render(request,'class.html',context)

@login_check
def student(request):
    context = {}
    return render(request,'student.html',context)

@login_check
def year(request):
    context = {}
    return render(request,'year.html',context)
