from django.db import models
    
class Noticia(models.Model):
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    foto = models.ImageField(upload_to='fotos/')
    dataUpload = models.DateTimeField(auto_now_add=True)
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.titulo
