from django.urls import path

from . import views

urlpatterns = [
    path('tareas/crear/', views.crear_tarea, name='crear_tarea'),
]