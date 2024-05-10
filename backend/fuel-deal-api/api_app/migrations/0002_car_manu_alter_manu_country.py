# Generated by Django 4.2.9 on 2024-01-15 14:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='manu',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='main_app.manu'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='manu',
            name='country',
            field=models.CharField(max_length=50),
        ),
    ]