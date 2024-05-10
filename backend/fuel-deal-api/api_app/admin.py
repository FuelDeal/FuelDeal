from django.contrib import admin

# Register your models here.
from .models import Car, Manu
class ManuAdmin(admin.ModelAdmin):
    list_display = ['id','manu_name']
admin.site.register(Car)
admin.site.register(Manu, ManuAdmin)