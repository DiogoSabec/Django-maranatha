from django.db import models
    
class Noticia(models.Model):
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    foto = models.ImageField(upload_to='fotos/')
    dataUpload = models.DateTimeField(auto_now_add=True)
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.titulo

class Coord(models.Model):
    nome = models.CharField(max_length=200)
    telefone = models.CharField(max_length=20)
    descricao = models.CharField(max_length=40)
    foto = models.ImageField(upload_to='fotos/', blank=True, null=True)

    def __str__(self):
        return self.descricao