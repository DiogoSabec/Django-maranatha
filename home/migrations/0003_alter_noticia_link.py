# Generated by Django 4.2.2 on 2024-06-28 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_noticia_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='noticia',
            name='link',
            field=models.URLField(blank=True, null=True),
        ),
    ]