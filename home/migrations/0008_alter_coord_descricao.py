# Generated by Django 4.2.2 on 2024-06-29 03:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_rename_miniserio_coord_descricao'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coord',
            name='descricao',
            field=models.CharField(max_length=40),
        ),
    ]
