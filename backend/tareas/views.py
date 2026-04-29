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