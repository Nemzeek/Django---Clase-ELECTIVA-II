from django.shortcuts import render
from .models import Tarea
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

# Create your views here.
@csrf_exempt
@require_http_methods(['POST'])
def crear_tarea(request):
    if request.method == 'POST':
        payload = json.loads(request.body)
        tituloIngresado = payload.get('titulo')
        devolver = Tarea.objects.create(titulo=tituloIngresado)
        return JsonResponse({
            'id': devolver.id,
            'titulo': devolver.titulo,
            'fecha_creacion': devolver.fecha_creacion,
        }, status=201)

@csrf_exempt
@require_http_methods(['GET'])
def listar_tareas(request):
    if request.method == 'GET':
        tareas = Tarea.objects.all()
        return JsonResponse({
            'tareas': list(tareas.values()),
        }, status=200)

@csrf_exempt
@require_http_methods(['DELETE'])
def eliminar_tarea(request, id):
    if request.method == 'DELETE':
        tarea = Tarea.objects.get(id=id)
        tarea.delete()
        return JsonResponse({
            'mensaje': 'Tarea eliminada correctamente',
        }, status=200)

@csrf_exempt
@require_http_methods(['PUT'])
def actualizar_tarea(request, id):
    if request.method == 'PUT':
        payload = json.loads(request.body)
        tituloIngresado = payload.get('titulo')
        tarea = Tarea.objects.get(id=id)
        tarea.titulo = tituloIngresado
        tarea.save()
        return JsonResponse({
            'mensaje': 'Tarea actualizada correctamente',
        }, status=200)