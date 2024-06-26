from django.shortcuts import render
from django.http import HttpResponse

from .models import Usuario

def about(request):
    return render(request, 'about.html')

def calendario(request):
    return render(request, 'calendario.html')

def contatos(request):
    return render(request, 'contatos.html')

def fotos(request):
    return render(request, 'fotos.html')
    
def home(request):
    if request.method == 'GET':
        return render(request, 'home.html')