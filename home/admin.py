from django.contrib import admin
from .models import Noticia

class NoticiaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'foto', 'dataUpload')  # Adicione 'dataUpload' aqui
    search_fields = ('titulo', 'descricao')

admin.site.register(Noticia, NoticiaAdmin)