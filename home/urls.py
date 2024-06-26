from django.urls import path
from . import views

urlpatterns = [
    path('about/', views.about, name='about'),
    path('calendario/', views.calendario, name='calendario'),
    path('contatos/', views.contatos, name='contatos'),
    path('fotos/', views.fotos, name='fotos'),
    path('', views.home, name='home'),
]
