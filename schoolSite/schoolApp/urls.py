from django.urls import path

from . import views
from .api import school_api_manager

urlpatterns = [
    path('login/', views.login, name='login'),
    path('login/loginVerify/', school_api_manager.loginVerify, name='loginVerify'),
    path('logout/', school_api_manager.logout, name='logout'),
    path('class/', views.standard, name='class'),
    path('class/<int:standard>/', school_api_manager.class_statistics, name='class_statistics'),
    path('student/', views.student, name='student'),
    path('student/<int:student_id>/', school_api_manager.student_statistics, name='student_statistics'),
    path('year/', views.year, name='year'),
    path('year/<int:year>/', school_api_manager.year_statistics, name='year_statistics')
]