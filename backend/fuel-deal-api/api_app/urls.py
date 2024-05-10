from django.urls import path
from . import views
urlpatterns = [
    path('index', views.index, name='index'),
    path('index/cars/<int:id>/', views.cars, name='cars'),
    path('index/fuel/<int:id>/', views.fuel, name='fuel'),
    path('FuelDeal/api/manu', views.getManus),
    path('FuelDeal/api/manu/<int:id>', views.getManu),
    path('FuelDeal/api/update/<int:id>', views.updateManu),
    path('FuelDeal/api/create', views.createManu),
    path('FuelDeal/api/delete/<int:id>', views.deleteManu),
    path('FuelDeal/api/manu/cars_list/<int:id>', views.getCars),
    path('FuelDeal/api/getOilPrice91', views.getOilPrice91),
    path('FuelDeal/api/getOilPrice95', views.getOilPrice95),
]