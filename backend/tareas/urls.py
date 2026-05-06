from django.urls import path

from . import views

urlpatterns = [
    path('tareas/crear/', views.crear_tarea, name='crear_tarea'),
    path('tareas/listar/', views.listar_tareas, name='listar_tareas'),
    path('tareas/eliminar/<int:id>/', views.eliminar_tarea, name='eliminar_tarea'),
    path('tareas/actualizar/<int:id>/', views.actualizar_tarea, name='actualizar_tarea'),
]