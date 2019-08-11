from schoolApp.models import *
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect

@csrf_exempt
def loginVerify(request):
        if request.method == "POST":
                print('remote address is',request.META.get('REMOTE_ADDR'))
                login = Login.objects.filter(
                        username = json.loads(request.body)['username'],
                        password = json.loads(request.body)['password'],
                        allowed_ip = json.loads(request.body)['allowed_ip']
                        )
                if login:
                        request.session['username'] = json.loads(request.body)['username']
                        request.session['password'] = json.loads(request.body)['password']
                        return HttpResponse(json.dumps({'success':True}))
                else:
                        return HttpResponse(json.dumps({'success':False}))

 
def login_check(function):
        def wrap(request, *args, **kwargs):
                session = request.session # this is a dictionary with session keys
                print(session)
                if session.get('username') and session.get('password'):
                # the decorator is passed and you can handle the request from the view
                        return function(request, *args, **kwargs)
                else:
                        return redirect('login')
        return wrap

def logout(request):
        if request.method=='GET':
                request.session.flush()
                return HttpResponse(json.dumps({'success':True}))
@login_check
def class_statistics(request,standard):
        if request.method == 'GET':
                import datetime
                current_year = (datetime.datetime.now()).year
                reports = Report.objects.filter(
                        year__lte=current_year,
                        year__gt=current_year-5,  
                        standard=standard
                        ).order_by('-year').all()
                if reports:
                        class_data = []
                        check_until_year = current_year-5
                        while current_year>check_until_year:
                                total_students = 0
                                passed_students = 0
                                failed_students = 0
                                for report in reports:
                                        if current_year == report.year:
                                                total_students += 1
                                                if report.grade == 'PASS':
                                                        passed_students += 1
                                                else:
                                                        failed_students += 1
                                class_data.append({
                                        'year':current_year,
                                        'total_students': total_students,
                                        'passed_students': passed_students,
                                        'failed_students': failed_students
                                        })
                                current_year -= 1

                        return  HttpResponse(json.dumps(class_data))
                else:
                        return HttpResponse(json.dumps([]))


@login_check
def student_statistics(request,student_id):
        if request.method == 'GET':
                student = IdMapping.objects.filter(id=student_id)
                print('student is ',student)
                if student:
                        reports = Report.objects.filter(student_id=student[0]).all()
                        reportsList= []
                        if reports:
                                for report in reports:
                                        reportData = {}
                                        reportData['report_id'] = report.id
                                        reportData['student_id'] = student[0].id
                                        reportData['name'] = student[0].std_name
                                        reportData['standard'] = report.standard
                                        reportData['year'] = report.year
                                        reportData['sci'] = report.sci
                                        reportData['math'] = report.math
                                        reportData['langauge'] = report.langauge
                                        reportData['social'] = report.social
                                        reportData['grade'] = report.grade
                                        reportData['total'] = str(report.sci + report.math + report.langauge + report.social) +'/'+ str(report.total)
                                        reportsList.append(reportData)
                                return HttpResponse(json.dumps(reportsList))
                        else:
                                return HttpResponse(json.dumps(reportsList))
                else:
                        return HttpResponse(json.dumps([]))

@login_check
def year_statistics(request,year):
        if request.method == 'GET':
                reports = Report.objects.filter(year=year).all()
                print(reports)
                reportsList= []
                if reports:
                        for report in reports:
                                reportData = {}
                                reportData['report_id'] = report.id
                                reportData['student_id'] = (report.student_id).id
                                reportData['name'] = (report.student_id).std_name
                                reportData['standard'] = report.standard
                                reportData['sci'] = report.sci
                                reportData['math'] = report.math
                                reportData['langauge'] = report.langauge
                                reportData['social'] = report.social
                                reportData['grade'] = report.grade
                                reportData['total'] = str(report.sci + report.math + report.langauge + report.social) +'/'+ str(report.total)
                                reportsList.append(reportData)
                        return HttpResponse(json.dumps(reportsList))
                else:
                        return HttpResponse(json.dumps(reportsList))
