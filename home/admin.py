from django.contrib import admin
from .models import Noticia, Coord

class NoticiaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'foto', 'dataUpload')  # Adicione 'dataUpload' aqui
    search_fields = ('titulo', 'descricao')
class Coordenador(admin.ModelAdmin):
    list_display = ('nome', 'descricao', 'foto')  # Corrected field names

admin.site.register(Noticia, NoticiaAdmin)

admin.site.register(Coord, Coordenador)


