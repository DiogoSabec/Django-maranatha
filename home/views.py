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
    elif request.method == 'POST':
        nome = request.POST.get('nome')
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        nascimento = request.POST.get('nascimento')
        telefone = request.POST.get('telefone')
        
        usuario = Usuario(nome=nome, email=email, senha=senha, nascimento=nascimento, telefone=telefone)
        
        usuario.save()
        return HttpResponse("POST request received!")