from django.db import models

# Create your models here.


class Manu(models.Model):
    manu_name = models.CharField(max_length=50, verbose_name='Manufacturer')
    logo = models.ImageField(upload_to='photos/%y/%m/%d')
    country = models.CharField(max_length=50)
    def __str__(self):
        return self.manu_name

class Car(models.Model):
    model_name = models.CharField(max_length=50, verbose_name='Model')
    price = models.IntegerField()
    year = models.DateField()
    tank = models.DecimalField(max_digits=4, decimal_places=2)
    fuel_cons = models.DecimalField(max_digits=4, decimal_places=2)
    manu = models.ForeignKey(Manu, on_delete=models.CASCADE)
    def __str__(self):
        return self.model_name