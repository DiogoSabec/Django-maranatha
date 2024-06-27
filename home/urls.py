from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('calendario/', views.calendario, name='calendario'),
    path('contatos/', views.contatos, name='contatos'),
    path('fotos/', views.fotos, name='fotos'),
    path('browse/', views.browse_folder, name='browse'),
    path('browse/<str:folder_id>/', views.browse_folder, name='browse_folder'),
    path('download/<str:file_id>/', views.download_image, name='download_image'),
]
